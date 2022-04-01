import React from 'react';
import { useAddress, useDisconnect, useMetamask } from "@thirdweb-dev/react";

function NFTDropPage() {
  // Auth
  const connectWithMetamask = useMetamask();
  const address = useAddress();
  const disconnect = useDisconnect();
  // ---

  console.log(address);

  return(
    <div className="flex flex-col h-screen lg:grid lg:grid-cols-10">
      {/* Left */}
      <div className="lg:col-span-4 bg-gradient-to-br from-cyan-800 to-rose-500">
        <div className="flex flex-col items-center justify-center py-2 lg:min-h-screen">
          <div className="p-2 bg-gradient-to-br from-yellow-400 to-purple-600 rounded-xl">
            <img
              className="w-44 lg:w-72 lg:h-96 rounded-xl object-cover"
              src="https://links.papareact.com/8sg"
              alt=""
            />
          </div>
          <div className="space-y-2 p-5 text-center">
            <h1 className="font-bold text-4xl text-white">PAPAFAM Apes</h1>
            <h2 className="text-xl text-gray-300">A collection of PAPAFAM Apes who live & breathe React!</h2>
          </div>
        </div>
      </div>

      {/* Right */}
      <div className="flex flex-col flex-1 lg:col-span-6 p-12">
        {/* Header */}
        <header className="flex items-center justify-between">
          <h1 className="w-52 sm:w-80 font-extralight text-xl cursor-pointer">
            The{' '}
            <span className="font-extrabold underline decoration-pink-600/50">
              PAPAFAM
            </span>{' '}
            NFT Market Place
          </h1>

          <button
            onClick={() => (address ? disconnect() : connectWithMetamask())}
            className="px-4 lg:px-5 py-2 lg:py-3 font-bold text-xs lg:text-base text-white bg-rose-400 rounded-full"
          >
            {address ? 'Sign Out' : 'Sign In'}
          </button>
        </header>

        <hr className="my-2 border"/>
        {address && (
          <p className="text-sm text-center text-rose-400">
            You're logged in with wallet {address.substring(0, 5)}...{address.substring(address.length -5)}
          </p>
        )}

        {/* Content */}
        <div className="flex flex-col flex-1 items-center lg:justify-center space-y-6 lg:space-y-0 mt-10 text-center">
          <img
            className="pb-10 lg:h-40 w-80 object-cover"
            src="https://links.papareact.com/bdy"
            alt=""
          />
          <h1 className="font-bold lg:font-extrabold text-3xl lg:text-5xl">The PAPAFAM Ape Coding Club | NTF Drop</h1>

          <p className="pt-2 text-xl text-green-500">13 / 21 NFT's claimed</p>
        </div>

        {/* Mint Button */}
        <button className="mt-10 h-16 font-bold text-white bg-red-600 rounded-full">
          Mint NFT (0.01 ETH)
        </button>
      </div>
    </div>
  )
}

export default NFTDropPage