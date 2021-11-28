import React, { useState, useMemo } from 'react'
import { Route, Switch } from "react-router-dom";
import { UserContext } from '../Helper/userContext'
import Login from '../Pages/Auth/Login/Login';
import SignUp from '../Pages/Auth/SignUp/SignUp';
import Verification from '../Pages/Auth/Verification/Verification';
import Home from '../Pages/Home/Home';
import Product from '../Pages/Product/Product'
import ListProduct from '../Pages/ListProduct/ListProduct'
import MyBids from '../Pages/MyBids/MyBids';
import Verify from '../Pages/verify/Verify';
import Listing from '../Pages/Listing/Listing';
import ProtectedRoute from './ProtectedRoute'
import Profile from '../Pages/Profile/Profile';
import AdminPanel from '../Pages/Auth/Admin/Admin';
const RouteManager = () => {
  const [user, setUser] = useState(null);

  const value = useMemo(() => ({ user, setUser }), [user, setUser]);
  return (
    <Switch>
      <Route path={"/login"} exact component={Login} />
      <Route path={"/home"} exact component={Home} />
      <ProtectedRoute path={"/"} exact component={Home} />
      <Route path={"/product/:prod"} exact component={Product} />
      <ProtectedRoute role="seller" path={"/Listproduct"} exact component={ListProduct} />
      <Route path={"/profile"} exact component={Profile}/>
      <Route path={"/Listproduct"} exact component={ListProduct} />
      <ProtectedRoute role="admin" path={'admin'} exact component={AdminPanel} />
      <Route path={"/ver"} exact component={Verify} />
      <Route path={"/listings"} exact component={Listing} />
      <Route path={"/listings/:category"} exact component={Listing} />

      <Route path={"/myBids"} exact component={MyBids} />


      <UserContext.Provider value={value}>
        <Route path={"/signUp"} exact component={SignUp} />
        <Route path={"/verification"} exact component={Verification} />
      </UserContext.Provider>
    </Switch>
  )
}

export default RouteManager