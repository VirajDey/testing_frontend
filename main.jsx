import React from "react";
import { createRoot } from "react-dom/client";
import App from "./src/App";
import { PrivyProvider } from "@privy-io/react-auth";

const root = createRoot(document.getElementById("root"));

root.render(
  <PrivyProvider appId="cmd5q4q1700avl10mc19isg0c">
    <App />
  </PrivyProvider>
); 