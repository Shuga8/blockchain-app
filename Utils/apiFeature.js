import { ethers } from "ethers";
import Web3Modal from "web3modal";

import { chatAppAddress, ChatAppABI } from "@/app/Context/constants";

export const CheckIfWalletConnect = async () => {
  try {
    if (!window.ethereum) throw Error("Install MetaMask");

    const accounts = await window.ethereum.request({
      method: "eth_accounts",
    });

    const firstAccount = accounts[0];
    return firstAccount;
  } catch (error) {
    console.error(error);
  }
};

export const connectWallet = async () => {
  try {
    if (!window.ethereum) throw Error("Install MetaMask");

    const accounts = await window.ethereum.request({
      method: "eth_requestAccounts",
    });

    const firstAccount = accounts[0];
    return firstAccount;
  } catch (error) {
    console.error(error);
  }
};

const fetchContract = (signerOrProvider) =>
  new ethers.Contract(chatAppAddress, ChatAppABI, signerOrProvider);

export const connectingWithContract = async () => {
  try {
    const web3modal = new Web3Modal();
    const connection = await web3modal.connect();
    const provider = new ethers.providers.Web3Provider(connection);
    const signer = provider.getSigner();
    const contract = fetchContract(signer);

    return contract;
  } catch (error) {
    console.error(error);
  }
};

export const convertTime = (time) => {
  const newTime = new Date(time.toNumber());

  const realTime =
    newTime.getHours() +
    ":" +
    newTime.getMinutes() +
    ":" +
    newTime.getSeconds() +
    "  Date: " +
    newTime.getDate() +
    ":" +
    (newTime.getMonth() + 1) +
    ":" +
    newTime.getFullYear();

  return realTime;
};
