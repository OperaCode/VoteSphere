import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { ToastContainer } from "react-toastify";
import { BrowserRouter } from "react-router-dom";
import { WagmiConfig } from "wagmi";
import { RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { wagmiConfig, chains } from "./utils/wagmiConfig.js";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"; // ✅ React Query
import { ApolloProvider } from "@apollo/client"; // ✅ Apollo
import client from "./utils/ApolloClient.js"; //  Apollo client config
import "@rainbow-me/rainbowkit/styles.css";


// ✅ Create React Query client instance
const queryClient = new QueryClient();

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ApolloProvider client={client}> {/* wrap with ApolloProvider */}
      <QueryClientProvider client={queryClient}>
        <WagmiConfig config={wagmiConfig}>
          <RainbowKitProvider chains={chains}>
            <BrowserRouter>
              <ToastContainer position="top-right" />
              <App />
            </BrowserRouter>
          </RainbowKitProvider>
        </WagmiConfig>
      </QueryClientProvider>
    </ApolloProvider>
  </StrictMode>
);
