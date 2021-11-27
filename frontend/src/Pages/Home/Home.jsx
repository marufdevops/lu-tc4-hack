import { Card, Typography, CardMedia, Button, IconButton } from '@mui/material'
import React, { useEffect, useState, useRef } from 'react'
import Cookies from 'universal-cookie';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import Topbar from '../../Components/Topbar/Topbar'
import styles from './Home.module.css';
import axios from '../../Helper/axios'
import { useHistory } from 'react-router';
import ps5 from './ps5.jpg'
const Home = () => {
  let history=useHistory()
  const categoryClickHandler=(category)=>{
    history.push(`/category/${category}`)
  }

  return (
    <div>
      <Topbar list={[{ link: "login", base: "Login" }, { link: "signUp", base: "Sign Up" }]} />
      <ul className={styles.categories}>
        <li>Browse By Category</li>
        <li>Electronics</li>
        <li>Kitchen Utensils</li>
        <li>Household Items</li>
      </ul>
      <hr style={{ borderTop: '1px solid #40B8E5' }}></hr>
      <div className={styles.searchDiv}>
        Search For Product
        <div className={styles.searchInputDiv}>
          <input className={styles.searchInput} />
          <SearchOutlinedIcon fontSize='large' />
        </div>
      </div>
      <div className={styles.products}>
        <Card className={styles.homeCard} variant="outlined">
          <img className={styles.productImage} src={ps5}></img>
          <p>Play Station 5</p>
          <p>Current Bid : $380</p>
        </Card>
        <Card className={styles.homeCard} variant="outlined">
          <img className={styles.productImage} src={ps5}></img>
          <p>Play Station 5</p>
          <p>Current Bid : $380</p>
        </Card>
        <Card className={styles.homeCard} variant="outlined">
          <img className={styles.productImage} src={ps5}></img>
          <p>Play Station 5</p>
          <p>Current Bid : $380</p>
        </Card>
        <Card className={styles.homeCard} variant="outlined">
          <img className={styles.productImage} src={ps5}></img>
          <p>Play Station 5</p>
          <p>Current Bid : $380</p>
        </Card>
        <Card className={styles.homeCard} variant="outlined">
          <img className={styles.productImage} src={ps5}></img>
          <p>Play Station 5</p>
          <p>Current Bid : $380</p>
        </Card>
        <Card className={styles.homeCard} variant="outlined">
          <img className={styles.productImage} src={ps5}></img>
          <p>Play Station 5</p>
          <p>Current Bid : $380</p>
        </Card>
      </div>

      <p className={styles.categoriesHeaderText}> Search By Popular Categories </p>
      <div className={styles.categories}>
        <div onClick={()=>{categoryClickHandler("electronics")}}>
        <Card className={styles.categoryCard} variant="outlined">
          <img className={styles.categoryImage} src={ps5}></img>
          
        </Card><p>Electronics</p>
        </div>
        <div>
        <Card className={styles.categoryCard} variant="outlined">
          <img className={styles.categoryImage} src={ps5}></img>
          
        </Card><p>Clothes</p>
        </div>
        <div>
        <Card className={styles.categoryCard} variant="outlined">
          <img className={styles.categoryImage} src={ps5}></img>
          
        </Card><p>Toys</p>
        </div>
        <div>
        <Card className={styles.categoryCard} variant="outlined">
          <img className={styles.categoryImage} src={ps5}></img>
        </Card><p>Collectibles</p>
        </div>
      </div>
    </div>
  )
}

export default Home
