import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUsers, logicalDeletion } from "../../Redux/actions";
import styles from "./AllUsers.module.css";

const AllUsers = () => {
  const allUsers = useSelector((state) => state.users);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUsers());
  }, [dispatch]);

  const usersList = Array.isArray(allUsers) ? allUsers : [allUsers];

  const handleClick = async (id, active) => {
    await dispatch(logicalDeletion(id));
    dispatch(getUsers())
  };

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
                {/* <p>Token: {user.token}</p> */}
                <p>Active: {user.active ? "Yes" : "No"}</p>
                {user.active ? (
                  <button onClick={() => handleClick(user.id, user.active)} className={styles.deactivate}>
                    Desactivar
                  </button>
                ) : (
                  <button onClick={() => handleClick(user.id, user.active)} className={styles.activate}>
                    Activar
                  </button>
                )}
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