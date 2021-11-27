import { Card, Typography, CardMedia, Button, IconButton } from '@mui/material'
import React, { useEffect, useState, useRef } from 'react'
import Cookies from 'universal-cookie';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import Topbar from '../../Components/Topbar/Topbar'
import styles from './Home.module.css';
import axios from '../../Helper/axios'
import profile from './profile.png'
import { useHistory } from 'react-router';
import ps5 from './ps5.jpg'
const cookies = new Cookies()
const Home = () => {
  let history = useHistory()
  const cardClickHandler = (product) => {
    history.push(`/product/${product}`)
  }
  const categoryClickHandler=(category)=>{
    history.push(`/category/${category}`)
  }

  return (
    <div>
      {cookies.get('bargainc')?  <Topbar list={[{link:"profile", base:(<img className={styles.profileImage} src={profile}></img>), type:'image'}]}/> : <Topbar list={[{ link: "login", base: "Login" }, { link: "signUp", base: "Sign Up" }]} /> }
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
        <Card onClick={() => { cardClickHandler("ps5") }} className={styles.homeCard} variant="outlined">
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
        <div onClick={()=>{categoryClickHandler("electronics-accessories")}}>
        <Card className={styles.categoryCard} variant="outlined">
          <img className={styles.categoryImage} src={ps5}></img>
          
        </Card><p style={{textAlign:'center'}}>Electronics & Accessories</p>
        </div>
        <div onClick={()=>{categoryClickHandler("collectibles-art")}}>
        <Card className={styles.categoryCard} variant="outlined">
          <img className={styles.categoryImage} src={ps5}></img>
          
        </Card><p>Collectibles & Art</p>
        </div>
        <div onClick={()=>{categoryClickHandler("toys-hobbies")}}>
        <Card className={styles.categoryCard} variant="outlined">
          <img className={styles.categoryImage} src={ps5}></img>
          
        </Card><p>Toys & Hobbies</p>
        </div>
        <div onClick={()=>{categoryClickHandler("fashion")}}>
        <Card className={styles.categoryCard} variant="outlined">
          <img className={styles.categoryImage} src={ps5}></img>
        </Card><p>Fashion</p>
        </div>
        <div onClick={()=>{categoryClickHandler("sportingGoods")}}>
        <Card className={styles.categoryCard} variant="outlined">
          <img className={styles.categoryImage} src={ps5}></img>
        </Card><p>Sporting Goods</p>
        </div>
        <div onClick={()=>{categoryClickHandler("health-beauty")}}>
        <Card className={styles.categoryCard} variant="outlined">
          <img className={styles.categoryImage} src={ps5}></img>
        </Card><p>Health & Beauty</p>
        </div>
        <div onClick={()=>{categoryClickHandler("books-movies-music")}}>
        <Card className={styles.categoryCard} variant="outlined">
          <img className={styles.categoryImage} src={ps5}></img>
        </Card><p>Books, Movies & Music</p>
        </div>
        <div onClick={()=>{categoryClickHandler("home-garden")}}>
        <Card className={styles.categoryCard} variant="outlined">
          <img className={styles.categoryImage} src={ps5}></img>
        </Card><p>Home & Garden</p>
        </div>
      </div>
    </div>
  )
}

export default Home
