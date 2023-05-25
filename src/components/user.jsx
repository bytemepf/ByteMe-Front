import React, { useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { Logoutbutton as LogoutButton } from "./Logout";
import styles from "./user.module.css";
import { useDispatch } from "react-redux";
import { postUsers } from "../Redux/actions";
import { Link } from "react-router-dom";

export const User = () => {
  const { user, isAuthenticated, isLoading } = useAuth0();
  const dispatch = useDispatch();

  console.log(user);

  useEffect(() => {
    if (isAuthenticated && user) {
      dispatch(postUsers(user));
      localStorage.setItem("usuario", JSON.stringify(user));
    }
  }, [dispatch, isAuthenticated, user]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    
    user && isAuthenticated ? (
      <body className={styles.body}>
        <div className={styles.containeruser}>
          <div className={styles.user}>
            <Link to="/Home">
              <div className={styles.homeButton}>
                <button>Volver a página principal</button>
              </div>
            </Link>
            <img src={user.picture} alt={user.name} />
            <h2>{user.name}</h2>
            <p>{user.email}</p>
            <div className={styles.logout}>
              <LogoutButton />
            </div>
          </div>
        </div>
      </body>
    ) : (
      <h1>Loading...</h1>
    )
  );}    
  

export default User;