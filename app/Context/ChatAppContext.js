"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

// APi features
import {
  CheckIfWalletConnect,
  connectWallet,
  connectingWithContract,
} from "@/Utils/apiFeature";

export const ChatAppContext = React.createContext();

export const ChatAppProvider = ({ children }) => {
  const [account, setAccount] = useState("");
  const [userName, setUsername] = useState("");
  const [friendList, setfriendList] = useState([]);
  const [friendMsg, setfriendMsg] = useState([]);
  const [loading, setLoading] = useState(false);
  const [usersList, setUserLists] = useState([]);
  const [error, seterror] = useState("");

  //   currenct user data
  const [currentUserName, setcurrentUserName] = useState("");
  const [currentUserAddress, setcurrentUserAddress] = useState("");

  const router = useRouter();

  // On Page Load
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Get Contract
        const contract = await connectingWithContract();
        //   Get Account
        const connectAccount = await connectWallet();
        setAccount(connectAccount);

        //   get and set UserName
        const userName = await contract.getUsername(connectAccount);
        setUsername(userName);

        // get friendsList
        const friendsList = await contract.getMyFriendList();
        setfriendList(friendsList);

        // All user list
        const userList = await contract.getAllAppUsers();
        setUserLists(userList);
      } catch (error) {
        seterror("Please Install and Connect your wallet");
      }
    };

    fetchData();
  }, []);

  //   read message
  const readMessage = async (friendAddress) => {
    try {
      const contract = await connectingWithContract();
      const read = await contract.readMessage(friendAddress);
      setfriendMsg(read);
    } catch (error) {
      seterror(error);
    }
  };

  //   create account
  const createAccount = async ({ name, accountAddress }) => {
    try {
      if (!name || !accountAddress)
        throw Error("invalid name or account address");

      const contract = await connectingWithContract();
      const getCreatedUser = await contract.createAccount(name);

      setLoading(true);

      await getCreatedUser.wait();

      setLoading(false);

      window.location.reload();
    } catch (error) {
      seterror(error);
    }
  };

  //   add freind
  const addFriend = async ({ name, accountAddress }) => {
    try {
      if (!name || !accountAddress)
        throw Error("Provide a name and an account address");

      const contract = await connectingWithContract();
      const addNewFriend = contract.addFriend(accountAddress, name);

      setLoading(true);
      await addNewFriend.wait();
      setLoading(false);
      router.push("/");
      window.location.reload();
    } catch (error) {
      seterror(error);
    }
  };

  const sendMessage = async ({ msg, address }) => {
    try {
      if (!msg || !address) throw Error("please type your message");

      const contract = await connectingWithContract();
      const addMessage = await contract.sendMessage(address, msg);

      setLoading(true);
      addMessage.wait();
      setLoading(false);
    } catch (error) {
      seterror(error);
    }
  };

  const readUser = async (userAddress) => {
    const contract = await connectingWithContract();
    const userName = await contract.getUsername(userAddress);
    setcurrentUserName(userName);
    setcurrentUserAddress(userAddress);
  };

  return (
    <ChatAppContext.Provider
      value={{
        readMessage,
        createAccount,
        addFriend,
        sendMessage,
        readUser,
        account,
        userName,
        friendList,
        friendMsg,
        loading,
        usersList,
        error,
        currentUserName,
        currentUserAddress,
      }}
    >
      {children}
    </ChatAppContext.Provider>
  );
};
