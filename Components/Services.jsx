import React from "react";

const Services = ({
  setCompleteModal,
  setStartModal,
  setCreateRamModel,
  setprogrammedModalRam,
  setTestModalRam,
  setPackedModalRam
}) => {


  return (
    <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 xl:grid-cols-2 gap-x-9 gap-y-10 mx-6 ">
      <div 
      className="hover:cursor-pointer h-32 flex flex-col bg-gray-800 drop-shadow hover:drop-shadow-lg hover:opacity-70 mr-5"
      onClick={()=>setCreateRamModel(true)}
      >
        <div className="flex justify-center items-center h-screen">
          <p className="mr-3 text-white">1</p>
          <button 
            className="text-white"
          >
            Ensamblaje
          </button>
        </div>
      </div>
      
      <div 
      onClick={()=>setprogrammedModalRam(true)}
      className="hover:cursor-pointer h-32 flex flex-col bg-gray-800 drop-shadow hover:drop-shadow-lg hover:opacity-70 mr-5">
        <div className="flex justify-center items-center h-screen">
          <p className="mr-3 text-white">2</p>
          <button className="text-white">
            Programacion
          </button>
        </div>
      </div>

      <div 
      onClick={()=>setTestModalRam(true)}
      className="hover:cursor-pointer h-32 flex flex-col bg-gray-800 drop-shadow hover:drop-shadow-lg hover:opacity-70 mr-5">
        <div className="flex justify-center items-center h-screen">
          <p className="mr-3 text-white">3</p>
          <button className="text-white">
            Gestion de calidad
          </button>
        </div>
      </div>

      <div 
      onClick={()=>setPackedModalRam(true)}
      className="hover:cursor-pointer h-32 flex flex-col bg-gray-800 drop-shadow hover:drop-shadow-lg hover:opacity-70 mr-5">
        <div className="flex justify-center items-center h-screen">
          <p className="mr-3 text-white">4</p>
          <button className="text-white">
            Empaquetado
          </button>
        </div>
      </div>

      <div 
      onClick={()=>setStartModal(true)}
      className="hover:cursor-pointer h-32 flex flex-col bg-gray-800 drop-shadow hover:drop-shadow-lg hover:opacity-70 mr-5">
        <div className="flex justify-center items-center h-screen">
          <p className="mr-3 text-white">5</p>
          <button className="text-white">
            Iniciar envio
          </button>
        </div>
      </div>
      
      <div 
      onClick={()=>setCompleteModal(true)}
      className="hover:cursor-pointer h-32 flex flex-col bg-gray-800 drop-shadow hover:drop-shadow-lg hover:opacity-70 mr-5">
        <div className="flex justify-center items-center h-screen">
          <p className="mr-3 text-white">6</p>
          <button className="text-white">
            Proceso final
          </button>
        </div>
      </div>
      
    </div>
  );
};

export default Services;