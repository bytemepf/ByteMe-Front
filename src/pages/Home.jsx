import { useDispatch } from "react-redux";
import Footer from "../components/Footer";
import Hero from "../components/Hero";
import Newsletter from "../components/Newsletter";
import ProudProducts from "../components/ProudProducts";
import { useEffect } from "react";
import { postUsers } from "../Redux/actions";
import { useAuth0 } from "@auth0/auth0-react";


function Home() {
  const { user } = useAuth0();
  const dispatch = useDispatch();

  // if (user){
  //   const userCredentials = {
  //     email: user.email,
  //     name: user.name,
  //   }
  //   dispatch(postUsers(userCredentials))
  // }
  
  console.log(user);

    useEffect(()=>{
      if (user){
        const userCredentials = {
          email: user.email,
          name: user.name,
        }
        dispatch(postUsers(userCredentials))
      }
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
