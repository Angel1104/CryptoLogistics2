import React, { useState, useEffect, useContext } from "react";
import Layout from '../Components/Layout';
import { GetShipment } from "../Components/index";
import { TrackingContext } from "../Conetxt/TrackingContext";
import VariableMarker from '../Components/VariableMarker';
const Cadena = () => {
  const { getAllRam, getShipment } = useContext(TrackingContext);

  // STATE VARIABLES
  const [getModel, setGetModel] = useState(false);
  const [allRamsdata, setallRamsdata] = useState();

  useEffect(() => {
    const fetchData = async () => {
      const allData = await getAllRam();
      setallRamsdata(allData);
    };

    fetchData();
  }, []);

  const [variableValue, setVariableValue] = useState(1);
  const handleChangeValue = () => {
    // Simular el cambio de valor de la variable
    setVariableValue((prevValue) => (prevValue === 6 ? 1 : prevValue + 1));
  };

  return (
    <Layout>
      <h1 className="text-center text-2xl text-gray-800 font-light mb-4">
        CADENA DE SUMINISTRO
      </h1>

      <GetShipment
        getModel={getModel}
        setGetModel={setGetModel}
        getShipment={getShipment}
      />
        
      <VariableMarker value={variableValue} />
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 mt-4 rounded"
        onClick={handleChangeValue}
      >
        Siguiente Estado
      </button>
    </Layout>
  );
};

export default Cadena;
