import "./Header.css";
import { Link } from "react-router-dom";

function Hero() {
  return (
    <>
      <div className="home-container">
        <div className="container">
          <div className="grid-container">
            <div className="featured grid-one">
              <Link to="/categories/all/teclados">
                <div id="img1" className="lil-overlay"></div>
                <img src='https://images.pexels.com/photos/9072216/pexels-photo-9072216.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1' alt="img1" />
                <p className="main-description">Teclados</p>
              </Link>
            </div>
            <div className="featured grid-two">
              <Link to="/categories/all/sillas">
                <div id="img2" className="lil-overlay"></div>
                <img src='https://http2.mlstatic.com/D_NQ_NP_807067-MLA49783062047_042022-O.webp' alt="img2" />
                <p className="main-description">Sillas</p>
              </Link>
            </div>
            <div className="featured grid-four">
              <Link to="/categories/all/monitores">
                <div id="img3" className="lil-overlay"></div>
                <img src='https://cdn.computerhoy.com/sites/navi.axelspringer.es/public/media/image/2019/10/elige-mejor-monitor-cada-tipo-juego_1.jpg?tf=3840x' alt="img3" />
                <p className="main-description">Monitores</p>
              </Link>
            </div>
            <div className="featured grid-four-low">
              <Link to="/categories/all/ratones">
                <div id="img4" className="lil-overlay"></div>
                <img src='https://i.shgcdn.com/b635b680-f7f4-4277-b42c-e355b2a71b3a/-/format/auto/-/preview/3000x3000/-/quality/best/' alt="img4" />
                <p className="main-description">Ratones</p>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Hero;
