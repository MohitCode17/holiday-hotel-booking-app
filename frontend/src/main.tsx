import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { QueryClient, QueryClientProvider } from "react-query";
import { AppContextProvider } from "./context/AppContext.tsx";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 0, // This means that if a query fails, it won't automatically retry, and an error will be reported. Setting retry to 0 essentially disables automatic retries for queries.
    },
  },
});

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <AppContextProvider>
        <App />
      </AppContextProvider>
    </QueryClientProvider>
  </React.StrictMode>
);
