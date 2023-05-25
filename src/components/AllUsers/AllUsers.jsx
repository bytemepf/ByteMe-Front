import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUsers } from "../../Redux/actions";
import styles from "./AllUsers.module.css";

const AllUsers = () => {
  const allUsers = useSelector((state) => state.users);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUsers());
  }, [dispatch]);

  const usersList = Array.isArray(allUsers) ? allUsers : [allUsers];

  console.log(usersList);

  return (
    <div className={styles.usersListContainer}>
      {usersList ? (
        usersList.length > 0 ? (
          <div className={styles.cardContainer}>
            {usersList.map((user) => (
              <div key={user.id} className={styles.card}>
                <p>ID: {user.id}</p>
                <p>Name: {user.name}</p>
                <p>Email: {user.email}</p>
                <p>Role: {user.role}</p>
                <p>Active: {user.active ? "Yes" : "No"}</p>
              </div>
            ))}
          </div>
        ) : (
          <p>No hay usuarios</p>
        )
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default AllUsers;