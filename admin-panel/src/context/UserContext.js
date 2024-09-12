import React, { createContext, useState, useEffect } from "react";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const getMe = async () => {
    try {
      let user = await JSON.parse(localStorage.getItem("user_info"));
      if (user) {
        setUser(user);
      }
    } catch (error) {
      console.error("Failed to get user info:", error);
    }
  };

  useEffect(() => {
    getMe();
  }, []);

  return (
    <UserContext.Provider value={{ user }}>{children}</UserContext.Provider>
  );
};
