import React,{useEffect,useState} from 'react'
import styles from './Profile.module.css'
import { useHistory } from 'react-router';
import Topbar from '../../Components/Topbar/Topbar'
import Cookies from 'universal-cookie'
import { Radio, Button, TextField, RadioGroup, FormControlLabel, FormLabel } from '@mui/material'
import DoubleArrowIcon from '@mui/icons-material/DoubleArrow';
import profile from './profile.png'
import axios from '../../Helper/axios'
let cookies=new Cookies()
const Profile = (props) => {
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [phone, setPhone] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPass, setConfirmPass] = useState("")
    useEffect(() => {
        axios.get("api/users/")
            .then(res=>{
                console.log(res);
            }).catch(err=>{
                console.log(err);
            })
    }, [])
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
            case "phone":
                setPhone(event.target.value)
                break;
            case "password":
                setPassword(event.target.value)
                break;
            case "confirmPass":
                setConfirmPass(event.target.value)
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
              password
            }
            console.log(body);
            axios.post("/api/users/signup", body)
              .then(res => {
                cookies.set("bargainc", res.data.accessToken)
                cookies.set("bargainr", res.data.role)
                history.push("/home");
              }).catch(err => {
                console.log(err);
              })
          } else {
            console.log("wrong password");
          }
        }
    }
    return (
        <div className={styles.mainDiv} style={{ backgroundColor: "#baecff" }} >
            {cookies.get('bargainc') ? <Topbar list={[{ link: "profile", base: (<img className={styles.profileImage} src={profile}></img>), type: 'image' }]} /> : <Topbar list={[{ link: "login", base: "Login" }, { link: "signUp", base: "Sign Up" }]} />}

            <div className={styles.mainSignUpDiv}>
                <form ref={formRef} className={styles.signUpDiv}>
                    <p className={styles.signUpText}>Update An Account</p>
                    <TextField required="true" onChange={(event) => { handleChange(event, "firstname") }} className={styles.textField} id="standard-basic" label="First Name" variant="outlined" />
                    <TextField required="true" onChange={(event) => { handleChange(event, "lastname") }} className={styles.textField} id="standard-basic" label="Last Name" variant="outlined" />
                    <TextField required="true" onChange={(event) => { handleChange(event, "phone") }} className={styles.textField} id="standard-basic" label="Phone Number" variant="outlined" />
                    <TextField required="true" onChange={(event) => { handleChange(event, "password") }} className={styles.textField} id="standard-basic" label="Password" type="password" variant="outlined" />
                    <TextField required="true" onChange={(event) => { handleChange(event, "confirmPass") }} className={styles.textField} id="standard-basic" label="Confirm Password" type="password" variant="outlined" />
                    <Button className={styles.btn} onClick={submit} variant="contained" endIcon={<DoubleArrowIcon />}>Submit</Button>
                </form>
            </div>
        </div>
    )
}

export default Profile
