import React, { createContext, useState } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [me, setMe] = useState(null);
  return (
    <AuthContext.Provider value={[me, setMe]}>{children}</AuthContext.Provider>
  );
};
