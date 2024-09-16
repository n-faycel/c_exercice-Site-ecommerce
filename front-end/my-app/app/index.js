// index.js
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import {
   createBrowserRouter,
   RouterProvider,
 } from "react-router-dom";
import Products from "./pages/products";


const router = createBrowserRouter([
  {
    path: "/",
    element: <Products />,
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
