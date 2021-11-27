import React, { useState, useEffect, useRef } from 'react'
import Topbar from '../../Components/Topbar/Topbar'
import styles from "./ListProduct.module.css"
import { Card, Typography, Button, CardMedia, TextField, ToggleButton, ToggleButtonGroup } from '@mui/material'
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DatePicker from '@mui/lab/DatePicker';
import axios from '../../Helper/axios'
import { useHistory } from "react-router-dom"

const ListProduct = () => {
  let history = useHistory()
  const [date, setDate] = useState(new Date());
  const [maxDate, setMaxDate] = useState("")
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [number, setNumber] = useState("")
  const [productName, setProductName] = useState("")
  const [time, setTime] = useState("")
  const [profName, setProfName] = useState("")
  const [timeState, setTimeState] = useState("")
  const responseRef = useRef()
  const formRef = useRef();
  const handleChange = (event, type) => {
    switch (type) {
      case "name":
        setName(event.target.value)
        break;
      case "email":
        setEmail(event.target.value)
        break;
      case "productName":
        setProductName(event.target.value)
        break;
      case "number":
        setNumber(event.target.value)
        break;

      default:
        break;
    }
  }


  const handleDateChange = (newDate) => {
    setDate(newDate)
  }


  const paymentButton = useRef()
  const confirmButton = useRef()
  useEffect(() => {
    confirmButton.current.disabled = true
    const dt = new Date();
    dt.setMonth(dt.getMonth() + 1)
    setMaxDate(dt)

  }, [])


  const makePayment = () => {
    confirmButton.current.disabled = false;
    paymentButton.current.disabled = true;
    paymentButton.current.innerText = "Payment Done"

  }

  const confirmAppointment = (event) => {
    if (formRef.current.reportValidity()) {
      event.preventDefault();
      const body = {
        consumersName: name,
        email,
        number,
        productName,
        time,
        date: date.toDateString(),
      }
    }
  }


  return (
    <div className={styles.mainDiv}>
      <Topbar list={[{ link: "login", base: "Login" }, { link: "signUp", base: "Sign Up" }]} />
      <div className={styles.appointmentDiv}>
        <Card variant="outlined" className={styles.profApproveCard}>
          <form ref={formRef} className={styles.appointmentForm}>
            <div className={styles.appointmentForm}>
              <Typography className={styles.profName} gutterBottom variant="h5" component="div">
                List New Product
              </Typography>
              <div className={styles.formFields1}>
                <TextField required="true" onChange={(event) => { handleChange(event, "productName") }} className={styles.textField} id="standard-basic" label="ProductName" variant="outlined" />
                <TextField required="true" onChange={(event) => { handleChange(event, "name") }} className={styles.textField} id="standard-basic" label="Product Name" variant="outlined" />

              </div>
              <div className={styles.formFields1}>
                <TextField required="true" onChange={(event) => { handleChange(event, "email") }} className={styles.textField} id="standard-basic" type="email" label="Email" variant="outlined" />
                <TextField required="true" onChange={(event) => { handleChange(event, "number") }} className={styles.textField} id="standard-basic" type="text" label="Phone Number" variant="outlined" />

              </div>
              <div
                className={styles.datePicker}>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <DatePicker
                    label="Basic example"
                    value={date}
                    onChange={(newValue) => {
                      setDate(newValue);
                    }}
                    renderInput={(params) => <TextField {...params} />}
                  />
                </LocalizationProvider>
              </div>
            </div>

            <div className={styles.appointmentBtn}>
              <button ref={paymentButton} onClick={makePayment} className={styles.makePayment} >Make Payment</button>
              <button ref={confirmButton} onClick={confirmAppointment} className={styles.confirm} >Confirm Appointment</button>
            </div>


            {/* <Button className={styles.btn} onClick={submit} variant="contained" endIcon={<DoubleArrowIcon />}>Submit</Button> */}
          </form>
        </Card>
      </div>
    </div>
  )
}

export default ListProduct