import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import store from "./Redux/store";
import { Provider } from "react-redux";
import { AuthContextProvider } from "../src/context/authContext.jsx"; 
import { Auth0Provider} from '@auth0/auth0-react'


const redirectUri=`${process.env.REACT_APP_URL_FRONT}`


const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <Provider store={store}>
    <BrowserRouter>
      <AuthContextProvider> 
      <Auth0Provider domain="dev-qrn5xgn4wniu1a6b.us.auth0.com" clientId="j7RdBXpql7wq2EvsPJWMlzHTmeJaM6uN" authorizationParams={{
      redirect_uri: redirectUri
    }}>
          <App />
        </Auth0Provider>
      </AuthContextProvider> 
    </BrowserRouter>
  </Provider>
);
