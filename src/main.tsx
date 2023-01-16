import React from "react";
import ReactDOM from "react-dom/client";
import { App } from "./App";

import "./styles/index.css";
import "react-toastify/dist/ReactToastify.css";

const r: any = document.getElementById("root");

ReactDOM.createRoot(r).render(<App />);
