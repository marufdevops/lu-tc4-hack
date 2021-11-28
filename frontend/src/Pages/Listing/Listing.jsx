import React, { useState, useEffect, useRef } from 'react'
import Cookies from 'universal-cookie'
import { Typography, Grid, Button, Card } from '@mui/material'
import styles from './Listing.module.css'
import Topbar from '../../Components/Topbar/Topbar'
import ps5 from './ps5.jpg'
import profile from './profile.png'
import axios from '../../Helper/axios'
import { useHistory } from 'react-router';
let cookies = new Cookies()
const Listing = (props) => {
  let history = useHistory()
  const [response, setResponse] = useState([])
  const [products, setProducts] = useState([])
  const [category, setCategory] = useState("")
  const [search, setSearch] = useState("")
  useEffect(() => {
    axios.get("/api/products")
      .then(res => {
        setResponse(res.data.data.products)
        setProducts(res.data.data.products)
        console.log(res.data.data.products);
        if (props.match.params.category) {
          console.log("what");
          setCategory(props.match.params.category)
          setProducts(response.filter(product => product.category === props.match.params.category))
        }
      }).catch(err => {
        console.log(err);
      })
  }, [])

  useEffect(() => {
    setProducts(response.filter(product => product.productName.toLowerCase().includes(search.toLowerCase())))
  }, [search])

  useEffect(() => {
    setProducts(response.filter(product => product.category === category))
  }, [category])

  const searchInputHandler = (event) => {
    setSearch(event.target.value)
  }

  useEffect(() => { console.log(response); }, [response])
  return (
    <div>
      {cookies.get('bargainc') ? <Topbar list={[{ link: "profile", base: (<img className={styles.profileImage} src={profile}></img>), type: 'image' }]} /> : <Topbar list={[{ link: "login", base: "Login" }, { link: "signUp", base: "Sign Up" }]} />}

      <Grid
        container
        spacing={2}
        justifyContent="flex-start"
        className={styles.gridContainer}
      >
        <Grid item xs={8} sm={6} md={2.7}>
          <ul className={styles.categoryList}>
            <li className={category === "electronics-accessories" ? styles.activeItem : null} onClick={() => { setCategory("electronics-accessories") }}>Electronics & Accessories</li>
            <li className={category === "collectibles-art" ? styles.activeItem : null} onClick={() => { setCategory("collectibles-art") }}>Collectibles & Art</li>
            <li className={category === "toys-hobbies" ? styles.activeItem : null} onClick={() => { setCategory("toys-hobbies") }}>Toys & Hobbies</li>
            <li className={category === "fashion" ? styles.activeItem : null} onClick={() => { setCategory("fashion") }}>Fashion</li>
            <li className={category === "sportingGoods" ? styles.activeItem : null} onClick={() => { setCategory("sportingGoods") }}>Sporting Goods</li>
            <li className={category === "health-beauty" ? styles.activeItem : null} onClick={() => { setCategory("health-beauty") }}>Health & Beauty</li>
            <li className={category === "books-movies-music" ? styles.activeItem : null} onClick={() => { setCategory("books-movies-music") }}>Books, Movies & Music</li>
            <li className={category === "home-garden" ? styles.activeItem : null} onClick={() => { setCategory("home-garden") }}>Home & Garden</li>
          </ul>
        </Grid>
        <Grid item xs={8} sm={6} md={8.65}>
          <div className={styles.searchInputDiv}>
            <input className={styles.searchInput} onChange={(event) => { searchInputHandler(event) }} placeholder="Search For Products" />
          </div>
          <div className={styles.items}>
            {products.map(product => {
              return (
                <Card onClick={() => { history.push(`/product/${product.id}`) }} className={styles.homeCard} variant="outlined">
                  <img className={styles.productImage} src={ps5}></img>
                  <p className={styles.featuredProductName}>{product.productName}</p>
                  <p className={styles.featuredProductBid}>Current Bid : $ {product.maxBid}</p>
                </Card>
              )
            })}
          </div>
        </Grid>
      </Grid>
    </div>
  )
}

export default Listing
