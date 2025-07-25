import React from "react";
import { createRoot } from "react-dom/client";
import App from "./src/App";
import { PrivyProvider } from "@privy-io/react-auth";

const root = createRoot(document.getElementById("root"));

root.render(
  <PrivyProvider appId="cmdippnm000nxlb0jl7m0012y">
    <App />
  </PrivyProvider>
); 