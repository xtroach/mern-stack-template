const path = require('path')
const webpack = require('webpack')
module.exports = {
  devtool: 'inline-source-map',
  name: "client",
  entry: ['./client/client.js',
    'react-hot-loader/patch',
    'webpack-hot-middleware/client?reload=true'
  ],
  mode: 'development',
  output: {
     path: path.resolve(__dirname, './dist'),
     filename: 'clientBundle.js',
    publicPath: '/dist/',

  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)?$/,
        exclude: /node_modules/,
        use: ['babel-loader']
      }
    ]
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin()
  ],
}