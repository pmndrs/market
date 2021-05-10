/* eslint-disable no-useless-escape */
const commonThreeCode = [
  {
    filename: 'package.json',
    code: `
    {
      "name": "",
      "version": "0.2.1",
      "main": "src/index.js",
      "scripts": {
        "start": "webpack-dev-server --open",
        "build": "webpack --env.prod"
      },
      "repository": "superguigui/threejs-starter-kit",
      "author": "Guillaume Gouessan",
      "license": "ISC",
      "devDependencies": {
        "@babel/core": "^7.14.0",
        "@babel/plugin-transform-runtime": "^7.13.15",
        "@babel/preset-env": "^7.14.1",
        "babel-loader": "^8.2.0",
        "copy-webpack-plugin": "^6.1.1",
        "glslify-loader": "^2.0.0",
        "html-webpack-plugin": "^4.5.0",
        "raw-loader": "^4.0.1",
        "webpack": "^4.44.2",
        "webpack-cli": "^3.3.12",
        "webpack-dev-server": "^3.11.0"
      },
      "dependencies": {
        "three": "^0.128.0"
      }
    }
    
`,
  },
  {
    filename: '.gitignore',
    code: `
    #system
    *.log
    .DS_Store
    
    #node
    node_modules
    
    # build
    dist
`,
  },
  {
    filename: 'webpack.config.js',
    code: `
    const webpack = require('webpack')
    const path = require('path')
    const CopyWebpackPlugin = require('copy-webpack-plugin')
    const HtmlWebpackPlugin = require('html-webpack-plugin')
    
    module.exports = env => {
      const isProd = env && env.prod
      const config = {
        mode: isProd ? 'production' : 'development',
        performance: { hints: false },
        entry: {
          build: './src/index.js'
        },
        plugins: [
          new webpack.DefinePlugin({
            DEVELOPMENT: !isProd
          }),
          new CopyWebpackPlugin({
            patterns: [{ from: 'src/assets', to: 'assets' }]
          }),
          new HtmlWebpackPlugin({
            title: isProd ? 'Production' : 'Development',
            meta: {
              viewport:
                'width=device-width, initial-scale=1, shrink-to-fit=no, maximum-scale=1.0, user-scalable=no'
            }
          })
        ],
        output: {
          filename: '[name].js',
          path: path.resolve(__dirname, 'dist')
        },
        module: {
          rules: [
            {
              test: /\.(glsl|vs|fs|vert|frag)$/,
              use: ['raw-loader', 'glslify-loader']
            },
            {
              test: /\.js$/,
              exclude: /node_modules/,
              use: {
                loader: 'babel-loader',
                options: {
                  compact: false,
                  presets: [['@babel/preset-env']],
                  plugins: [['@babel/transform-runtime']]
                }
              }
            }
          ]
        }
      }
    
      if (!isProd) {
        config.devtool = '#source-map'
      }
    
      return config
    }         
`,
  },
  {
    filename: 'src/loader/index.js',
    code: `
    class Preloader {
      constructor() {
        this.resolvers = []
        this.manifest = []
      }
      /**
       * Pretty print warning messages
       * @param {...*} msgs you want to print
       */
      warn(...msgs) {
        console.warn('[Preloader]', ...msgs)
      }
    
      /**
       * Initialize preloader with n resolvers, a resolver is an object that will define a load behavior for a given type.
       * A resolver must be an object with a resolve method,a get method and a type
       * @param {...Resolver} resolvers array of resolvers you want to use
       */
      init(...resolvers) {
        resolvers.forEach(resolver => {
          if (!resolver.hasOwnProperty('type')) {
            this.warn('init()', 'This resolver shoud have a type property', resolver)
          }
          if (typeof resolver.resolve !== 'function') {
            this.warn('init()', 'This resolver should implement a resolve function', resolver)
          }
          if (typeof resolver.get !== 'function') {
            this.warn('init()', 'This resolver should implement a get function', resolver)
          }
          this.resolvers.push(resolver)
        })
      }
    
      /**
       * Launch the loading of the given manifest.
       * @param {Array} manifest array of object to load, each object should be composed of a type (compatible with one of the resolvers used in init), an id and an url.
       * @returns {Promise} a promise that will be resolved when everything is loaded
       */
      load(manifest, baseUrl = '/', cdn = null) {
        if (!Array.isArray(manifest)) {
          this.warn('load()', 'manifest should be an array', manifest)
        }
    
        // Clean urls
        manifest = manifest.map(item => {
          let url = item.url
          const isUrlBase64 = url.indexOf('data:') === 0
          const isUrlAbsolute = url.indexOf('http://') === 0 || url.indexOf('https://') === 0
          if (!isUrlAbsolute && !isUrlBase64) {
            url = item.cdn && cdn ? cdn + item.url : baseUrl + item.url
          }
          if (!isUrlBase64) {
            url += '?v=' + item.version
          }
          return Object.assign({}, item, { url })
        })
    
        // save manifest for later result retreivals
        this.manifest = this.manifest.concat(manifest)
    
        // find duplicate ids
        for (let i = 0, l = manifest.length; i < l; i++) {
          const item = manifest[i]
          let stop = false
          for (let j = 0, m = manifest.length; j < m; j++) {
            if (i !== j && manifest[j].id === item.id) {
              stop = true
              break
            }
          }
          if (stop) {
            this.warn('load()', 'This id is used twice in the manifest: ' + item.id + '')
            break
          }
        }
    
        const promises = manifest.map(item => {
          const p = this.getResolverForType(item.type).resolve(item)
          if (typeof p.then !== 'function') {
            this.warn(
              'resolver for type ' +
                item.type +
                ' does not return a promise in its resolve method, check its implementation'
            )
          }
          return p
        })
    
        return Promise.all(promises)
      }
    
      /**
       * Find resolver for a given type
       * @param {String} type
       */
      getResolverForType(type) {
        const results = this.resolvers.filter(r => r.type === type)
        return results.length ? results[0] : null
      }
    
      /**
       * Returns a resolved content for a given item id from the manifest
       * @param {String} id item id from the manifest item
       * @param {...*} args arguments you want to pass to the resolver get method
       */
      get(id, ...args) {
        const items = this.manifest.filter(item => item.id === id)
        if (items.length) {
          const item = items[0]
          const resolver = this.getResolverForType(item.type)
          return resolver.get(item, args)
        }
        return null
      }
    }
    
    const preloader = new Preloader()
    
    export { preloader }
    
`,
  },
  {
    filename: 'src/loader/resolvers/TextureResolver.js',
    code: `
    import { TextureLoader } from 'three'

    export class TextureResolver {
      constructor(renderer) {
        this.type = 'texture'
        this.renderer = renderer
        this.loader = new TextureLoader()
      }
    
      resolve(item) {
        return new Promise(resolve => {
          this.loader.load(item.url, texture => {
            if (this.renderer) {
              this.renderer.setTexture2D(texture, 0)
            }
            resolve(Object.assign(item, { texture }))
          })
        })
      }
    
      get(item) {
        return item.texture
      }
    }
    
`,
  },
  {
    filename: 'src/loader/resolvers/GLTFResolver.js',
    code: `
    import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader";
    import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
    
    export class GLTFResolver {
      constructor() {
        this.type = "gltf";
        const gltfLoader = new GLTFLoader();
        const dracoloader = new DRACOLoader();
        dracoloader.setDecoderPath("https://www.gstatic.com/draco/v1/decoders/");
        gltfLoader.setDRACOLoader(dracoloader);
    
        this.loader = gltfLoader;
      }
    
      resolve(item) {
        return new Promise((resolve) => {
          this.loader.load(item.url, (scene) => {
            resolve(Object.assign(item, { scene }));
          });
        });
      }
    
      get(item) {
        return item.scene;
      }
    }
    
`,
  },
]

