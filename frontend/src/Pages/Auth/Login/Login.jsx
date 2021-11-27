import React, { useState, useEffect } from 'react'
import Topbar from '../../../Components/Topbar/Topbar'
import { Radio, Button, TextField, RadioGroup, FormControlLabel, FormLabel } from '@mui/material'
import styles from './Login.module.css'
import DoubleArrowIcon from '@mui/icons-material/DoubleArrow';
import axios from '../../../Helper/axios'
import Cookies from 'universal-cookie';
import { useHistory } from "react-router-dom"
const cookies = new Cookies()
const Login = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [radio, setRadio] = useState("customer")
  const formRef = React.useRef();
  let history = useHistory();
  const handleChange = (event, type) => {
    switch (type) {
      case "email":
        setEmail(event.target.value)
        break
      case "password":
        setPassword(event.target.value)
        break
      case "radio":
        setRadio(event.target.value)
        break
      default:
        break;
    }
  }

  const submit = () => {
    if (formRef.current.reportValidity) {
      const body = {
        email,
        role: radio,
        password
      }
      console.log(body);
      axios.post("/api/users/login", body)
        .then(res => {
          cookies.set("bargainc", res.data.accessToken)
          cookies.set("bargainr", body.role)
          history.push("/home");
        }).catch(err => {
          alert('Incorrect Password!')
          console.log(err);
        })
    }

  }

  useEffect(() => {
    cookies.remove("bargainc")
    cookies.remove("bargainr")
    document.title = "Login - Bargain";
  }, []);
  return (
    <div className={styles.mainDiv} style={{ backgroundColor: "#EFF5E9" }}>
      <Topbar list={[]} />
      <div className={styles.mainSignUpDiv}>
        <form ref={formRef} className={styles.signUpDiv}>
          <p className={styles.signUpText}>Log In</p>
          <TextField required="true" onChange={(event) => { handleChange(event, "email") }} className={styles.textField} id="standard-basic" type="email" label="Email" variant="standard" />
          <TextField required="true" onChange={(event) => { handleChange(event, "password") }} className={styles.textField} id="standard-basic" label="Passowrd" type="password" variant="standard" />

          <div className={styles.radioDiv}>
            <FormLabel className={styles.radioLabel} component="legend">Account Type</FormLabel>
            <RadioGroup value={radio} onChange={(event) => { handleChange(event, "radio") }} row aria-label="gender" name="row-radio-buttons-group">
              <FormControlLabel value="customer" control={<Radio />} label="Customer" />
              <FormControlLabel value="seller" control={<Radio />} label="Seller" />
            </RadioGroup>
          </div>


          <Button className={styles.btn} onClick={submit} variant="contained" endIcon={<DoubleArrowIcon />}>Submit</Button>
          <p>Don't have an account? <a className={styles.signUpLink} href="/signUp">Sign Up</a> </p>
        </form>
      </div>
    </div>
  )
}

export default Login