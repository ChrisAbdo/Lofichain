import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

import toast from 'react-hot-toast';
import axios from 'axios';
import Balancer from 'react-wrap-balancer';

import Web3 from 'web3';
import Marketplace from '../backend/build/contracts/Marketplace.json';
import NFT from '../backend/build/contracts/NFT.json';
import Image from 'next/image';

const radio = () => {
  const [account, setAccount] = useState('');
  const [audio, setAudio] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);
  const [web3, setWeb3] = useState(null);
  const [nfts, setNfts] = useState([]);
  const [nft, setNft] = useState([]);
  const [loadingState, setLoadingState] = useState('not-loaded');
  const [fileUrl, setFileUrl] = useState(null);
  const [formInput, updateFormInput] = useState({
    name: '',
    description: '',
  });
  const router = useRouter();

  useEffect(() => {
    loadBlockchainData();
    loadSongs();
  }, [account]);

  const ipfsClient = require('ipfs-http-client');
  const projectId = '2FdliMGfWHQCzVYTtFlGQsknZvb';
  const projectSecret = '2274a79139ff6fdb2f016d12f713dca1';
  const auth =
    'Basic ' + Buffer.from(projectId + ':' + projectSecret).toString('base64');
  const client = ipfsClient.create({
    host: 'ipfs.infura.io',
    port: 5001,
    protocol: 'https',
    headers: {
      authorization: auth,
    },
  });

  const Web3Handler = async () => {
    const notification = toast.loading('Connecting account...');
    try {
      const account = await window.ethereum.request({
        method: 'eth_requestAccounts',
      });

      const web3 = new Web3(window.ethereum);
      setAccount(account[0]);
      setWeb3(web3);
      toast.success('Account connected', {
        id: notification,
      });
      // wait 2 seconds and reload the page
      setTimeout(() => {
        window.location.reload();
      }, 2000);
    } catch (err) {
      console.log(err);
      toast.error('Account not connected', {
        id: notification,
      });
    }
  };

  const loadBlockchainData = async () => {
    try {
      const web3 = new Web3(window.ethereum);
      const accounts = await web3.eth.getAccounts();
      setAccount(accounts[0]);
    } catch (err) {
      console.log(err);
    }
  };

  async function loadSongs() {
    // changed function name and parameter
    const web3 = new Web3(window.ethereum);

    const networkId = await web3.eth.net.getId();

    // Get all listed NFTs
    const marketPlaceContract = new web3.eth.Contract(
      Marketplace.abi,
      Marketplace.networks[networkId].address
    );
    const listings = await marketPlaceContract.methods.getListedNfts().call();
    // Select a random listed NFT
    const randomIndex = Math.floor(Math.random() * listings.length);
    const selectedListing = listings[randomIndex];
    // Retrieve metadata for the selected NFT
    try {
      const NFTContract = new web3.eth.Contract(
        NFT.abi,
        NFT.networks[networkId].address
      );
      const tokenURI = await NFTContract.methods
        .tokenURI(selectedListing.tokenId)
        .call();
      const meta = await axios.get(tokenURI);
      const nft = {
        tokenId: selectedListing.tokenId,
        seller: selectedListing.seller,
        owner: selectedListing.buyer,
        image: meta.data.image,
        name: meta.data.name,
        description: meta.data.description,
        coverImage: meta.data.coverImage,
      };
      setNft(nft); // changed nfts to nft
      setAudio(new Audio(nft.image)); // set audio element with source from nft.image
    } catch (err) {
      console.log(err);
    }
  }

  const playAudio = () => {
    // added function to play audio
    if (audio) {
      audio.play();
      setIsPlaying(true);

      // added wave visualizer
    }

    // if the audio is playing, pause it
    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
    }
  };

  const playNextSong = () => {
    // Stop the current audio
    audio.pause();
    audio.currentTime = 0;

    // Reset the "isPlaying" state
    setIsPlaying(false);

    // Load the next song
    loadSongs();
  };

  return (
    <div className="h-screen">
      <div className="flex flex-col items-center justify-center mt-12 p-4  text-center sm:py-0 ">
        {nft && (
          <div className="card w-128 bg-[#1f1f1f] shadow-xl">
            <figure className="px-10 pt-10">
              <Image
                width={300}
                height={300}
                src={nft.coverImage}
                alt="."
                className="rounded-xl"
              />
            </figure>
            <div className="card-body items-center text-center">
              <div className="text-center">
                <h2 className="text-2xl">{nft.name}</h2>

                {/* <p className="truncate">{nft.seller}</p> */}
                <div className="flex justify-between">
                  {/* Last Song Button */}
                  <button onClick={playNextSong} className="btn btn-ghost mx-4">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-6 h-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M21 16.811c0 .864-.933 1.405-1.683.977l-7.108-4.062a1.125 1.125 0 010-1.953l7.108-4.062A1.125 1.125 0 0121 8.688v8.123zM11.25 16.811c0 .864-.933 1.405-1.683.977l-7.108-4.062a1.125 1.125 0 010-1.953L9.567 7.71a1.125 1.125 0 011.683.977v8.123z"
                      />
                    </svg>
                  </button>
                  <button onClick={playAudio} className="btn btn-ghost mx-4">
                    {isPlaying ? (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-6 h-6"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M14.25 9v6m-4.5 0V9M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                    ) : (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-6 h-6"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M15.91 11.672a.375.375 0 010 .656l-5.603 3.113a.375.375 0 01-.557-.328V8.887c0-.286.307-.466.557-.327l5.603 3.112z"
                        />
                      </svg>
                    )}
                  </button>
                  <button onClick={playNextSong} className="btn btn-ghost mx-4">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-6 h-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M3 8.688c0-.864.933-1.405 1.683-.977l7.108 4.062a1.125 1.125 0 010 1.953l-7.108 4.062A1.125 1.125 0 013 16.81V8.688zM12.75 8.688c0-.864.933-1.405 1.683-.977l7.108 4.062a1.125 1.125 0 010 1.953l-7.108 4.062a1.125 1.125 0 01-1.683-.977V8.688z"
                      />
                    </svg>
                  </button>
                </div>

                {/* Thumbs Up Button */}
                <button className="btn btn-ghost mx-4 mt-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6.633 10.5c.806 0 1.533-.446 2.031-1.08a9.041 9.041 0 012.861-2.4c.723-.384 1.35-.956 1.653-1.715a4.498 4.498 0 00.322-1.672V3a.75.75 0 01.75-.75A2.25 2.25 0 0116.5 4.5c0 1.152-.26 2.243-.723 3.218-.266.558.107 1.282.725 1.282h3.126c1.026 0 1.945.694 2.054 1.715.045.422.068.85.068 1.285a11.95 11.95 0 01-2.649 7.521c-.388.482-.987.729-1.605.729H13.48c-.483 0-.964-.078-1.423-.23l-3.114-1.04a4.501 4.501 0 00-1.423-.23H5.904M14.25 9h2.25M5.904 18.75c.083.205.173.405.27.602.197.4-.078.898-.523.898h-.908c-.889 0-1.713-.518-1.972-1.368a12 12 0 01-.521-3.507c0-1.553.295-3.036.831-4.398C3.387 10.203 4.167 9.75 5 9.75h1.053c.472 0 .745.556.5.96a8.958 8.958 0 00-1.302 4.665c0 1.194.232 2.333.654 3.375z"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default radio;
