import style from "./SideBar.module.css"
import React from "react";
import { Link } from "react-router-dom";


function SideBar() {
    return (
      <div className={style.sidebarcontainer}>
        <Link to="/admin/add">Crear producto</Link>
        <Link to="/admin/list">Administrar productos</Link>
        <Link to="/home">HOME</Link>
        {/* Otros enlaces de la sidebar */}
      </div>
    );
  };
  
  export default SideBar;