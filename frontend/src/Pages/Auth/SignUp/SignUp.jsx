import React, { useState, useEffect, useRef, useContext } from 'react'
import { Radio, Button, TextField, RadioGroup, FormControlLabel, FormLabel } from '@mui/material'
import styles from './SignUp.module.css'
import DoubleArrowIcon from '@mui/icons-material/DoubleArrow';
import axios from '../../../Helper/axios'
import Cookies from 'universal-cookie';
import { useHistory } from "react-router-dom"
import { UserContext } from '../../../Helper/userContext';
import Topbar from '../../../Components/Topbar/Topbar'
const cookies = new Cookies()
const SignUp = () => {
    const { user, setUser } = useContext(UserContext)
    const [email, setEmail] = useState("")
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [phone,setPhone]=useState("")
    const [password, setPassword] = useState("")
    const [confirmPass, setConfirmPass] = useState("")
    const [radio, setRadio] = useState("customer")
    const formRef = React.useRef();
    let history = useHistory();
    const handleChange = (event, type) => {
        switch (type) {
            case "firstname":
                setFirstName(event.target.value)
                break;
            case "lastname":
                setLastName(event.target.value)
                break;
            case "email":
                setEmail(event.target.value)
                break;
            case "phone":
                setPhone(event.target.value)
                break;
            case "password":
                setPassword(event.target.value)
                break;
            case "confirmPass":
                setConfirmPass(event.target.value)
                break;
            case "radio":
                setRadio(event.target.value)
                break;
            default:
                break;
        }
    }

    const submit = () => {
        if (formRef.current.reportValidity()) {
            if (password === confirmPass) {
                const body = {
                    firstName,
                    lastName,
                    phone,
                    email,
                    role: radio,
                    password
                }
                console.log(body);
                //   console.log(body);
                // if (body.role === "customer") {
                //     axios.post("/api/users/signup", body)
                //         .then(res => {
                //             cookies.set("assistc", res.data.accessToken)
                //             cookies.set("assistr", "consumer")
                //             history.push("/home");
                //         }).catch(err => {
                //             console.log(err);
                //         })
                // }
                // else {
                //     setUser(body)
                //     history.push("/verification");
                // }
            } else {
                console.log("wrong password");
            }
        }
    }
    useEffect(() => {
        document.title = "Sign Up - ASSIST";
    }, []);
    return (
        <div className={styles.mainDiv} style={{ backgroundColor: "#EFF5E9" }}>
            <Topbar list={[]} />
            <div className={styles.mainSignUpDiv}>
                <form ref={formRef} className={styles.signUpDiv}>
                    <p className={styles.signUpText}>Sign Up</p>
                    <TextField required="true" onChange={(event) => { handleChange(event, "firstname") }} className={styles.textField} id="standard-basic" label="First Name" variant="standard" />
                    <TextField required="true" onChange={(event) => { handleChange(event, "lastname") }} className={styles.textField} id="standard-basic" label="Last Name" variant="standard" />
                    <TextField required="true" onChange={(event) => { handleChange(event, "email") }} className={styles.textField} id="standard-basic" type="email" label="Email" variant="standard" />
                    <TextField required="true" onChange={(event) => { handleChange(event, "phone") }} className={styles.textField} id="standard-basic" label="Phone Number" variant="standard" />
                    <TextField required="true" onChange={(event) => { handleChange(event, "password") }} className={styles.textField} id="standard-basic" label="Password" type="password" variant="standard" />
                    <TextField required="true" onChange={(event) => { handleChange(event, "confirmPass") }} className={styles.textField} id="standard-basic" label="Confirm Passowrd" type="password" variant="standard" />
                    <div className={styles.radioDiv}>
                        <FormLabel className={styles.radioLabel} component="legend">Account Type</FormLabel>
                        <RadioGroup value={radio} onChange={(event) => { handleChange(event, "radio") }} row aria-label="type" name="row-radio-buttons-group">
                            <FormControlLabel value="customer" control={<Radio />} label="Customer" />
                            <FormControlLabel value="seller" control={<Radio />} label="Seller" />
                        </RadioGroup>
                    </div>
                    <Button className={styles.btn} onClick={submit} variant="contained" endIcon={<DoubleArrowIcon />}>Submit</Button>
                    <p>Already have an account? <a className={styles.loginLink} href="/login">Login</a> </p>
                </form>
            </div>
        </div>
    )
}

export default SignUp