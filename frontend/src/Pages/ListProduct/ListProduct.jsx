import React, { useState, useEffect, useRef } from 'react'
import Topbar from '../../Components/Topbar/Topbar'
import styles from "./ListProduct.module.css"
import { Card, Typography, Button, CardMedia, TextField, ToggleButton, ToggleButtonGroup } from '@mui/material'
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DatePicker from '@mui/lab/DatePicker';
import axios from '../../Helper/axios'
import { useHistory } from "react-router-dom"
const getBase64 = (file, cb) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });
}
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
  const [productImage, setProductImage] = useState("")
  const formRef = useRef();
  const handleChange = async (event, type) => {
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
      case "productImage":
        setProductImage(await getBase64(event.target.files[0]))
      default:
        break;
    }
  }



  const handleSelectChange = (event) => {
    setProductCategory(event.target.value)
  }



  const confirmButton = useRef()
  useEffect(() => {
    confirmButton.current.disabled = false
    const dt = new Date();
    dt.setMonth(dt.getMonth() + 1)
    setMaxDate(dt)

  }, [])




  const setAuction = (event) => {
    if (formRef.current.reportValidity()) {
      event.preventDefault();
      const year = date.getFullYear();
      const month = date.getMonth() + 1;
      const day = date.getDate();
      const array = productCategory.split(" & ")
      let stringCategory = ""
      for (let i = 0; i < array.length; i++) {
        stringCategory += array[i].toLowerCase()
        if (i < array.length - 1) {
          stringCategory += "-"
        }
      }
      const body = {
        productName,
        category: stringCategory,
        productDetails: productDescription,
        startingBid: parseInt(startingBid),
        productCondition: condition,
        photo: productImage,
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
              <input
                style={{ marginTop: '20px' }}
                type="file"
                onChange={(event) => { handleChange(event, "productImage") }}
              />
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
              <button ref={confirmButton} onClick={setAuction} className={styles.confirm} >Set Up Auction</button>
            </div>



          </form>
        </Card>
      </div>
    </div>
  )
}

export default ListProduct