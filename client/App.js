import React, {useState} from 'react'
import {ThemeProvider} from 'react-jss'
import themes from "./styles/themes"
import Camera from "./core/Camera"




const App = () => {

  const [scannedCode, setScannedCode] = useState("no code scanned")
  return (
    <ThemeProvider theme={themes.red}>
      <Camera callback={setScannedCode} />
      <a style={{fontSize: 20}}>{scannedCode}</a>
    </ThemeProvider>
  )
}

export default App