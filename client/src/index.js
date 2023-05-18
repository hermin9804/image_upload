import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { ImageProvider } from "./contexts/ImageContext";
import { AuthProvider } from "./contexts/AuthContext";
import { BrowserRouter } from "react-router-dom";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <AuthProvider>
      <ImageProvider>
        <App />
      </ImageProvider>
    </AuthProvider>
  </BrowserRouter>
);
