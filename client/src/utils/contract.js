import { ethers } from 'ethers';
import SimpleStorageABI from './SimpleStorageABI.json'; // Import your contract ABI

const contractAddress = '0xbdc62dd80381281bdD5b90be0cB66cDA1Ae6ee16'; // Replace with your deployed contract address on Ganache

let simpleStorageContract;
let provider;
let signer;

// Connect to MetaMask and the contract
const connectMetaMask = async () => {
  if (typeof window.ethereum === 'undefined') {
    alert('Please install MetaMask to interact with the DApp.');
    return;
  }

  try {
    // Request MetaMask account connection
    await window.ethereum.request({ method: 'eth_requestAccounts' });

    // Set up the provider and signer for the contract
    provider = new ethers.providers.Web3Provider(window.ethereum);
    signer = provider.getSigner();

    // Get network details and ensure it's Ganache
    const network = await provider.getNetwork();
    if (network.chainId !== 1337) {
      // Ganache's chain ID is 1337
      alert('Please switch to the Ganache network in MetaMask.');
      return;
    }

    // Connect to the smart contract
    simpleStorageContract = new ethers.Contract(
      contractAddress,
      SimpleStorageABI,
      signer
    );

    return signer.getAddress(); // Return wallet address on successful connection
  } catch (error) {
    console.error(error);
    alert('An error occurred while connecting to MetaMask.');
  }
};

// Get the stored value from the contract
export const getStoredValue = async () => {
  if (!simpleStorageContract) return null;
  try {
    const value = await simpleStorageContract.get();
    return value.toString(); // Return value as string
  } catch (error) {
    console.error(error);
  }
};

// Set a new value in the contract
export const setStoredValue = async (newValue) => {
  if (!simpleStorageContract) return;
  try {
    const tx = await simpleStorageContract.set(newValue);
    await tx.wait(); // Wait for transaction to be mined
    console.log(`Value set to ${newValue}`);
  } catch (error) {
    console.error(error);
  }
};

export { connectMetaMask };
