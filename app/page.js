"use client";
import React, { useContext, useEffect, useState } from "react";
import { ChatAppContext } from "./Context/ChatAppContext";

const Home = () => {
  const { title } = useContext(ChatAppContext);
  return <div>{title}</div>;
};

export default Home;
