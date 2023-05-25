import { useDispatch } from "react-redux";
import Footer from "../components/Footer";
import Hero from "../components/Hero";
import Newsletter from "../components/Newsletter";
import ProudProducts from "../components/ProudProducts";
import { useAuth0 } from "@auth0/auth0-react";
import { useEffect } from "react";
import { postUsers } from "../Redux/actions";


function Home() {
  const { user } = useAuth0();
  const dispatch = useDispatch();

  useEffect(()=>{
    dispatch(postUsers(user))
  }, [dispatch])

  return (
    <>
      <Hero />
      <ProudProducts />
      <Newsletter />
      <Footer />
    </>
  );
}

export default Home;
