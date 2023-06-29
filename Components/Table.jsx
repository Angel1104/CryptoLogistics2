import React, { useState, useEffect } from "react";
const Table = ({ setCreateRamModel, allRamsdata}) => {
  const converTime = (time) => {
    const newTime = new Date(time);
    const dataTime = new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    }).format(newTime);

    return dataTime;
  };

  const [searchId, setSearchId] = useState("");
  const [filteredRams, setFilteredRams] = useState(allRamsdata);
  const [searchQuery, setSearchQuery] = useState("");
  
  const handleSearchQueryChange = (e) => {
    const { value } = e.target;
    setSearchQuery(value);
  };
  const handleSearch = () => {
    handleButtonClick
    var busqueda;
    if (searchQuery == "ENSAMBLADO") {
      busqueda = 0
    }else if(searchQuery == "PROGRAMADO"){
      busqueda = 1
    }else if(searchQuery == "ENSAMBLADO"){
      busqueda = 2
    }else if(searchQuery == "PROBADO"){
      busqueda = 3
    }else if(searchQuery == "ENIVADO"){
      busqueda = 4
    }else if(searchQuery == "COMPLETO"){
      busqueda = 5
    }
    if (searchQuery === "") {
      setFilteredRams(allRamsdata);
      
    } else {
    const filtered = allRamsdata.filter((ram) =>
    
      ram.status.toString().includes(busqueda)
    );
    setFilteredRams(filtered);
    }
  };

  const [isButtonPressed, setIsButtonPressed] = useState(false);

  const handleButtonClick = () => {
    setIsButtonPressed(true);
  };

  console.log(allRamsdata);
  return (
    <div className="mt-12 shadow-sm border rounded-lg overflow-x-auto">
      <input
      type="text"
      value={searchQuery}
      onChange={handleSearchQueryChange}
      placeholder="Buscar por estado..."
      className="border border-gray-300 rounded px-4 py-2 focus:outline-none"
    />
    <button
      onClick={handleSearch}
      className="ml-2 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
    >BUSCAR</button>
        <table className="w-full table-auto text-sm text-left">
          <thead className="bg-gray-50 text-gray-600 font-medium border-b">
            <tr>
              <th className="py-3 px-6">ID</th>
              <th className="py-3 px-6">Creador</th>
              <th className="py-3 px-6">Receptor</th>
              <th className="py-3 px-6">Fecha ensamblaje</th>
              <th className="py-3 px-6">DDR</th>
              <th className="py-3 px-6">Precio</th>
              {/* <th className="py-3 px-6">Fecha programado</th>
              <th className="py-3 px-6">Fecha empaquetado</th>
              <th className="py-3 px-6">Fecha pruebas</th> */}
              <th className="py-3 px-6">Fecha envio</th>
              {/* <th className="py-3 px-6">Fecha final</th> */}
              <th className="py-3 px-6">Pago</th>
              <th className="py-3 px-6">Estado</th>
            </tr>
          </thead>
          <tbody className="text-gray-600 divide-y">
            {/* {isButtonPressed?filteredRams?.map : allRamsdata?.map ((ram, idx) => ( */}
            {filteredRams?.map ((ram, idx) => (
              <tr key={idx}>
                <td className="px-6 py-4 whitespace-nowrap">
                  {allRamsdata.indexOf(ram) }
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {ram.sender.slice(0, 15)}...
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {ram.receptor.slice(0, 15)}...
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {converTime(ram.fechaCreacion)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {ram.ddr} 
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {ram.precio}
                </td>
                {/* <td className="px-6 py-4 whitespace-nowrap">
                  {converTime(ram.fechaProgramado)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {converTime(ram.fechaPrueba)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {converTime(ram.fechaEmpaque)}
                </td> */}
                <td className="px-6 py-4 whitespace-nowrap">
                  {ram.fechaEnvio}
                </td>
                {/* <td className="px-6 py-4 whitespace-nowrap">
                  {converTime(ram.fechaFinal)}
                </td> */}
                <td className="px-6 py-4 whitespace-nowrap">
                  {ram.isPaid ? " Si" : "No"}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                {ram.status == 0
                    ? "ENSAMBLADO"
                    : ram.status == 1
                    ? "PROGRAMADO"
                    : ram.status == 2
                    ? "PROBADO"
                    : ram.status == 3
                    ? "EMPACADO"
                    : ram.status == 4
                    ? "ENVIADO"
                    : "COMPLETO"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
  );
};

export default Table;