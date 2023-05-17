import "./Newsletter.css";

function Newsletter() {
  return (
    <>
      <div className="news">
        <div className="news-text">
          <h2>MANTENTE EN CONTACTO</h2>
          <form>
            <input type="email" placeholder="your@email.com" />
            <button type="submit">Suscribir</button>
          </form>
        </div>
      </div>
    </>
  );
}

export default Newsletter;
