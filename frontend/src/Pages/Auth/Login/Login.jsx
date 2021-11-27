import React, { useState, useEffect } from 'react'
import Topbar from '../../../Components/Topbar/Topbar'
import { Radio, Button, TextField, RadioGroup, FormControlLabel, FormLabel } from '@mui/material'
import styles from './Login.module.css'
import DoubleArrowIcon from '@mui/icons-material/DoubleArrow';
import axios from '../../../Helper/axios'
import Cookies from 'universal-cookie';
import { useHistory } from "react-router-dom"
import firebase from 'firebase'

const cookies = new Cookies()
const Login = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [radio, setRadio] = useState("customer")
  const [phone, setPhone] = useState("")
  const formRef = React.useRef();
  let history = useHistory();

  useEffect(() => {
    const config = {
      apiKey: "AIzaSyAi4oAauzCH0nJGBCfvK3NuqumM5_gnMLA",
      authDomain: "bargain-otp.firebaseapp.com",
      projectId: "bargain-otp",
      storageBucket: "bargain-otp.appspot.com",
      messagingSenderId: "138054163415",
      appId: "1:138054163415:web:e1d93d184c6d70e1634992"
    }

    firebase.initializeApp(config);
  }, [])

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
      case "phone":
        setPhone(event.target.value)
        break

      default:
        break;
    }
  }

  const getOTP = () => {
    const number = phone;
    let recaptcha = new firebase.auth.RecaptchaVerifier('recaptcha');


    firebase.auth().signInWithPhoneNumber(number, recaptcha).then(function (e) {
      let code = prompt('enter the otp', '');
      if (code == null) return;
      e.confirm(code).then(function (result) {
        const body = {
          phone
        }
        axios.post("api/users/loginPhone", body)
          .then(res => {
            if (res.status == 200) {
              cookies.set("bargainc", res.data.accessToken)
              cookies.set("bargainr", res.data.role)
              history.push("/home");
            }
          }).catch(err => {
            console.log(err);
          })
      }).catch((error) => {
        console.log(error)
      })
    })
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
    <div className={styles.mainDiv} style={{ backgroundColor: "#def6ff" }}>
      <Topbar list={[]} />
      <div className={styles.mainSignUpDiv}>
        <form ref={formRef} className={styles.signUpDiv}>
          <p className={styles.signUpText}>Log In</p>
          <TextField required="false" onChange={(event) => { handleChange(event, "email") }} className={styles.textField} id="standard-basic" type="email" label="Email" variant="outlined" />
          <TextField required="false" onChange={(event) => { handleChange(event, "password") }} className={styles.textField} id="standard-basic" label="Password" type="password" variant="outlined" />

          <div className={styles.radioDiv}>
            <FormLabel className={styles.radioLabel} component="legend">Account Type</FormLabel>
            <RadioGroup value={radio} onChange={(event) => { handleChange(event, "radio") }} row aria-label="gender" name="row-radio-buttons-group">
              <FormControlLabel value="customer" control={<Radio />} label="Customer" />
              <FormControlLabel value="seller" control={<Radio />} label="Seller" />
            </RadioGroup>
          </div>


          <Button className={styles.btn} onClick={submit} variant="contained" endIcon={<DoubleArrowIcon />}>Submit</Button>
          <h1 className={styles.or}>Or, Login with Phone Number</h1>
          <TextField required="false" onChange={(event) => { handleChange(event, "phone") }} className={styles.textField} id="standard-basic" label="Phone Number" variant="outlined" />
          <div id="recaptcha"></div>
          <Button className={styles.btn} onClick={getOTP} variant="contained" endIcon={<DoubleArrowIcon />}>Get OTP</Button>

          {/* <Button className={styles.btn} onClick={submitPhone} variant="contained" endIcon={<DoubleArrowIcon />}>Verify</Button> */}

          <p style={{ fontSize: '18px' }}>Don't have an account? <a className={styles.signUpLink} href="/signUp">Sign Up</a> </p>
        </form>
      </div>
    </div>
  )
}

export default Login