import React, { useState, useEffect } from 'react'
import Topbar from '../../../Components/Topbar/Topbar'
import { Button, TextField } from '@mui/material'
import styles from './Verification.module.css'
import DoubleArrowIcon from '@mui/icons-material/DoubleArrow';
import axios from '../../../Helper/axios'
import Cookies from 'universal-cookie';
import { useHistory } from "react-router-dom"
const cookies = new Cookies()
const Verification = () => {
    const [nid, setNid] = useState("")
    const [nidFront,setNidFront]=useState("")
    const [nidBack,setNidBack]=useState("")
    const formRef = React.useRef();
    const handleChange = (event, type) => {
        switch (type) {
            case "nationalIdNumber":
                setNid(event.target.value)
                break
            case "nidBack":
                console.log(event.target.files[0]);
                break;
            case "nidFront":
                console.log(event.target.files[0])
                break;
            default:
                break;
        }
    }
    const submit = () => {
        console.log(nid);
    }
    return (
        <div className={styles.mainDiv} style={{ backgroundColor: "#EFF5E9" }}>
            <Topbar list={[]} />
            <div className={styles.mainSignUpDiv}>
                <form ref={formRef} className={styles.signUpDiv}>
                    <p className={styles.signUpText}>Verification</p>
                    <TextField required="true" onChange={(event) => { handleChange(event, "nationalIdNumber") }} className={styles.textField} id="standard-basic" label="National Identity Number" variant="standard" />
                    <Button
                        variant="contained"
                        component="label"
                    >
                        NID Front Side
                        <input
                            type="file"
                            hidden
                            onChange={(event) => { handleChange(event, "nidFront") }}
                        />
                    </Button>
                    <Button style={{margin:'10px'}}
                        variant="contained"
                        component="label"
                    >
                        NID Back Side
                        <input
                            type="file"
                            hidden
                            onChange={(event) => { handleChange(event, "nidBack") }}
                        />
                    </Button>
                    <Button className={styles.btn} onClick={submit} variant="contained" endIcon={<DoubleArrowIcon />}>Submit</Button>
                </form>
            </div>
        </div>
    )
}

export default Verification
