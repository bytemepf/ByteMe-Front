import { useDispatch } from "react-redux";
import Footer from "../components/Footer";
import Hero from "../components/Hero";
import ProudProducts from "../components/ProudProducts";
import { useEffect } from "react";
import { postUsers,iduser,getUsers } from "../Redux/actions";
import {  useSelector } from "react-redux";
import { useAuth0 } from "@auth0/auth0-react";

function Home() {
  const  {user}  = useAuth0();
  const dispatch = useDispatch();
  const IDuser = useSelector((state)=> state.iduser);
  const allUsers = useSelector((state) => state.users);
console.log(IDuser)
//console.log("------")
//useEffect(()=>{
//  if (user){
//    const userC = {
//      email: user.email,
//    }
//    dispatch(iduser(userC))
//  }
//}, [dispatch])
 useEffect(() => {
   dispatch(getUsers());
 }, [dispatch]);
console.log(user?.email)
console.log(allUsers)
async function useri() {
const emailU = user?.email
  const filtrouser =  allUsers.filter(e => e.email === emailU);
  console.log(filtrouser)
  return filtrouser
}
//const result = useri()
console.log(useri())
  // if (user){
  //   const userCredentials = {
  //     email: user.email,
  //     name: user.name,
  //   }
  //   dispatch(postUsers(userCredentials))
  // }
 

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
      <Footer />
    </>
  );
}

export default Home;
