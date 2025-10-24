import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { defineCustomElements } from "@stencil-test/react";

defineCustomElements().then(() => {
 console.log("React component loaded");
});

createRoot(document.getElementById("root")!).render(
 <StrictMode>
  <App />
 </StrictMode>
);
