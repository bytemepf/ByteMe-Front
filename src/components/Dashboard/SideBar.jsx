import style from "./SideBar.module.css"
import React from "react";
import { Link } from "react-router-dom";
import logo from "../../img/logo/logo.png"

function SideBar() {
    return (
      <div className={style.maincontainer}>
      <div className={style.sidebarcontainer}>
        <Link to="/admin/add">Crear producto</Link>
        <Link to="/admin/list">Administrar productos</Link>
        <Link to="/admin/allUsers">Administrar usuarios</Link>
        <Link to="/home">Página principal</Link>
        {/* Otros enlaces de la sidebar */}
      </div>
      </div>
    );
  };
  
  export default SideBar;