import '../styles/globals.css';
import { useState, useEffect } from 'react';
import Head from 'next/head';

import Navbar from '../components/Navbar';

import Web3 from 'web3';
import toast, { Toaster } from 'react-hot-toast';

function MyApp({ Component, pageProps }) {
  // Initialize web3 states
  const [account, setAccount] = useState('');
  const [web3Provider, setWeb3Provider] = useState(false);

  // Initialize web3
  useEffect(() => {
    loadWeb3();

    // Event listener for account change
    window.ethereum.on('accountsChanged', (accounts) => {
      setAccount(accounts[0]);
    });
  }, []);

  const loadWeb3 = async () => {
    try {
      const web3 = new Web3(window.ethereum);
      const accounts = await web3.eth.getAccounts();
      setAccount(accounts[0]);
      setWeb3Provider(true);
    } catch (err) {
      console.log(err);
      toast.error('No wallet provider detected. Please install Metamask.');
    }
  };

  const Web3Handler = async () => {
    const notification = toast.loading('Connecting wallet...', {
      style: {
        border: '2px solid #000',
        background: '#2a2a2a',
        color: '#fff',
      },
    });

    try {
      await window.ethereum.request({
        method: 'wallet_addEthereumChain',
        params: [
          {
            chainId: '0x13881',
            chainName: 'Matic Mumbai Testnet',
            nativeCurrency: {
              name: 'MATIC',
              symbol: 'MATIC',
              decimals: 18,
            },
            rpcUrls: ['https://rpc-mumbai.maticvigil.com/'],
            blockExplorerUrls: ['https://mumbai.polygonscan.com/'],
          },
        ],
      });
      const account = await window.ethereum.request({
        method: 'eth_requestAccounts',
      });

      const web3 = new Web3(window.ethereum);
      setAccount(account[0]);
      setWeb3Provider(true);
      toast.success('Wallet connected', {
        id: notification,
      });
    } catch (err) {
      console.log(err);
      toast.error('Wallet not connected', {
        id: notification,
      });
    }
  };

  const disconnectWallet = async () => {
    const notification = toast.loading('Disconnecting wallet...', {
      style: {
        border: '2px solid #000',
        background: '#2a2a2a',
        color: '#fff',
      },
    });

    try {
      setAccount();
      toast.success('Wallet disconnected', {
        id: notification,
      });
    } catch (err) {
      console.log(err);
      toast.error('Wallet not disconnected', {
        id: notification,
      });
    }
  };

  return (
    <>
      <Head>
        <title>Lofichain</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="bg-black">
        <Navbar
          account={account}
          Web3Handler={Web3Handler}
          disconnectWallet={disconnectWallet}
        />
        <Component {...pageProps} />
        <Toaster />
      </div>
    </>
  );
}

export default MyApp;
