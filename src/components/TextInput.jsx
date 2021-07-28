import React, {Fragment} from "react"
import { Grid, TextField } from "@material-ui/core"

export default function TextInput(props) {
    const {label, onChange, value, defaultValue, type, placeholder, sizeInput, labelWidth, inputWidth, size} = props

    return (
        <Grid xs={12} container style={{marginTop: "1rem", paddingRight: "10px"}}>
            <Grid item xs={labelWidth} justify='flex-end' style={{display: "flex", alignItems: "center", justifyContent: "left"}}>
                {label}
            </Grid>
            <Grid item xs={inputWidth}>
                <TextField
                placeholder={placeholder}
                variant="outlined"
                onChange={onChange}
                size={size}
                type={type}
                fullWidth/>
            </Grid>
        </Grid>
    )
}

TextInput.defaultProps = {
    label : "label",
    labelWidth: 3,
    inputWidth: 9,
    inputLable: "Username",
    placeholder: "text",
    size: "small"
}