import React, { useEffect, useState } from 'react'
import axios from '../../Helper/axios'
import Cookies from 'universal-cookie';
import { Card, Typography, CardMedia, Button, IconButton } from '@mui/material'
import Topbar from '../../Components/Topbar/Topbar'
import styles from './MyBids.module.css'
import profile from './profile.png'
import { useHistory } from 'react-router';
const cookies = new Cookies()
const MyBids = () => {
    let history=useHistory();
    const [bids, setBids] = useState([])
    useEffect(() => {
        axios.get("/api/users/customer")
            .then(res => {
                console.log(res.data.data.customer.bids);
                setBids(res.data.data.customer.bids)
            }).catch(err => {
                console.log(err);
            })
    }, [])
    return (
        <div>
            {cookies.get('bargainc') ? <Topbar list={[{ link: "profile", base: (<img className={styles.profileImage} src={profile}></img>), type: 'image' }]} /> : <Topbar list={[{ link: "login", base: "Login" }, { link: "signUp", base: "Sign Up" }]} />}
            <h1 style={{ textAlign: 'center' }}>MY BIDS</h1>
            <ul className={styles.list}>

                {bids.map((bid, index) => {
                    return (
                        <Card key={index} variant="outlined" className={styles.appointmentCard}>
                            <Typography className={styles.appointmentWith} variant="body3" color="text.secondary">
                                Product Name : {bid.productName}
                            </Typography>
                            <Typography className={styles.appointmentTime} variant="body3" color="text.secondary">
                                My Bid: {bid.bid}
                            </Typography>
                            <Button
                                onClick={()=>{history.push(`/product/${bid._productId}`)}}
                                    className={styles.joinBtn} variant="outlined" >View Product</Button>
                        </Card>
                    )
                })}
            </ul>
        </div>
    )
}

export default MyBids
