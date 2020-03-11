import React from 'react'
import {createUseStyles, useTheme, ThemeProvider} from 'react-jss'
import Article from './core/Article'
// Using `theme` function is better when you have many theme dependant styles.


const useStyles = createUseStyles({
  button: {
    background: ({theme}) => theme.colorPrimary
  },
  label: {
    fontWeight: 'bold'
  }
})



const Button = ({children,...props}) => {
  const theme = useTheme()
  const classes = useStyles({...props, theme})
  const clickme = function(){
    alert("Clicked")
  }
  return (
    <button className={classes.button} onClick={clickme}>
      <span className={classes.label}>{children}</span>
    </button>
  )
}

const theme = {
  colorPrimary: 'green'
}

const App = () => (
  <ThemeProvider theme={theme}>
    <Button>I am a button with green background</Button>
    <Article theme={theme}>Hellooooo</Article>
  </ThemeProvider>
)

export default App