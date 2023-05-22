import Footer from "../components/Footer";
import Hero from "../components/Hero";
import Newsletter from "../components/Newsletter";
import ProudProducts from "../components/ProudProducts";
import { User } from "../components/user";

function Home() {
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
