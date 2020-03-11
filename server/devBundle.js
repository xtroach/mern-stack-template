import config from './../config/config'
import webpack from 'webpack'
import webpackMiddleware from 'webpack-dev-middleware'
import webpackHotMiddleware from 'webpack-hot-middleware'
import scannerWebPackConfig from '../webpack.client.config'
const compile = (app) => {
  if(config.env === "development"){
    const scannerCompiler = webpack(scannerWebPackConfig)
    const scannerMiddleware = webpackMiddleware(scannerCompiler, {
      publicPath: scannerWebPackConfig.output.publicPath
    })
    app.use(scannerMiddleware)
    app.use(webpackHotMiddleware(scannerCompiler))




  }
}

export default {
  compile
}
