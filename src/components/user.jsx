import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { Logoutbutton as LogoutButton } from "./Logout";
import style from "./user.css"
import { useDispatch } from "react-redux";
import { loginUser } from "../Redux/actions";

export const User = () => {
    const { user, isAuthenticated, isLoading } = useAuth0();
    const dispatch = useDispatch();

    if (isLoading) {
      return <div>Loading...</div>;
    } else if (user && isAuthenticated){
      dispatch(loginUser(user))
    }
    
    return (
      isAuthenticated && (
        <div className={style.containeruser}>
          <img src={user.picture} alt={user.name} />
          <h2>{user.name}</h2>
          <p>{user.email}</p>
          <LogoutButton />
        </div>
      )
    );
      }    
  

export default User;