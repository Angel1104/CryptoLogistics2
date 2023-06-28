import React, { useState, useEffect } from "react";
import Web3Modal from "web3modal";
import { ethers } from "ethers";

//INTERNAL IMPORT
import tracking from "../Conetxt/Tracking.json";
const ContractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
const ContractABI = tracking.abi;

//---FETCHING SMART CONTRACT
const fetchContract = (signerOrProvider) =>
  new ethers.Contract(ContractAddress, ContractABI, signerOrProvider);

export const TrackingContext = React.createContext();

export const TrackingProvider = ({ children }) => {
  //STATE VARIABLE
  const DappName = "Product Tracking Dapp";
  const [currentUser, setCurrentUser] = useState("");

  const createRam = async (items) => {
    console.log(items);
    const { receptor, fechaCreacion, ddr, precio } = items;

    try {
      const web3Modal = new Web3Modal();
      const connection = await web3Modal.connect();
      const provider = new ethers.providers.Web3Provider(connection);
      const signer = provider.getSigner();
      const contract = fetchContract(signer);
      const createItem = await contract.createRam(
        receptor,
        new Date(fechaCreacion).getTime(),
        ddr,
        ethers.utils.parseUnits(precio, 18),
        {
          value: ethers.utils.parseUnits(precio, 18),
        }
      );
      await createItem.wait();
      console.log(createItem);
      location.reload();
    } catch (error) {
      console.log("Some want wrong", error);
    }
  };

  const getAllRam = async () => {
    try {
      const provider = new ethers.providers.JsonRpcProvider();
      const contract = fetchContract(provider);

      const rams = await contract.getAllTransactions();
      const allRams = rams.map((ram) => ({
        sender: ram.sender,
        receptor: ram.receptor,
        precio: ethers.utils.formatEther(ram.precio.toString()),
        fechaCreacion: ram.fechaCreacion.toNumber(),
        fechaEnvio: ram.fechaEnvio.toNumber(),
        ddr: ram.ddr.toNumber(),
        isPaid: ram.isPaid,
        status: ram.status,
        fechaProgramado: ram.fechaProgramado,
        fechaPrueba : ram.fechaPrueba,
        fechaEmpaque: ram.fechaEmpaque,
        fechFinal: ram.fechFinal
      }));

      return allRams;
    } catch (error) {
      console.log("error want, getting ram");
    }
  };

  const getRamsCount = async () => {
    try {
      if (!window.ethereum) return "Install MetaMask";

      const accounts = await window.ethereum.request({
        method: "eth_accounts",
      });
      const provider = new ethers.providers.JsonRpcProvider();
      const contract = fetchContract(provider);
      const ramsCount = await contract.getRamsCount(accounts[0]);
      return ramsCount.toNumber();
    } catch (error) {
      console.log("error want, getting ram");
    }
  };

  const completeRam = async (completeRamm) => {
    console.log(completeRamm);

    const { receptor, index } = completeRamm;
    try {
      if (!window.ethereum) return "Install MetaMask";

      const accounts = await window.ethereum.request({
        method: "eth_accounts",
      });
      const web3Modal = new Web3Modal();
      const connection = await web3Modal.connect();
      const provider = new ethers.providers.Web3Provider(connection);
      const signer = provider.getSigner();
      const contract = fetchContract(signer);

      const transaction = await contract.completeRam(
        accounts[0],
        receptor,
        index,
        {
          gasLimit: 300000,
        }
      );

      transaction.wait();
      console.log(transaction);
      location.reload();
    } catch (error) {
      console.log("wrong completeRam", error);
    }
  };


  const programmedRam = async (programmedRamm) => {
    console.log(programmedRamm);

    const { receptor, index } = programmedRamm;
    try {
      if (!window.ethereum) return "Install MetaMask";

      const accounts = await window.ethereum.request({
        method: "eth_accounts",
      });
      const web3Modal = new Web3Modal();
      const connection = await web3Modal.connect();
      const provider = new ethers.providers.Web3Provider(connection);
      const signer = provider.getSigner();
      const contract = fetchContract(signer);

      const transaction = await contract.programmedRam(
        accounts[0],
        receptor,
        index,
        {
          gasLimit: 30000000,
        }
      );

      transaction.wait();
      console.log(transaction);
      location.reload();
    } catch (error) {
      console.log("wrong programed Ram", error);
    }
  };

  const testRam = async (TestRamm) => {
    console.log(TestRamm);

    const { receptor, index } = TestRamm;
    try {
      if (!window.ethereum) return "Install MetaMask";

      const accounts = await window.ethereum.request({
        method: "eth_accounts",
      });
      const web3Modal = new Web3Modal();
      const connection = await web3Modal.connect();
      const provider = new ethers.providers.Web3Provider(connection);
      const signer = provider.getSigner();
      const contract = fetchContract(signer);

      const transaction = await contract.testRam(
        accounts[0],
        receptor,
        index,
        {
          gasLimit: 300000,
        }
      );

      transaction.wait();
      console.log(transaction);
      location.reload();
    } catch (error) {
      console.log("wrong completeRam", error);
    }
  };

  const packedRam = async (packedRamm) => {
    console.log(packedRamm);

    const { receptor, index } = packedRamm;
    try {
      if (!window.ethereum) return "Install MetaMask";

      const accounts = await window.ethereum.request({
        method: "eth_accounts",
      });
      const web3Modal = new Web3Modal();
      const connection = await web3Modal.connect();
      const provider = new ethers.providers.Web3Provider(connection);
      const signer = provider.getSigner();
      const contract = fetchContract(signer);

      const transaction = await contract.packedRam(
        accounts[0],
        receptor,
        index,
        {
          gasLimit: 300000,
        }
      );

      transaction.wait();
      console.log(transaction);
      location.reload();
    } catch (error) {
      console.log("wrong completeRam", error);
    }
  };

  const getRam = async (index) => {
    console.log(index * 1);
    try {
      if (!window.ethereum) return "Install MetaMask";

      const accounts = await window.ethereum.request({
        method: "eth_accounts",
      });

      const provider = new ethers.providers.JsonRpcProvider();
      const contract = fetchContract(provider);
      const ram = await contract.getRam(accounts[0], index * 1);

      const SingleRam = {
        sender: ram[0],
        receptor: ram[1],
        fechaCreacion: ram[2].toNumber(),
        fechaEnvio: ram[3].toNumber(),
        ddr: ram[4].toNumber(),
        precio: ethers.utils.formatEther(ram[5].toString()),
        status: ram[6],
        isPaid: ram[7],
      };

      return SingleRam;
    } catch (error) {
      console.log("Sorry no chipment");
    }
  };

  const startRam = async (getProduct) => {
    const { receptor, index } = getProduct;

    try {
      if (!window.ethereum) return "Install MetaMask";

      const accounts = await window.ethereum.request({
        method: "eth_accounts",
      });

      const web3Modal = new Web3Modal();
      const connection = await web3Modal.connect();
      const provider = new ethers.providers.Web3Provider(connection);
      const signer = provider.getSigner();
      const contract = fetchContract(signer);
      const ram = await contract.startRam(
        accounts[0],
        receptor,
        index * 1,
        {
          gasLimit: 300000,
        }
      );

      ram.wait();
      console.log(ram);
      location.reload();
    } catch (error) {
      console.log("Sorry no se puede iniciar el envio", error);
    }
  };
  
  //---CHECK WALLET CONNECTED
  const checkIfWalletConnected = async () => {
    try {
      if (!window.ethereum) return "Install MetaMask";

      const accounts = await window.ethereum.request({
        method: "eth_accounts",
      });

      if (accounts.length) {
        setCurrentUser(accounts[0]);
      } else {
        return "No account";
      }
    } catch (error) {
      return "not connected";
    }
  };

  //---CONNET WALLET FUNCTION
  const connectWallet = async () => {
    try {
      if (!window.ethereum) return "Install MetaMask";

      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });

      setCurrentUser(accounts[0]);
    } catch (error) {
      return "Something want wrong";
    }
  };

  useEffect(() => {
    checkIfWalletConnected();
  }, []);

  return (
    <TrackingContext.Provider
      value={{
        connectWallet,
        createRam,
        getAllRam,
        completeRam,
        getRam,
        startRam,
        getRamsCount,
        DappName,
        currentUser,
        programmedRam,
        testRam,
        packedRam,
      }}
    >
      {children}
    </TrackingContext.Provider>
  );
};
