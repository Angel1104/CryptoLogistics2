import Head from 'next/head';
import React, { useState, useEffect, useContext } from "react";
//INTERNAL IMPORT
import { GetProduct,} from "../Components/index";
import { TrackingContext } from "../Conetxt/TrackingContext";

const admin = () => {
    const {
        getAllRam,
        getRam,
      } = useContext(TrackingContext);
  
    //STATE VARIABLE
    const [getModel, setGetModel] = useState(false);
    //DATA STATE VARIABLE
    const [allRamsdata, setallRamsdata] = useState();
  
    useEffect(() => {
      const getCampaignsData = getAllRam();
  
      return async () => {
        const allData = await getCampaignsData;
        setallRamsdata(allData);
      };
    }, []);
  return (
    <>
    <Head>
                <title>CryptoLogisticsUsers</title>
                <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/normalize/8.0.1/normalize.css" integrity="sha512-oHDEc8Xed4hiW6CxD7qjbnI+B07vDdX7hEPTvn9pSZO1bcRqHp8mj9pyr+8RVC2GmtEfI2Bi9Ke9Ass0as+zpg==" crossorigin="anonymous" referrerpolicy="no-referrer" />
                <link href="https://unpkg.com/tailwindcss@^1.0/dist/tailwind.min.css" rel="stylesheet"></link>
    </Head>
    <div className="bg-gray-800 min-h-screen flex items-center justify-center">
        <div className="max-w-full mx-auto flex flex-col md:flex-row p-6 bg-white rounded-lg shadow-lg">
          <div
            id="1"
            className="w-full md:w-1/2 md:pr-6 flex items-center justify-center"
          >
            <img src="/logo.png" alt="Logo" className="w-4/5 h-4/5" />
          </div>
          <div
            id="2"
            className="w-full md:w-1/2 md:pr-6 flex flex-col justify-center"
          >
            <h1 className="text-3xl font-bold mb-4 text-center">
              Bienvenido a Crypto Logistics
            </h1>
            <p className="text-gray-700 mb-6 text-center">
              Software para el control de productos en una cadena de suministros usando blockchain
            </p>
          </div>
          <div
          id="3"
          className="w-full p-6 bg-white rounded-lg shadow-lg mt-6 justify-center"
        >
          <h1 className="text-3xl font-bold mb-4 text-center">
            PRODUCTOS
          </h1>
          <p className="text-gray-700 mb-6 text-center">
              Ingresa el codigo del producto
            </p>
          <div className="flex flex-col md:flex-row justify-around">
            <div className="mb-4 md:mb-0">
              <button
                onClick={() => setGetModel(true)}
                className="text-center bg-blue-500 hover:bg-blue-600 text-xl text-white px-4 py-3"
              >
                Informacion de producto
              </button>
            </div>
            <GetProduct getModel={getModel} setGetModel={setGetModel} getRam={getRam} />
          </div>
        </div>
        </div>
        
      </div>
    </>
  );
};

export default admin;