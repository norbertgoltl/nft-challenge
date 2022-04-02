import type { GetServerSideProps, NextPage } from 'next'
import Head from 'next/head'
import Link from 'next/link';
import { sanityClient, urlFor } from '../sanity'
import { Collection } from "../typings";
import React from "react";

interface Props {
  collections: Collection[]
}

const Home = ({ collections }: Props) => {
  return (
    <div className="flex flex-col mx-auto px-10 2xl:px-0 py-20 min-h-screen max-w-7xl">
      <Head>
        <title>NFT Drop</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <h1 className="mb-10 font-extralight text-4xl">
        The{' '}
        <span className="font-extrabold underline decoration-pink-600/50">
              PAPAFAM
            </span>{' '}
        NFT Market Place
      </h1>

      <main className="p-10 bg-slate-100 shadow-xl shadow-rose-400/20">
        <div className="grid md:grid-cols-2 ld:grid-cols-3 2xl:grid-cols-4 space-x-3">
          {collections.map(collection => (
            <Link href={`/nft/${collection.slug.current}`}>
              <div className="flex flex-col items-center transition-all duration-200 hover:scale-105">
                <img
                  className="w-60 h-96 rounded-xl object-cover"
                  src={urlFor(collection.mainImage).url()}
                  alt=""
                />

                <div className="p-5">
                  <h2 className="text-3xl">{collection.title}</h2>
                  <p className="mt-2 text-sm text-gray-400">{collection.description}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </main>
    </div>
  )
}

export default Home

export const getServerSideProps: GetServerSideProps = async () => {
  const query = `*[_type == "collection"]{
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

  const collections = await sanityClient.fetch(query)

  return {
    props: {
      collections
    }
  }
}
