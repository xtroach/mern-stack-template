import React, {Component} from 'react'
import withStyles from "react-jss";
import jsQR from 'jsqr'




class Camera extends Component{
  constructor(props) {


    super(props);
    this.state = {}
    this.streaming = false;
    this.video = React.createRef();
    this.canPlay = this.canPlay.bind(this)
    this.takePicture = this.takePicture.bind(this)
    this.videoEnabled=false
    this.state.scanActionLabel = this.props.scanActionLabel
  }
  componentDidMount() {

    const constraints = {
      video:{
        facingMode: "environment",
      },

      audio: false
    }

    navigator.mediaDevices.getUserMedia(constraints)
      .then((stream)=> {

        this.video.current.srcObject = stream;
        this.video.current.play();
        this.videoEnabled = true;
      })
      .catch(function(err) {
        console.log("An error occurred: " + err);
      });
  }

  canPlay(){
    if (!this.streaming) {
      this.setState({
        videoHeight:  this.video.current.videoHeight / (this.video.current.videoWidth/this.state.videoWidth),
      })
      this.streaming = true;
    }
  }

  takePicture(e){

    e.preventDefault()
    this.setState({scanActionLabel: "scanning"})
    this.props.callback("scanning..")
    const canvas = document.createElement('canvas')
    const context = canvas.getContext('2d')
    if (this.videoEnabled) {
      canvas.width = this.video.current.videoWidth;
      canvas.height = this.video.current.videoHeight;
      context.drawImage(this.video.current, 0, 0, this.video.current.videoWidth, this.video.current.videoHeight);
      const imageData = context.getImageData(0,0, this.video.current.videoWidth, this.video.current.videoHeight);
      const code = jsQR(imageData.data, imageData.width, imageData.height)
      if (code){
        console.log(code)
        if(this.props.callback)
          this.props.callback(code.data)

      }else{
        this.props.callback("failed try again....")
      }
      this.setState({scanActionLabel: this.props.scanActionLabel || "Scan Code"})
    }
  }
  render(){
    return (
      <video className={this.props.classes.video} onClick={this.takePicture} onCanPlay={this.canPlay} ref={this.video}>Video stream not available.</video>
    )
  }
}


const styles = {
  video:{
    width: "100%",
  },
}


export default withStyles(styles, {injectTheme: true})(Camera)