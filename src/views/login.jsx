import React, {useEffect, useState} from "react"
import Axios from "axios"
import {Grid, Button} from "@material-ui/core"
import TextInput from "../components/TextInput"
import Swal from "sweetalert2"
import Cookie from "js-cookie"
import helper from "../helper/Helper"
import mHelper from "../helper/Helper"

export default function LoginFuction(params) {
    const [bodyLogin, setBodyLogin] = useState({
        email : "",
        password : ""
    })

    useEffect(() => {
        console.log(helper.getToken())
    }, [])

    const handleLogin = async () => {
        await Axios.post(helper.URL_API() + "login", bodyLogin)
        .then(res => {
            const result = res.data
            Cookie.set("user", result.data)
            Swal.fire({
                icon: result.success ? 'success' : 'error',
                title: result.success ? 'success' : 'error',
                text: result.message
              })
              if(result.success){
                  setTimeout(() => {
                      window.location.href = "/dashboard"
                  }, 500);
              }
        })
        .catch(err => mHelper.errorHandler(err))
    }

    return (
        <Grid sm={12} container className="Login" alignItems="center" justify="center">
            <Grid sm={8} container className="login-body">
                <Grid sm={5} item column className="login-body-kiri">
                    
                </Grid>
                <Grid sm={7} item container alignItems="center" justify="center" className="login-body-kanan">
                    <Grid xs={11} align="center">
                    <h2>Elearning SMKN 2 Bogor</h2>
                        <TextInput id="email" onChange={(e) => setBodyLogin({...bodyLogin, email : e.target.value})} label="email" placeholder="email"/>
                        <TextInput onChange={(e) => setBodyLogin({...bodyLogin, password : e.target.value})} label="password" id="password" type="password" placeholder="password"/>
                        <Grid xs={12} align="center">
                            <Button variant="contained" onClick={handleLogin} texali color="primary" style={{marginTop: "10px"}}>
                                Login
                            </Button>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    )
}