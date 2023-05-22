import { useState } from "react";
import { Link } from "react-router-dom";

function CategoriesHeader() {
  const [btnName, setBtnName] = useState("todo");

  const handleBtnName = (e) => {
    setBtnName(e);
  };

  return (
    <>
      <div className="container">
        <div className="catego-header">
          <div className="title-home">
            <Link onClick={() => window.scrollTo(0, 0)} to="/home">
              <i className="fa-solid fa-angle-left"></i> Home
            </Link>
            <h3>{btnName}</h3>
          </div>
          <div className="filter-btns">
            <Link to="/categories/all" onClick={() => handleBtnName("Todo")}>
              <button>Todos los productos</button>
            </Link>
            <Link to="/categories/all/teclados">
              <button onClick={() => handleBtnName("Teclados")}>
              Teclados
              </button>
            </Link>
            <Link to="/categories/all/ratones">
              <button onClick={() => handleBtnName("Ratones")}>
              Ratones
              </button>
            </Link>
            <Link to="/categories/all/audio">
              <button onClick={() => handleBtnName("Audio")}>Audio</button>
            </Link>
            <Link to="/categories/all/monitores">
              <button onClick={() => handleBtnName("Monitores")}>Monitores</button>
            </Link>
            <Link to="/categories/all/gabinetes">
              <button onClick={() => handleBtnName("Gabinetes")}>Gabinetes</button>
            </Link>
            <Link to="/categories/all/sillas">
              <button onClick={() => handleBtnName("Sillas")}>
              Sillas
              </button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

export default CategoriesHeader;
