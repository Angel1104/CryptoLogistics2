import React from 'react';
import { Bar,Doughnut  } from 'react-chartjs-2';
import 'chart.js/auto';



const ReportPage = () => {
    // Valores de ejemplo para los productos y su cantidad vendida
    const productosVendidos = {
      labels: ['Producto A', 'Producto B', 'Producto C', 'Producto D', 'Producto E'],
      datasets: [
        {
          data: [25, 12, 8, 20, 15],
          backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF'],
        },
      ],
    };
  
    // Valores de ejemplo para los productos y su estado
    const productosEstado = {
      labels: ['Producto A', 'Producto B', 'Producto C', 'Producto D', 'Producto E'],
      datasets: [
        {
          data: [10, 8, 5, 12, 15],
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
        <div className="max-w-sm mx-auto">
        <h1 className="text-3xl font-bold mb-4">Informes</h1>
  
        <h2 className="text-xl font-bold mb-2">Productos más vendidos</h2>
        <div className="max-w-xs">
          <Doughnut data={productosVendidos} options={options} />
        </div>
  
        <h2 className="text-xl font-bold mb-2">Estado de los productos</h2>
        <div className="max-w-xs">
          <Doughnut data={productosEstado} options={options} />
        </div>
      </div>
    );
  };
  
  export default ReportPage;