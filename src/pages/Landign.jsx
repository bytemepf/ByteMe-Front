import Video from '../assets/videoLanding.mp4';
import "./landing.css";
import { useAuth0 } from '@auth0/auth0-react';
import logo from "../img/logo/logo.png";
import 'react-responsive-carousel/lib/styles/carousel.min.css';


export default function LandingPage(){
    const {loginWithRedirect} = useAuth0();
    
    return(
        <div className="main">
            <div className='overlay'></div>
            {/* <video src={Video} autoPlay loop muted /> */}
            <div className="content">
                <div className="logo">
                    <img src={logo} alt="Byte Me"  className='img'/>
                </div>
                <div className='description'>
                    <h2>Byte Me es una empresa líder en la comercialización de periféricos y accesorios informáticos en toda Latinoamérica. En nuestra página podrás encontrar gran variedad de productos de las mejores marcas, como por ejemplo Teclados, Sillas, Monitores, Audio, etc. </h2>
                </div>
                <div className='bottonL'>
                    <button onClick={() => loginWithRedirect()}>Login</button>
                </div>
            </div>
        </div>
    )
}
