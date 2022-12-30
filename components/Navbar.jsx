import { useState } from 'react';
import Marquee from 'react-fast-marquee';
import {
  ConnectWallet,
  useNetworkMismatch,
  useAddress,
  useNetwork,
} from '@thirdweb-dev/react';

const Navbar = ({ account, Web3Handler, disconnectWallet }) => {
  // function to hide id="alert" on click
  const hideAlert = () => {
    document.getElementById('alert').style.display = 'none';
  };

  const address = useAddress();
  const isOnWrongNetwork = useNetworkMismatch();
  const [, switchNetwork] = useNetwork();
  const [networkManager, setNetworkManager] = useState();

  const CHAIN_ID = 80001;

  if (isOnWrongNetwork) {
    return (
      <div className="flex flex-col items-center justify-center">
        <div className="text-white text-center">
          <h1 className="text-2xl font-bold text-red-500">Wrong Network</h1>
          <p className="mt-2">
            Please switch to the{' '}
            <span className="text-purple-500">Mumbai Testnet</span> to use
            Lofichain.
          </p>
        </div>
        <button
          onClick={() => switchNetwork(CHAIN_ID)}
          className="mt-4 px-4 py-2 text-white bg-[#1a1a1a] rounded-md hover:bg-[#2a2a2a]"
        >
          Switch Network
        </button>
      </div>
    );
  }

  return (
    <div className="">
      <div
        id="alert"
        className="text-white bg-[#1a1a1a] text-center flex justify-between items-center"
      >
        <Marquee gradient={false} speed={100}>
          Create. Share. Listen. Earn.
        </Marquee>
        <button
          onClick={hideAlert}
          className="px-auto text-[#9b9b9b] hover:text-white"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </button>
      </div>

      {/* make it stay at the top of the page when scroll */}

      <div className="navbar bg-black sticky top-0 z-50">
        <div className="navbar-start">
          <div className="dropdown ">
            <label tabIndex={0} className="btn btn-ghost lg:hidden text-white">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </label>
            <ul
              tabIndex={0}
              className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-[#1a1a1a] rounded-box w-52 text-white"
            >
              <li>
                <a>Item 1</a>
              </li>
              <li tabIndex={0}>
                <a className="justify-between">
                  Parent
                  <svg
                    className="fill-current"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                  >
                    <path d="M8.59,16.58L13.17,12L8.59,7.41L10,6L16,12L10,18L8.59,16.58Z" />
                  </svg>
                </a>
                <ul className="p-2">
                  <li>
                    <a>Submenu 1</a>
                  </li>
                  <li>
                    <a>Submenu 2</a>
                  </li>
                </ul>
              </li>
              <li>
                <a>Item 3</a>
              </li>
            </ul>
          </div>
          <a href="/" className="btn btn-ghost normal-case text-xl text-white">
            Lofichain
          </a>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">
            <li>
              <a href="/">Home</a>
            </li>
            <li>
              <a href="/radio">Radio</a>
            </li>
            <li>
              <a href="/upload">Upload</a>
            </li>
          </ul>
        </div>
        <div className="navbar-end text-white">
          <ConnectWallet />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
