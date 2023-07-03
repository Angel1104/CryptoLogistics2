import React, { useState, useEffect, useContext } from "react";
import { Bar,Doughnut  } from 'react-chartjs-2';
import 'chart.js/auto';
import { Layout } from '../Components';
import { TrackingContext } from "../Conetxt/TrackingContext";


const ReportPage = () => {
    const {getAllRam,} = useContext(TrackingContext);
    
        //DATA STATE VARIABLE
        const [allRamsdata, setallRamsdata] = useState();
      
        useEffect(() => {
          const getCampaignsData = getAllRam();
      
          return async () => {
            const allData = await getCampaignsData;
            setallRamsdata(allData);
          };
        }, []);
    
        
        function sumarCamposEnteros(array) {
            if (!Array.isArray(array)) {
            return 0;
            }
        
            return array.reduce((accumulator, currentValue) => accumulator + (Number.isInteger(parseInt(currentValue)) ? parseInt(currentValue) : 0), 0);
        }
        const tipo = (ram, busqueda) => {
            
            return ram.tipo.toString().includes(busqueda)
          };
          
        const busquedaTipo = (busqueda) => {
            const resultados = allRamsdata?.filter((ram,idx) => tipo(ram, busqueda));
            return resultados;
        };
        ;
        const tipos=()=>{
            var res=[];
            var res2=[];
            for (let i = 1; i <= 3; i++) {
                const precios = busquedaTipo(i)?.map((ram,idx) =>
                ram.cantidad);
                res2.push(precios);
            }
            for (let i = 0; i <= 2; i++) {
                res.push(sumarCamposEnteros(res2[i]));
            }
            console.log(res2)
            console.log(res)
            return(res)
        }


        const estado = (ram, busqueda) => {
            return ram.status.toString().includes(busqueda)
          };
          
        const busquedaEstado = (busqueda) => {
            const resultados = allRamsdata?.filter((ram,idx) => estado(ram, busqueda));
            return resultados;
        };
        
        const estados=()=>{
            var res=[];
            for (let i = 0; i <= 5; i++) {
                res.push(busquedaEstado(i)?.length);
            }
            console.log(res)
            return(res)
        }


      const tipoProductos = {
        labels: ['RAM', 'SDD', 'HDD'],
        datasets: [
          {
            data: tipos(),
            backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF'],
          },
        ],
      };

      const cantidadProductosPorEstado = {
        labels: ['ENSAMBLADO', 'PROGRAMADO', 'PROBADO', 'EMPACADO','ENVIADO', 'COMPLETADO'],
        datasets: [
          {
            label: 'Cantidad de productos por estado',
            data: estados(),
            backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF'],
          },
        ],
      };
      
    // Opciones de configuración para los gráficos de torta
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom',
      },
      title: {
        display: true,
        text: 'Gráficos de Torta',
      },
    },
  };
  
    return (
        <Layout>
      <div className="flex flex-col items-center justify-center mt-11">
        <h1 className="text-3xl font-bold mb-4">Informes</h1>


        <h2 className="text-xl font-bold mb-2">Cantidad de productos en los diferentes procesos</h2>
        {allRamsdata?.length > 0 ? (
        <div className="w-4/5 sm:w-3/5 md:w-2/5 lg:w-2/6">
            <div style={{ height: '400px' }}>
                <Bar data={cantidadProductosPorEstado} options={options} />
            </div>
        </div>  
        ) : (
        <p>No se encontraron productos con los filtros seleccionados.</p>
        )}

        <h2 className="text-xl font-bold mb-2">Tipo de productos</h2>
        {allRamsdata?.length > 0 ? (
        <div className="w-4/5 sm:w-3/5 md:w-2/5 lg:w-2/6">
            <div style={{ height: '400px' }}>
            <Doughnut data={tipoProductos} options={options} />
            </div>
        </div>
        ) : (
        <p>No se encontraron productos con los filtros seleccionados.</p>
        )}
      </div>
    </Layout>
    );
  };
  
  export default ReportPage;