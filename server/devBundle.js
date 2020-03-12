import config from './../config/config'
import webpack from 'webpack'
import webpackMiddleware from 'webpack-dev-middleware'
import webpackHotMiddleware from 'webpack-hot-middleware'
import scannerWebPackConfig from '../webpack.scanner-client.config'
import browserWebPackConfig from '../webpack.browser-client.config'
const compile = (app) => {
  if(config.env === "development"){

    if (process.env.HOT_RELOAD_MODE === "scanner") {
      const scannerCompiler = webpack(scannerWebPackConfig)
      const scannerMiddleware = webpackMiddleware(scannerCompiler, {
        publicPath: scannerWebPackConfig.output.publicPath
      })
      app.use(scannerMiddleware)
      app.use(webpackHotMiddleware(scannerCompiler))
    }else{
      const browserCompiler = webpack(browserWebPackConfig)
      const browserMiddleware = webpackMiddleware(browserCompiler, {
        publicPath: browserWebPackConfig.output.publicPath
      })
      app.use(browserMiddleware)
      app.use(webpackHotMiddleware(browserCompiler))
    }

  }
}

export default {
  compile
}
