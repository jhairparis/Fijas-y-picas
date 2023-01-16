import React from "react";
import { createBrowserRouter } from "react-router-dom";
import Comojugar from "../pages/Comojugar";
import ErrorPage from "../pages/NotFound";
import Game from "../pages/Game";
import Layout from "../components/Layout";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      { path: "/como-jugar", element: <Comojugar /> },
      { path: "/jugar", element: <Game /> },
    ],
  },
]);

export default router;
