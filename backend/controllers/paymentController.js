const express = require('express')
require("dotenv").config();


const stripePublishable = process.env.STRIPE_PUBLISHABLE;
const stripeSecret = process.env.STRIPE_SECRET;



