import React from "react";
import { createRoot } from "react-dom/client"; // 1. New import location
import "./index.css";
import App from "./App";
import "react-alice-carousel/lib/alice-carousel.css";
import CryptoContext from "./CryptoContext";

// 2. Initialize the root element
const container = document.getElementById("root");
const root = createRoot(container);

// 3. Use the new .render() method
root.render(
  <React.StrictMode>
    <CryptoContext>
      <App />
    </CryptoContext>
  </React.StrictMode>
);