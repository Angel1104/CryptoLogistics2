import React from "react";

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


  console.log(allRamsdata);
  return (
    <div className="mt-12 shadow-sm border rounded-lg overflow-x-auto">
        <table className="w-full table-auto text-sm text-left">
          <thead className="bg-gray-50 text-gray-600 font-medium border-b">
            <tr>
              <th className="py-3 px-6">ID</th>
              <th className="py-3 px-6">Creador</th>
              <th className="py-3 px-6">Receptor</th>
              <th className="py-3 px-6">Fecha ensamblaje</th>
              <th className="py-3 px-6">DDR</th>
              <th className="py-3 px-6">Precio</th>
              <th className="py-3 px-6">Fecha programado</th>
              <th className="py-3 px-6">Fecha empaquetado</th>
              <th className="py-3 px-6">Fecha pruebas</th>
              <th className="py-3 px-6">Fecha envio</th>
              {/* <th className="py-3 px-6">Fecha final</th> */}
              <th className="py-3 px-6">Pago</th>
              <th className="py-3 px-6">Estado</th>
            </tr>
          </thead>
          <tbody className="text-gray-600 divide-y">
            {allRamsdata?.map((ram, idx) => (
              
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
                <td className="px-6 py-4 whitespace-nowrap">
                  {converTime(ram.fechaProgramado)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {converTime(ram.fechaPrueba)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {converTime(ram.fechaEmpaque)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {converTime(ram.fechaEnvio)}
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