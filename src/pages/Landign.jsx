import Video from '../assets/videoLanding.mp4';
import "./landing.css";
import { Link } from 'react-router-dom';
export default function LandingPage(){

    return(
        <div className="main">
            <div className='overlay'></div>
            <video src={Video} autoPlay loop muted />
            <div className="content">
                <h1>Byte Me</h1>
                <h2>Lideres en la comercialización de periféricos y accesorios informáticos en toda Latinoamérica </h2>
                <h2>Más de 500.000 mil clientes nos han elegido</h2>
                <div className='bottonL'>
                    <Link to="/register">
                    <button >Start Game</button>

                    </Link>
                    
                </div>
            </div>
        </div>
    )
}