export const lightsAndSceneSetup = `

/* Init renderer and canvas */
const container = document.body;
const renderer = new WebGLRenderer();
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
renderer.setClearColor("white");
container.style.overflow = "hidden";
container.style.margin = 0;
container.appendChild(renderer.domElement);

/* Main scene and camera */
const scene = new Scene();
const camera = new PerspectiveCamera(
  50,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
const controls = new OrbitControls(camera, renderer.domElement);
camera.position.z = 10;
camera.position.y = 2;

/* Lights */
const ambientLight = new AmbientLight(0xffffff, 0.8);
const frontLight = new PointLight(0xffffff, 0.8);
const backLight = new PointLight(0xffffff, 0.8);
frontLight.castShadow = true;
frontLight.shadow.mapSize.width = 1024;
frontLight.shadow.mapSize.height = 1024;
backLight.castShadow = true;
backLight.shadow.mapSize.width = 1024;
backLight.shadow.mapSize.height = 1024;
frontLight.position.set(20, 20, 20);
backLight.position.set(-20, -20, 20);
scene.add(frontLight);
scene.add(backLight);
scene.add(ambientLight);

/* Various event listeners */
window.addEventListener("resize", onResize);
`

export const renderSetUp = `
/**
 Resize canvas
*/
function onResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}

/**
 RAF
*/
function animate() {
window.requestAnimationFrame(animate);
  render();
}

/**
 Render loop
*/
function render() {
  controls.update();
  renderer.clear();
  renderer.render(scene, camera);
}

`

export default commonThreeCode
