"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";

// APi features
import {
  CheckIfWalletConnect,
  connectWallet,
  connectingWithContract,
  convertTime,
} from "@/Utils/apiFeature";

export const ChatAppContext = React.createContext();

export const ChatAppProvider = ({ children }) => {
  const title = "Hey, Welcome to Block-Chain App";

  return (
    <ChatAppContext.Provider value={{ title }}>
      {children}
    </ChatAppContext.Provider>
  );
};
