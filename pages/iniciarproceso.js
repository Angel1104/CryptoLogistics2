import React, { useState, useEffect, useContext } from "react";
import Layout from '../Components/Layout';

import {
    Form,
    Services,
    Profile,
    CompleteShipment,
    GetShipment,
    StartShipment,
    ProgrammedRam,
    TestRam,
    PackedRam
  } from "../Components/index";
import { TrackingContext } from "../Conetxt/TrackingContext";

const IniciarProceso = () => {

    const {
        currentUser,
        createRam,
        getAllRam,
        completeRam,
        getShipment,
        startRam,
        getRamsCount,
        programmedRam,
        testRam,
        packedRam
      } = useContext(TrackingContext);

    //STATE VARIABLE
  const [createRamModel, setCreateRamModel] = useState(false);
  const [openProfile, setOpenProfile] = useState(false);
  const [startModal, setStartModal] = useState(false);
  const [completeModal, setCompleteModal] = useState(false);
  const [getModel, setGetModel] = useState(false);
  const [programmedModalRam, setprogrammedModalRam] = useState(false);
  const [testModalRam, setTestModalRam] = useState(false);
  const [packedModalRam, setPackedModalRam] = useState(false);
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
        <h1 className='text-center text-2xl text-gray-800 font-light mb-4 '>CADENA DE SUMINISTRO</h1>
        <Services
        setCompleteModal={setCompleteModal}
        setStartModal={setStartModal}
        setCreateRamModel={setCreateRamModel}
        setprogrammedModalRam={setprogrammedModalRam}
        setTestModalRam= {setTestModalRam}
        setPackedModalRam={setPackedModalRam}
        />
        <Form
            createRamModel={createRamModel}
            createRam={createRam}
            setCreateRamModel={setCreateRamModel}
        />
        
        <CompleteShipment
        completeModal={completeModal}
        setCompleteModal={setCompleteModal}
        completeRam={completeRam}
      />
        <GetShipment
        getModel={getModel}
        setGetModel={setGetModel}
        getShipment={getShipment}
      />
        <StartShipment
        startModal={startModal}
        setStartModal={setStartModal}
        startRam={startRam}
      />
        <Profile
        openProfile={openProfile}
        setOpenProfile={setOpenProfile}
        currentUser={currentUser}
        getRamsCount={getRamsCount}
      />
      <ProgrammedRam
        programmedModalRam ={programmedModalRam}
        setprogrammedModalRam={setprogrammedModalRam}
        programmedRam={programmedRam}
      />
      <TestRam
        testModalRam = {testModalRam}
        setTestModalRam = {setTestModalRam}
        testRam={testRam}
      />
      <PackedRam
        packedModalRam={packedModalRam}
        setPackedModalRam = {setPackedModalRam}
        packedRam = {packedRam}
      />
    </Layout>
    );
}
 
export default IniciarProceso;