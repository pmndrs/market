import commonr3fCode from '../common/r3f'

export const createCode = (model, code) => [
  ...commonr3fCode,
  {
    filename: 'src/Model.js',
    code,
  },
  {
    filename: `public/${model.url}.gltf`,
    code: model.buffer,
  },
]
