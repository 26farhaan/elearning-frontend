import React from "react"
import {makeStyles} from "@material-ui/core/styles"

const styles = makeStyles((theme) => ({
  requiredLabel: {
    color: "red"
  }
}))

const RequiredLabel = (props) => {
  const {required, label, style} = props

  const classes = styles()

  return (
    <span style={style}>
      {required && (
        <span className={classes.requiredLabel}>
          <sup>* </sup>
        </span>
      )}
      {label}
    </span>
  )
}

export default RequiredLabel
