import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import store from "./Redux/store";
import { Provider } from "react-redux";
import { AuthContextProvider } from "../src/context/authContext.jsx"; 
import { Auth0Provider} from '@auth0/auth0-react'
const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <Provider store={store}>
    <BrowserRouter>
      <AuthContextProvider> 
        <Auth0Provider domain="byte-me.us.auth0.com" clientId="UHJ6Iyl05KvDYv0cDviIPvaYVoUdbok3" redirectUri="http://localhost:3000/Home">
          <App />
        </Auth0Provider>
      </AuthContextProvider> 
    </BrowserRouter>
  </Provider>

);
