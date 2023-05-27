import React from "react";
import { useAuth0 } from "@auth0/auth0-react";

//http://localhost:3000/home
//  `${process.env.REACT_APP_URL_FRONT}`

export const Logoutbutton = () => {
    const { logout} = useAuth0()

    return <button onClick={() => logout({ returnTo: `${process.env.REACT_APP_URL_FRONT}` })}>Logout</button>

}