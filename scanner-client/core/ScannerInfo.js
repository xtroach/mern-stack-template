import React from "react";
import withStyles from "react-jss";


const ScannerInfo = ({scannedCode, classes}) =>{
  return(
    <div className={classes.infoFrame}>
      <h1>{scannedCode}</h1>
    </div>
  )
}

const styles = {
  infoFrame: {
    height: 100
  }
}

export default withStyles(styles)(ScannerInfo)