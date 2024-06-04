import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { ShoppingCartContextProvider } from "./context/shoppingCartContext.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <ShoppingCartContextProvider>
        <App />
      </ShoppingCartContextProvider>
    </BrowserRouter>
  </React.StrictMode>,
);
