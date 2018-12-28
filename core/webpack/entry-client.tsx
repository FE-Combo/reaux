import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
const rootElement = document.createElement("div");
rootElement.id = "framework-app-root";
document.body.appendChild(rootElement);
ReactDOM.hydrate(<App />, rootElement);
