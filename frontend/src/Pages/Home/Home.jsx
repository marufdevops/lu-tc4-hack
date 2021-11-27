import { Card, Typography, CardMedia, Button, IconButton } from '@mui/material'
import React, { useEffect, useState, useRef } from 'react'
import Cookies from 'universal-cookie';

import Topbar from '../../Components/Topbar/Topbar'
import styles from './Home.module.css';
import axios from '../../Helper/axios'
import { useHistory } from 'react-router';

const Home = () => {
  return (
    <div>
      <Topbar list={["Sign Up", "Login"]} />

    </div>
  )
}

export default Home
