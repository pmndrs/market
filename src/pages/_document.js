import Document, { Html, Head, Main, NextScript } from 'next/document'

export default class Doc extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx)
    return { ...initialProps }
  }

  render() {
    return (
      <Html lang='en'>
        <Head>
          <link rel='amphtml' href='https://market.pmnd.rs/' />
          <link rel='canonical' href='https://market.pmnd.rs/' />
          <meta name='googlebot' content='follow, index, noarchive' />
          <meta name='robots' content='follow, index, noarchive' />
          <meta name='viewport' content='initial-scale=1,width=device-width' />

          <link rel='apple-touch-icon' href='./apple-touch-icon.png' />
          <link
            rel='icon'
            type='image/png'
            sizes='16x16'
            href='./favicon-16x16.png'
          />
          <link
            rel='icon'
            type='image/png'
            sizes='32x32'
            href='./favicon-32x32.png'
          />

          <link rel='manifest' href='./site.webmanifest' />
          <meta name='apple-mobile-web-app-capable' content='yes' />
          <meta
            name='apple-mobile-web-app-status-bar-style'
            content='#000000'
          />
          <meta name='apple-mobile-web-app-title' content='PMNDRS Market' />
          <meta name='application-name' content='PMNDRS Market' />
          <meta name='mobile-web-app-capable' content='yes' />
          <meta name='msapplication-config' content='/browserconfig.xml' />
          <meta name='msapplication-navbutton-color' content='#000000' />
          <meta
            name='msapplication-starturl'
            content='https://market.pmnd.rs/'
          />
          <meta name='msapplication-tilecolor' content='#000000' />
          <meta name='msapplication-tileimage' content='/mstile-144x144.png' />
          <meta name='msapplication-tooltip' content='PMNDRS Market' />
          <title>pmndrs market</title>
          <meta name='title' content='pmndrs market' />
          <meta
            name='description'
            content="Your home for downloading web-ready 3D assets. Download CC0 models, textures and HDRI's that are web-ready."
          />

          <meta property='og:type' content='website' />
          <meta property='og:url' content='http://market.pmnd.rs/' />
          <meta property='og:title' content='pmndrs market' />
          <meta
            property='og:description'
            content="Your home for downloading web-ready 3D assets. Download CC0 models, textures and HDRI's that are web-ready."
          />
          <meta property='og:image' content='http://market.pmnd.rs/share.png' />

          <meta property='twitter:card' content='summary_large_image' />
          <meta property='twitter:url' content='http://market.pmnd.rs/' />
          <meta property='twitter:title' content='pmndrs market' />
          <meta
            property='twitter:description'
            content="Your home for downloading web-ready 3D assets. Download CC0 models, textures and HDRI's that are web-ready."
          />
          <meta
            property='twitter:image'
            content='http://market.pmnd.rs/share.png'
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}
