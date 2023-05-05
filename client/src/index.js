import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { ImageProvider } from "./contexts/ImageContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <ImageProvider>
    <App />
  </ImageProvider>
);
