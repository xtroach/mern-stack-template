import React, {Component} from 'react'
import withStyles, {ThemeProvider} from 'react-jss'
import themes from "./styles/themes"
import Camera from "./core/Camera"
import io from 'socket.io-client'


class App extends Component{

  scanCode(val) {
    if (val.status == 'success') {
     this.socket.emit('my other event', val.code)
    }
    this.setState({scannedCode: val})
  }

  constructor(props) {
    super(props);
    this.socket = io()
    this.state = {}
    this.state.scannedCode = {
      code: "",
      validCode: false,
    }
    this.scanCode = this.scanCode.bind(this);

  }

  render() {
    return (
      <ThemeProvider theme={themes.red}>
        <div className={this.props.classes.mainContainer}>
          <div className={this.props.classes.infoFrame}><h1>{this.state.scannedCode.code}</h1></div>
          <Camera callback={this.scanCode}/>
        </div>
      </ThemeProvider>
    )
  }
}

const styles= {
  mainContainer: {
    width: "100%",
    height: "100%",
    paddingLeft: 10,
    paddingRight: 10
  },
  infoFrame:{
    fontSize: 30
  }
}

export default withStyles(styles)(App)