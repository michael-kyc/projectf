"use client";
import { createContext, useContext, useEffect, useState } from "react";
import { useAuth } from "./AuthContext"; 
import useApi from "@/hooks/useApi";

const UserContext = createContext(null);

export const useUser = () => useContext(UserContext);

export const UserProvider = ({ children }) => {
  const { isAuthenticated } = useAuth();
  const { fetchData } = useApi();
  const [user, setUser] = useState(null);
  const [attemptCount, setAttemptCount] = useState(0);

  const fetchUser = async () => {
    const { result, error } = await fetchData(`/auth/me/`, {
      method: "POST",
    });

    if (error) {
      console.error("Failed to fetch user:", error);
    } else {
      setUser(result);
    }
  };

  if (!user && attemptCount < 3) {
    fetchUser();
    setAttemptCount((prev) => prev + 1); 
  }

  useEffect(() => {
    
    const fetchUser = async () => {
      const { result, error } = await fetchData(`/auth/me/`, {
        method: "POST",
      });

      if (error) {
        console.error("Failed to fetch user:", error);
      } else {
        setUser(result);
      }
    };

    if (!user && attemptCount < 3 && isAuthenticated) {
      fetchUser();
      setAttemptCount((prev) => prev + 1); // Increment attempt count
    }
    
  }, [fetchData,  attemptCount, isAuthenticated]);

  return (
    <UserContext.Provider value={{ user, setUser, fetchUser }}>
      {children}
    </UserContext.Provider>
  );
};
