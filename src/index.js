import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";

// Leaflet
import "leaflet/dist/leaflet.js";
import "leaflet/dist/leaflet-src.js";

// components
import App from "./App";
import store from "./store/store";

// bootstrap
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
