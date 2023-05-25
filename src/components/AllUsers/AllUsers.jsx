import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUsers } from "../../Redux/actions";

const AllUsers = () => {
  const allUsers = useSelector((state) => state.users);
  const dispatch = useDispatch();
  
  console.log(allUsers)
  
  useEffect(() => {
    dispatch(getUsers());
  }, [dispatch]);

  return (
    <div>
      {allUsers ? (
        allUsers.length > 0 ? (
          <ul>
            {allUsers.map((user) => (
              <li key={user.id}>
                ID: {user.id}, Name: {user.name}, Email: {user.email}, Role:{" "}
                {user.role}, Active: {user.active ? "Yes" : "No"}
              </li>
            ))}
          </ul>
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