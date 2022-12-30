import Web3 from 'web3';
import { useState, useEffect } from 'react';

import { motion } from 'framer-motion';

import toast from 'react-hot-toast';

import Balancer from 'react-wrap-balancer';
import Lottie from 'react-lottie-player';
import music from '../public/music.json';

const Home = () => {
  // Initialize web3 states
  const [account, setAccount] = useState('');
  const [web3Provider, setWeb3Provider] = useState(false);

  const Web3Rerouter = async () => {
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
      setAccount(account[0]);
      setWeb3Provider(true);
      toast.success('Wallet connected', {
        id: notification,
      });

      window.location.href = '/radio';
    } catch (err) {
      console.log(err);
      toast.error('Wallet not connected', {
        id: notification,
      });
    }
  };

  return (
    <motion.div
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <div className="-mt-12 hero text-white h-screen">
        <div className="hero-content flex-col lg:flex-row-reverse max-w-5xl ">
          <Lottie loop animationData={music} play />
          <div>
            <h1 className=" shadow-gradient text-white max-w-md bg-gradient-to-r from-gray-200 via-gray-400 to-gray-600 bg-clip-text text-5xl font-extrabold tracking-tightest text-transparent sm:text-6xl lg:text-7xl">
              <Balancer>
                Welcome to{' '}
                <span
                  className=" 
                  bg-gradient-to-r from-pink-600 via-purple-700 to-blue-400
                      bg-clip-text
                      background-animate"
                >
                  Lofichain
                </span>{' '}
              </Balancer>
            </h1>
            <p className="py-6 text-3xl">
              <Balancer>
                The Web3 radio station that rewards creators and listeners
              </Balancer>
            </p>
            <button
              onClick={Web3Rerouter}
              className="relative inline-flex items-center justify-center px-6 py-3 overflow-hidden font-bold text-white rounded-md shadow-2xl group"
            >
              <span className="absolute inset-0 w-full h-full transition duration-300 ease-out opacity-0 bg-gradient-to-br from-pink-600 via-purple-700 to-blue-400 group-hover:opacity-100"></span>
              {/* <!-- Top glass gradient --> */}
              <span className="absolute top-0 left-0 w-full bg-gradient-to-b from-white to-transparent opacity-5 h-1/3"></span>
              {/* <!-- Bottom gradient --> */}
              <span className="absolute bottom-0 left-0 w-full h-1/3 bg-gradient-to-t from-white to-transparent opacity-5"></span>
              {/* <!-- Left gradient --> */}
              <span className="absolute bottom-0 left-0 w-4 h-full bg-gradient-to-r from-white to-transparent opacity-5"></span>
              {/* <!-- Right gradient --> */}
              <span className="absolute bottom-0 right-0 w-4 h-full bg-gradient-to-l from-white to-transparent opacity-5"></span>
              <span className="absolute inset-0 w-full h-full border border-white rounded-md opacity-10"></span>
              <span className="absolute w-0 h-0 transition-all duration-300 ease-out bg-white rounded-full group-hover:w-56 group-hover:h-56 opacity-5"></span>
              <span className="relative">Get Started</span>
            </button>
          </div>
        </div>
      </div>
      <div className="hero">
        <div className="hero-content text-center">
          <div className="max-w-xl">
            <h1 className="text-5xl font-bold">
              <Balancer>
                It's never been easier to{' '}
                <span className="text-green-500">earn</span> with your beats
              </Balancer>
            </h1>

            <button
              onClick={Web3Rerouter}
              className="mt-6 relative inline-flex items-center justify-center px-6 py-3 overflow-hidden font-bold text-white rounded-md shadow-2xl group"
            >
              <span className="absolute inset-0 w-full h-full transition duration-300 ease-out opacity-0 bg-gradient-to-br from-pink-600 via-purple-700 to-blue-400 group-hover:opacity-100"></span>
              {/* <!-- Top glass gradient --> */}
              <span className="absolute top-0 left-0 w-full bg-gradient-to-b from-white to-transparent opacity-5 h-1/3"></span>
              {/* <!-- Bottom gradient --> */}
              <span className="absolute bottom-0 left-0 w-full h-1/3 bg-gradient-to-t from-white to-transparent opacity-5"></span>
              {/* <!-- Left gradient --> */}
              <span className="absolute bottom-0 left-0 w-4 h-full bg-gradient-to-r from-white to-transparent opacity-5"></span>
              {/* <!-- Right gradient --> */}
              <span className="absolute bottom-0 right-0 w-4 h-full bg-gradient-to-l from-white to-transparent opacity-5"></span>
              <span className="absolute inset-0 w-full h-full border border-white rounded-md opacity-10"></span>
              <span className="absolute w-0 h-0 transition-all duration-300 ease-out bg-white rounded-full group-hover:w-56 group-hover:h-56 opacity-5"></span>
              <span className="relative">Get Started</span>
            </button>
          </div>
        </div>
      </div>

      <footer className="footer items-center p-4 bg-[#1a1a1a]">
        <div className="items-center grid-flow-col">
          <p>Made with ❤️ by Chris Abdo</p>
        </div>
        <div className="grid-flow-col gap-4 md:place-self-center md:justify-self-end">
          <a>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              className="fill-current"
            >
              <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"></path>
            </svg>
          </a>
          <a>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              className="fill-current"
            >
              <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"></path>
            </svg>
          </a>
          <a>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              className="fill-current"
            >
              <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"></path>
            </svg>
          </a>
        </div>
      </footer>
    </motion.div>
  );
};

export default Home;
