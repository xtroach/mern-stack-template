import React, {Component} from 'react'
import {withStyles} from "react-jss";




const Article = ({classes, children, theme}) =>{
  return(
    <div className={classes.article}>
      {children}
    </div>
  )
}



const styles = theme => ({
    article: {
      background: theme.colorPrimary
    }
  })
export default withStyles(styles,{injectTheme: true})(Article)