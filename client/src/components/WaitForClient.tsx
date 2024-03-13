"use client";
import { setContext } from "@/lib/features/auth/authSlice";
import {
  setPrimaryColor,
  setSecondaryColor,
} from "@/lib/features/theme/themeSlice";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";

const WaitForClient = ({ children }: { children: React.ReactNode }) => {
  const dispatch = useDispatch();

  const [isWinReady, setIsWinReady] = useState(false);

  useEffect(() => {
    const storedPrimary = localStorage.getItem("primaryColor");
    const storedSecondary = localStorage.getItem("secondaryColor");
    if (storedPrimary !== null && storedSecondary !== null) {
      dispatch(setPrimaryColor(JSON.parse(storedPrimary)));
      dispatch(setSecondaryColor(JSON.parse(storedSecondary)));
    }
    const auth = localStorage.getItem("auth");
    if (auth !== null) dispatch(setContext(JSON.parse(auth)));
    setIsWinReady(true);
  }, []);

  return <>{isWinReady ? children : null}</>;
};

export default WaitForClient;
