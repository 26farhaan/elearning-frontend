import React, {useState} from "react"
import {
  FormControl,
  TextField,
  Grid,
  FormHelperText,
  Select
} from "@material-ui/core"

import RequiredLabel from "./RequiredLabel"

const GridLabelSelect = (props) => {
  const {
    label,
    id,
    required = false,
    message = "",
    value,
    onChange,
    disabled = false,
    labelWidth = 2,
    fieldWidth = 10,
    error = false,
    fullWidth = false,
    placeholder = "",
    defaultValue
  } = props

  const [isTouched, setTouched] = useState(false)

  const onBlur = () => {
    setTouched(true)
  }

  return (
    <Grid container item style={{marginTop: 5}} xs={12} alignItems="center">
      <Grid item xs={12} sm={labelWidth}>
        <RequiredLabel required={required} label={label} />
      </Grid>
      <Grid item xs={12} sm={fieldWidth}>
        <FormControl label={label} name={id} id={id} fullWidth={fullWidth}>
          <Select
            onChange={onChange}
            onBlur={onBlur}
            defaultValue={defaultValue}
            value={value}
            id={id}
            error={error}
            disabled={disabled}
            placeholder={placeholder}
            style={{minWidth: 120}}
            size="large"
          >
            {props.children}
          </Select>
          <FormHelperText error={error}>{message}</FormHelperText>
        </FormControl>
      </Grid>
    </Grid>
  )
}

export default GridLabelSelect
