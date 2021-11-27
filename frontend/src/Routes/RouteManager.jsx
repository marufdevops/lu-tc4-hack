import React, { useState, useMemo } from 'react'
import { Route, Switch } from "react-router-dom";
import { UserContext } from '../Helper/userContext'
import Login from '../Pages/Auth/Login/Login';
import SignUp from '../Pages/Auth/SignUp/SignUp';
import Verification from '../Pages/Auth/Verification/Verification';
import Home from '../Pages/Home/Home';
const RouteManager = () => {
  const [user, setUser] = useState(null);

  const value = useMemo(() => ({ user, setUser }), [user, setUser]);
  return (
    <Switch>
      <Route path={"/login"} exact component={Login} />
      <Route path={"/home"} exact component={Home} />
      <UserContext.Provider value={value}>
        <Route path={"/signUp"} exact component={SignUp} />
        <Route path={"/verification"} exact component={Verification} />
      </UserContext.Provider>
    </Switch>
  )
}

export default RouteManager