import Navbar from "./components/Navbar"; 
import { Route, Routes,useLocation } from "react-router-dom";
import Home from "./pages/Home";
import Categories from "./pages/Categories";
import All from "./components/Categories-pages/All";
import Teclados from "./components/Categories-pages/Teclados";
import Ratones from "./components/Categories-pages/Ratones";
import Audio from "./components/Categories-pages/Audio";
import Monitores from "./components/Categories-pages/Monitores";
import Gabinetes from "./components/Categories-pages/Gabinetes";
import Sillas from "./components/Categories-pages/Sillas";
import ProductPage, { CartContext } from "./pages/ProductPage";
import { useEffect, useState } from "react";
import Login from "./pages/Loding/Index.js"; 
import Landing from "../src/pages/Landign.jsx"
import Payment from "../src/components/stripe/Payment.jsx"
import User from "./components/user"
import ProductForm from "./components/Dashboard/ProductForm";
import ProductsList from "./components/Dashboard/ProductsList";
import SideBar from "./components/Dashboard/SideBar";
import AllUsers from "./components/AllUsers/AllUsers";

function App() {
  const [cartItem, setCartItem] = useState([]);

  const addToCart = (item) => {
    setCartItem([...cartItem, item]);
  };

  // local storage
  useEffect(() => {
    const json = localStorage.getItem("cartItem");
    const savedCart = JSON.parse(json);
    if (savedCart) {
      setCartItem(savedCart);
    }
  }, []);

  useEffect(() => {
    const json = JSON.stringify(cartItem);
    localStorage.setItem("cartItem", json);
  }, [cartItem]);

  const location = useLocation();
  console.log(location)
  const hideNavbarRoutes = ["/", "/login", "/register","/payment", "/user", "/admin", "/admin/add", "/admin/list", "/admin/allUsers"];

  function AdminLayout() {
    const [selectedProductId, setSelectedProductId] = useState(null);
    const [isEditMode, setIsEditMode] = useState(false);

// console.log(isEditMode)
// console.log(selectedProductId);
    const handleEdit = (itemId) => {
      setSelectedProductId(itemId);
      setIsEditMode(true);
  };

    return (
      <div className="admin-layout">
        <SideBar />
        <Routes>
          <Route exact path="/add" element={<ProductForm handleEdit={handleEdit} isEditMode={isEditMode} setIsEditMode={setIsEditMode} selectedProductId={selectedProductId} setSelectedProductId={setSelectedProductId}/>} />
          <Route exact path="/list" element={<ProductsList  handleEdit={handleEdit} isEditMode={isEditMode} setIsEditMode={setIsEditMode} selectedProductId={selectedProductId} setSelectedProductId={setSelectedProductId}/>} />
          <Route exact path="/allUsers" element={ <AllUsers handleEdit={handleEdit}/>}/>
        </Routes>
      </div>
    );
  }

  return (
    <CartContext.Provider value={{ cartItem, addToCart, setCartItem }}>
      {hideNavbarRoutes.includes(location.pathname) ? null : <Navbar />}
      <Routes>
        <Route path="/admin/*" element={<AdminLayout />} />

        <Route path="/" element={<Landing />} />
        <Route path="/home" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/user" element={<User/>} />
         <Route path="/payment" element={<Payment/>}/>
        <Route path="categories" element={<Categories />} />
        <Route path="categories/all" element={<All />} />
        <Route path="categories/all/teclados" element={<Teclados />} />
        <Route path="categories/all/ratones" element={<Ratones />} />
        <Route path="categories/all/audio" element={<Audio />} />
        <Route path="categories/all/monitores" element={<Monitores />} />
        <Route path="categories/all/gabinetes" element={<Gabinetes />} />
        <Route path="categories/all/sillas" element={<Sillas />} />
        <Route path="product/:id" element={<ProductPage />} />
      </Routes>
    </CartContext.Provider>
  );
}

export default App;




