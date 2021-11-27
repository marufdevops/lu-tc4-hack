import { Card, Typography, CardMedia, Button, IconButton } from '@mui/material'
import React, { useEffect, useState, useRef } from 'react'
import Cookies from 'universal-cookie';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import Topbar from '../../Components/Topbar/Topbar'
import styles from './Home.module.css';
import axios from '../../Helper/axios'
import { useHistory } from 'react-router';
import electronicsImg from './1.png'
import collectiblesImg from './2.png'
import toysImg from './3.png'
import fashionImg from './4.png'
import sportingGoodsImg from './5.png'
import healthImg from './6.png'
import booksImg from './7.png'
import homeImg from './8.png'
import ps5 from './ps5.jpg'

const Home = () => {
  let history = useHistory()
  const cardClickHandler = (product) => {
    history.push(`/product/${product}`)
  }
  const categoryClickHandler = (category) => {
    history.push(`/category/${category}`)
  }

  return (
    <div>
      <Topbar list={[{ link: "login", base: "Login" }, { link: "signUp", base: "Sign Up" }]} />
      {/* <ul className={styles.categories}>
        <li>Browse By Category</li>
        <li>Electronics</li>
        <li>Kitchen Utensils</li>
        <li>Household Items</li>
      </ul>
      <hr style={{ borderTop: '1px solid #40B8E5' }}></hr> */}
      <div className={styles.searchDiv}>

        <div className={styles.searchInputDiv}>
          <input className={styles.searchInput} placeholder="Search For Products" />
          <div className={styles.searchIcon}>
            <SearchOutlinedIcon fontSize='large' />
          </div>

        </div>
      </div>
      <p className={styles.categoriesHeaderText}> Featured Listings </p>
      <div className={styles.products}>
        <Card onClick={() => { cardClickHandler("ps5") }} className={styles.homeCard} variant="outlined">
          <img className={styles.productImage} src={ps5}></img>
          <p className={styles.featuredProductName}>Play Station 5</p>
          <p className={styles.featuredProductBid}>Current Bid : $380</p>
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
        <div onClick={() => { categoryClickHandler("electronics-accessories") }}>
          <Card className={styles.categoryCard} variant="outlined">
            <img className={styles.categoryImage} src={electronicsImg}></img>

          </Card><p style={{ textAlign: 'center' }}>Electronics </p>
        </div>
        <div onClick={() => { categoryClickHandler("collectibles-art") }}>
          <Card className={styles.categoryCard} variant="outlined">
            <img className={styles.categoryImage} src={collectiblesImg}></img>

          </Card><p>Collectibles & Art</p>
        </div>
        <div onClick={() => { categoryClickHandler("toys-hobbies") }}>
          <Card className={styles.categoryCard} variant="outlined">
            <img className={styles.categoryImage} src={toysImg}></img>

          </Card><p>Toys & Hobbies</p>
        </div>
        <div onClick={() => { categoryClickHandler("fashion") }}>
          <Card className={styles.categoryCard} variant="outlined">
            <img className={styles.categoryImage} src={fashionImg}></img>
          </Card><p>Fashion</p>
        </div>
        <div onClick={() => { categoryClickHandler("sportingGoods") }}>
          <Card className={styles.categoryCard} variant="outlined">
            <img className={styles.categoryImage} src={sportingGoodsImg}></img>
          </Card><p>Sporting Goods</p>
        </div>
        <div onClick={() => { categoryClickHandler("health-beauty") }}>
          <Card className={styles.categoryCard} variant="outlined">
            <img className={styles.categoryImage} src={healthImg}></img>
          </Card><p>Health & Beauty</p>
        </div>
        <div onClick={() => { categoryClickHandler("books-movies-music") }}>
          <Card className={styles.categoryCard} variant="outlined">
            <img className={styles.categoryImage} src={booksImg}></img>
          </Card><p>Books, Movies & Music</p>
        </div>
        <div onClick={() => { categoryClickHandler("home-garden") }}>
          <Card className={styles.categoryCard} variant="outlined">
            <img className={styles.categoryImage} src={homeImg}></img>
          </Card><p>Home & Garden</p>
        </div>
      </div>
    </div>
  )
}

export default Home
