import React from "react";
import ReactDOM from "react-dom/client";

import { QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

import "react-toastify/dist/ReactToastify.css";

import "./styles/variables.css";
import "./styles/layout.css";
import "./styles/components.css";
import "./styles/pages.css";

import { ToastContainer } from "react-toastify";

import queryClient from "./api/queryClient";

import App from "./App";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <AuthProvider>
          <App />

          <ToastContainer
            position="top-right"
            autoClose={3000}
            newestOnTop
            pauseOnHover
            theme="colored"
          />
        </AuthProvider>
      </BrowserRouter>
    </QueryClientProvider>
  </React.StrictMode>,
);
