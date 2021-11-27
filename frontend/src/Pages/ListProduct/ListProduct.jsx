import React, { useState, useEffect, useRef } from 'react'
import Topbar from '../../Components/Topbar/Topbar'
import styles from "./ListProduct.module.css"
import { Card, Typography, Button, CardMedia, TextField, ToggleButton, ToggleButtonGroup } from '@mui/material'
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DatePicker from '@mui/lab/DatePicker';
import axios from '../../Helper/axios'
import { useHistory } from "react-router-dom"

const categories = ['Electronics & Accessories', 'Collectibles & Art', 'Toys & Hobbies', 'Fashion', 'Sporting Goods', 'Health & Beauty', 'Books, Movies & Music', 'Home & Garden']
const ListProduct = () => {
  let history = useHistory()
  const [productName, setProductName] = useState("")
  const [productDescription, setProductDescription] = useState("")
  const [startingBid, setStartingBid] = useState("")
  const [date, setDate] = useState(new Date());
  const [condition, setCondition] = useState("")
  const [maxDate, setMaxDate] = useState("")
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [number, setNumber] = useState("")
  const [time, setTime] = useState("")
  const [profName, setProfName] = useState("")
  const [timeState, setTimeState] = useState("")
  const [productCategory, setProductCategory] = useState(categories[0])
  const formRef = useRef();
  const handleChange = (event, type) => {
    switch (type) {
      case "productName":
        setProductName(event.target.value)
        break;
      case "productDescription":
        setProductDescription(event.target.value)
        break;
      case "productCondition":
        setCondition(event.target.value)
        break;
      case "startingBid":
        setStartingBid(event.target.value)
        break;
      default:
        break;
    }
  }



  const handleSelectChange = (event) => {
    setProductCategory(event.target.value)
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
      const year = date.getFullYear();
      const month = date.getMonth() + 1;
      const day = date.getDate();
      const body = {
        productName,
        category: productCategory,
        productDetails: productDescription,
        startingBid,
        productCondition: condition,
        auctionDeadline: day + "/" + month + "/" + year,
      }
      axios.post("/api/products", body)
        .then(res => {
          console.log(res);
          history.push("/home")
        }).catch(err => {
          console.log(err);
        })
      console.log(body);
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
              <TextField required="true" onChange={(event) => { handleChange(event, "productName") }} className={styles.textField} id="standard-basic" label="ProductName" variant="outlined" />
              <div style={{ marginTop: '20px' }}>
                <select name="Select One" onChange={handleSelectChange} value={productCategory} className={styles.categorySelect}>
                  {categories.map((category, index) => {
                    return <option key={index}>{category}</option>
                  })}
                </select>
              </div>

              <div className={styles.formFields1}>
                <TextField required="true" onChange={(event) => { handleChange(event, "productDescription") }} className={styles.textField} id="standard-basic" type="text" label="Product Description" variant="outlined" />
                <TextField required="true" onChange={(event) => { handleChange(event, "productCondition") }} className={styles.textField} id="standard-basic" type="text" label="Product Condition" variant="outlined" />
                <TextField required="true" onChange={(event) => { handleChange(event, "startingBid") }} className={styles.textField} id="standard-basic" type="number" label="Starting Bid" variant="outlined" />

              </div>
              <div
                className={styles.datePicker}>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <DatePicker
                    label="Auction Deadline"
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