import React from 'react'
import { Redirect, Route } from "react-router-dom";
import Cookies from 'universal-cookie';
function ProtectedRoute({ component: Component, role:role}) {
    const cookies = new Cookies();
    return (
        <Route
            render={(props) =>

                role?(cookies.get("bargainc") && (cookies.get("bargainr")) && (role===cookies.get("bargainr"))) ? <Component {...props}/> : <Redirect to="/login" />:
                (cookies.get("bargainc") && (cookies.get("bargainr"))) ? <Component {...props}/> : <Redirect to="/login" />
            }
        />
    )
}

export default ProtectedRoute