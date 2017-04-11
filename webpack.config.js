const WebpackErrorNotificationPlugin = require('webpack-error-notification')
const webpack = require('webpack')

let apiHost

const setupAPI = () => {
  switch ( process.env.NODE_ENV ) {
    case 'production':
      apiHost = "'http://localhost:1337/'"
      break
    case 'test':
      apiHost = "'http://localhost:1337/'"
      break
    case 'development':
      apiHost = "'http://localhost:1337/'"
      break
    default:
      apiHost = "'http://localhost:1337/'"
  }
}

setupAPI()

module.exports = {
  entry: './source/root.js',
  output: {
    filename: './public/index.js'
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        loader: 'babel-loader',
        exclude: /(node_modules)/,
        query: {
          presets: ['env', 'react'],
          plugins: ['transform-class-properties']
        }
      }
    ]
  },
  plugins: [
    new WebpackErrorNotificationPlugin(),
    new webpack.DefinePlugin({
      __API__: apiHost
    })
  ]
}
