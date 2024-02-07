import React, { useContext } from "react";
import * as apiClient from "../api-client";
import { useQuery } from "react-query";

type AppContext = {
  isLoggedIn: boolean;
};

// Create Context
const AppContext = React.createContext<AppContext | undefined>(undefined);

// Create Context Provider
export const AppContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  // Call validate-token api
  // We'll use useQuery to call get request - Takes two things 1. queryKeyName 2. queryFunction

  const { isError } = useQuery("validateToken", apiClient.validateToken, {
    retry: false, // If there is an error fetching the data, it won't automatically retry.
  });

  return (
    <AppContext.Provider value={{ isLoggedIn: !isError }}>
      {children}
    </AppContext.Provider>
  );
};

// Create useContext
export const useAppContext = () => {
  const context = useContext(AppContext);
  return context as AppContext;
};
