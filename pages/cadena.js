import React, { useState, useEffect, useContext } from "react";
import Layout from '../Components/Layout';
import  {Pasos}  from "../Components/index";
import { TrackingContext } from "../Conetxt/TrackingContext";
const Cadena = () => {
  const {
    getAllRam,
    getRam,
  } = useContext(TrackingContext);

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
    <Layout>
      <h1 className="text-center text-2xl text-gray-800 font-bold mb-4">
        CADENA DE SUMINISTRO
      </h1>
      <p className="text-center text-2xl text-gray-800 font-light mb-4">Ingresa el ID de un lote de productos o de un producto para saber en que proceso se encuentra dentro la cadena de suministros</p>
      <div className="flex">

      <Pasos
              getRam={getRam}
      ></Pasos>
      
    </div>
    </Layout>
  );
};

export default Cadena;
