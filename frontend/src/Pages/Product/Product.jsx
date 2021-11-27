import React, { useEffect, useState } from 'react'
import styles from './Product.module.css'
import Topbar from '../../Components/Topbar/Topbar'
import productPic from './ps5.jpg'
import { Typography, Grid, Button } from '@mui/material'
import profile from './profile.png'
import axios from '../../Helper/axios'
import Cookies from 'universal-cookie'
import { useHistory } from 'react-router'
let cookies=new Cookies()
const product = () => {
  // let history = useHistory()
  // const cookies = new Cookies()
  // const [specializations, setSpecializations] = useState([])
  // const [achievements, setAchievements] = useState("")
  // const [education_qualifications, setEducation_qualifications] = useState("")
  // const [research_and_Publications, setResearch_and_Publications] = useState("")
  // const [work_experience, setWork_experience] = useState("")
  // const [fullname, setFullname] = useState("")
  // const [degrees, setDegrees] = useState("")
  // const [same, setSame] = useState(true)

  // const setAppointmentButtonClicked = () => {
  //   history.push(`/product/${props.match.params.id}/appointment`)
  // }

  // const chatButtonClicked = () => {
  //   history.push(`/chat/${props.match.params.id}`)
  // }


  // useEffect(() => {
  //   axios.get(`/api/users/products/${props.match.params.id}`)
  //     .then(res => {
  //       console.log(res);
  //       const role = cookies.get("assistr")
  //       const response = res.data.data[role]
  //       setSpecializations(res.data.data.product.Specialization)
  //       setAchievements(res.data.data.product.Achievements)
  //       setEducation_qualifications(res.data.data.product.Education_qualifications)
  //       setResearch_and_Publications(res.data.data.product.Research_and_Publications)
  //       setWork_experience(res.data.data.product.Work_experience)
  //       setFullname(res.data.data.product.fullname)
  //       setDegrees(res.data.data.product.Degrees)
  //       setSame(res.data.data.same)
  //     })
  // }, [])




  return (
    <div>
      {cookies.get('bargainc')?  <Topbar list={[{link:"profile", base:(<img className={styles.profileImage} src={profile}></img>), type:'image'}]}/> : <Topbar list={[{ link: "login", base: "Login" }, { link: "signUp", base: "Sign Up" }]} /> }
      <Grid
        container
        spacing={8}
        justifyContent="flex-start"
        className={styles.gridContainer}
      >
        <Grid item xs={8} sm={6} md={3}>
          <div className={styles.productInfo1}>
            <img className={styles.productImg} src={productPic} alt="" />
          </div>
        </Grid>

        <Grid item xs={8} sm={6} md={8.65}>


          <h1 style={{ textAlign: 'left' }}>Playstation 5 128 GB With 3 Free Games</h1>
          <hr style={{ borderTop: '1px solid #40B8E5' }}></hr>
          <Typography className={styles.infoTitle} gutterBottom variant="h5" component="div">
              Condition: New
            </Typography>
            <Typography className={styles.infoTitle} gutterBottom variant="h5" component="div">
              Time Left: 14H 15M
            </Typography>
            <hr style={{ borderTop: '1px solid #40B8E5' }}></hr>
            <Typography className={styles.infoTitle} gutterBottom variant="h5" component="div">
              Current Bid: $340
            </Typography>
            <div>
              <input className={styles.placeBid}/> <button className={styles.bidButton}>Place Bid</button>
            </div>
            <p style={{margin:'10px 0 10px 0'}}>OR</p>
            <div>
              <input className={styles.placeBid}/> <button className={styles.bidButton}>BUY NOW</button>
            </div>
        </Grid>
        </Grid>
        <div className={styles.description}>
        <h3>Product Description </h3> 
        Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
      
        </div>
    </div>
  )
}

export default product