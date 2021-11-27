import React, { useState, useMemo } from 'react'
import { Route, Switch } from "react-router-dom";
import { UserContext } from '../Helper/userContext'
import SignUp from '../Pages/Auth/SignUp/SignUp';
const RouteManager = () => {
    const [user, setUser] = useState(null);

    const value = useMemo(() => ({ user, setUser }), [user, setUser]);
    return (
        <Switch>
            <UserContext.Provider value={value}>
            <Route path={"/signUp"} exact component={SignUp} />
            </UserContext.Provider>
        </Switch>
    )
}

export default RouteManager