import React from 'react';
import Link from 'next/link';
import Head from 'next/head';


const admin = () => {
  return (
    <>
    <Head>
                <title>CryptoLogistics</title>
                <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/normalize/8.0.1/normalize.css" integrity="sha512-oHDEc8Xed4hiW6CxD7qjbnI+B07vDdX7hEPTvn9pSZO1bcRqHp8mj9pyr+8RVC2GmtEfI2Bi9Ke9Ass0as+zpg==" crossorigin="anonymous" referrerpolicy="no-referrer" />
                <link href="https://unpkg.com/tailwindcss@^1.0/dist/tailwind.min.css" rel="stylesheet"></link>
            </Head>
    <div className="bg-gray-800 min-h-screen flex items-center justify-center">
      <div className="max-w-3xl mx-auto flex flex-col-reverse md:flex-row p-6 bg-white rounded-lg shadow-lg">
        <div className="w-full md:w-1/2 md:pr-6">
          <img src="/logo.png" alt="Logo" className="w-full h-auto" />
        </div>
        <div className="w-full md:w-1/2 md:pr-6 flex flex-col justify-center ">
          <h1 className="text-3xl font-bold mb-4 text-center">Bienvenido a Crypto Logistics</h1>
          <p className="text-gray-700 mb-6 text-center">Software para el control de productos en una cadena de sumistros usando blockchain</p>
          <Link href="/" className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors duration-300 text-center">
            Comenzar
          </Link>
        </div>
      </div>
    </div>
    </>
  );
};

export default admin;