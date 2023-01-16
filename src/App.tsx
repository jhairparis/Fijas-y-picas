import React from "react";
import { RouterProvider } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import router from "./routes";

export const App = () => {
  return (
    <>
      <RouterProvider router={router} />
      <ToastContainer />;
    </>
  );
};
