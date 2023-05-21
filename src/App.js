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
import SearchName from "./pages/SearchBar/SearchName";
import RegisterPage from "./pages/Register/Index.js";
 import Login from "./pages/Loding/Index.js"; 
import Landing from "../src/pages/Landign.jsx"
import Payment from "../src/components/stripe/Payment.jsx"
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
  const hideNavbarRoutes = ["/", "/login", "/register","/payment"];

  return (
    <CartContext.Provider value={{ cartItem, addToCart, setCartItem }}>
      {hideNavbarRoutes.includes(location.pathname) ? null : <Navbar />}
      <Routes>
        <Route exact path="/" element={<Landing />} />
        <Route exact path="/home" element={<Home />} />
        <Route exact path="/register" element={<RegisterPage />} />
        <Route exact path="/login" element={<Login />} />
         <Route exact path="/payment"   element={<Payment/>}/>
        <Route exact path="/search/:name" element={<SearchName />} />
        
        <Route exact path="categories" element={<Categories />} />
        <Route exact path="categories/all" element={<All />} />
        <Route exact path="categories/all/teclados" element={<Teclados />} />
        <Route exact path="categories/all/ratones" element={<Ratones />} />
        <Route exact path="categories/all/audio" element={<Audio />} />
        <Route exact path="categories/all/monitores" element={<Monitores />} />
        <Route exact path="categories/all/gabinetes" element={<Gabinetes />} />
        <Route exact path="categories/all/sillas" element={<Sillas />} />
        <Route exact path="product/:id" element={<ProductPage />} />
       
      </Routes>
    </CartContext.Provider>
  );
}

export default App;




