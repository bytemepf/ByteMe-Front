import Video from '../assets/videoLanding.mp4';
import "./landing.css";
import { useAuth0 } from '@auth0/auth0-react';
/* import { Carousel } from 'react-responsive-carousel';
 */import 'react-responsive-carousel/lib/styles/carousel.min.css';
/* import ProductItem from '../components/ProductItem'; */
export default function LandingPage(){
    const products = useSelector((state) => state.products.data);
    const {loginWithRedirect} = useAuth0();
    
    return(
        <div className="main">
            <div className='overlay'></div>
            <video src={Video} autoPlay loop muted />
            <div className="content">
                <h1>Byte Me</h1>
                <h2>Líderes en la comercialización de periféricos y accesorios informáticos en toda Latinoamérica </h2>
                <h2>Más de 500.000 mil clientes nos han elegido</h2>
                <div className='bottonL'>
                    <button onClick={() => loginWithRedirect()}>Login</button>
                </div>
          {/*       <Carousel>
                    {products.map((item)=>{
                        <ProductItem key={item.id} item={item}/>   
                    })

                    }
                 
                </Carousel> */}
            </div>
        </div>
    )
}
