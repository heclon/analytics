import React from "react";
import ReactDOM from "react-dom/client";
import "./main.css";
import "primereact/resources/themes/lara-light-blue/theme.css"; // theme
import "primereact/resources/primereact.min.css"; // core css
import "primeicons/primeicons.css"; // icons
import "primeflex/primeflex.css";
import Events from "./pages/Events.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Events />
  </React.StrictMode>
);
