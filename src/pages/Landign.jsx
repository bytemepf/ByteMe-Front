import Video from '../assets/videoLanding.mp4';
import "./landing.css";
import { useAuth0 } from '@auth0/auth0-react';

export default function LandingPage(){
    
    const {loginWithRedirect} = useAuth0();
    
    return(
        <div className="main">
            <div className='overlay'></div>
            <video src={Video} autoPlay loop muted />
            <div className="content">
                <h1>Byte Me</h1>
                <h2>Lideres en la comercialización de periféricos y accesorios informáticos en toda Latinoamérica </h2>
                <h2>Más de 500.000 mil clientes nos han elegido</h2>
                <div className='bottonL'>
                    <button onClick={() => loginWithRedirect()}>Login</button>
                </div>
            </div>
        </div>
    )
}
