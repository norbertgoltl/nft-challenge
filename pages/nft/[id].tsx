import React from 'react';
import { useAddress, useDisconnect, useMetamask } from "@thirdweb-dev/react";
import {GetServerSideProps} from "next";
import Link from 'next/link';
import {sanityClient, urlFor} from "../../sanity";
import { Collection } from "../../typings";

interface Props {
  collection: Collection
}

function NFTDropPage({collection}: Props) {
  // Auth
  const connectWithMetamask = useMetamask();
  const address = useAddress();
  const disconnect = useDisconnect();
  // ---

  //console.log(address);

  return(
    <div className="flex flex-col h-screen lg:grid lg:grid-cols-10">
      {/* Left */}
      <div className="lg:col-span-4 bg-gradient-to-br from-cyan-800 to-rose-500">
        <div className="flex flex-col items-center justify-center py-2 lg:min-h-screen">
          <div className="p-2 bg-gradient-to-br from-yellow-400 to-purple-600 rounded-xl">
            <img
              className="w-44 lg:w-72 lg:h-96 rounded-xl object-cover"
              src={urlFor(collection.previewImage).url()}
              alt=""
            />
          </div>
          <div className="space-y-2 p-5 text-center">
            <h1 className="font-bold text-4xl text-white">
              {collection.nftCollectionName}
            </h1>
            <h2 className="text-xl text-gray-300">
              {collection.description}
            </h2>
          </div>
        </div>
      </div>

      {/* Right */}
      <div className="flex flex-col flex-1 lg:col-span-6 p-12">
        {/* Header */}
        <header className="flex items-center justify-between">
          <Link href={'/'}>
            <h1 className="w-52 sm:w-80 font-extralight text-xl cursor-pointer">
              The{' '}
              <span className="font-extrabold underline decoration-pink-600/50">
              PAPAFAM
            </span>{' '}
              NFT Market Place
            </h1>
          </Link>

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
            src={urlFor(collection.mainImage).url()}
            alt=""
          />
          <h1 className="font-bold lg:font-extrabold text-3xl lg:text-5xl">
            {collection.title}
          </h1>

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

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const query = `*[_type == "collection" && slug.current == $id][0]{
    _id,
    title,
    address,
    description,
    nftCollectionName,
    mainImage {
        asset
    },
    previewImage {
        asset
    },
    slug {
        current
    },
    creator-> {
        _id,
        name,
        address,
        slug {
            current
        },
    }, 
  }`

  const collection = await sanityClient.fetch(query, {
    id: params?.id
  })

  if (!collection) {
    return {
      notFound: true
    }
  }

  return {
    props: {
      collection
    }
  }
}