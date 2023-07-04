import React, { useState, useEffect } from 'react';
import { CheckIcon } from '@heroicons/react/outline';
import { SpinnerIcon } from '@heroicons/react/solid';

const Pasos = ({ getModel, setGetModel, getRam }) => {
  const steps = ["ENSAMBLADO", "PROGRAMADO", "PROBADO", "EMPAQUETADO", "ENVIADO", "COMPLETADO"];
  const [currentStep, setCurrentStep] = useState(1);
  const [complete, setComplete] = useState(false);
  const [index, setIndex] = useState(0);
  const [singleRamData, setSingleRamData] = useState();

  const getRamData = async () => {
    const getData = await getRam(index);
    setSingleRamData(getData);
  };

  useEffect(() => {
    if (singleRamData) {
      setCurrentStep(singleRamData.status + 2);
    }
  }, [singleRamData]);

  return (
    <div className="flex flex-col items-center justify-center m-auto mt-32">
      <div className="flex">
        {steps?.map((step, i) => (
          <div
            key={i}
            className={`step-item ${currentStep === i + 1 && "active"} ${
              (i + 1 < currentStep || complete) && "complete"
            } `}
          >
            <div className="step">
              {i + 1 < currentStep || complete ? (
                <CheckIcon className="w-6 h-6 text-gray-800" />
              ) : (
                i + 1
              )}
            </div>
            <p className={`text-gray-700 ${complete ? "text-gray-800" : ""}`}>{step}</p>
          </div>
        ))}
      </div>

      <div>
        <form onSubmit={(e) => e.preventDefault()}>
          <div className="relative mt-3">
            <input
              type="number"
              placeholder="Id"
              className="w-full pl-5 pr-3 py-2 text-gray-900 outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
              onChange={(e) => setIndex(e.target.value)}
            />
          </div>

          <button
            onClick={() => getRamData()}
            className="block w-full mt-3 py-3 px-4 font-medium text-sm text-center text-white bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-700 rounded-lg ring-offset-2 ring-indigo-600 focus:ring-2"
          >
            Buscar
          </button>
        </form>
      </div>
    </div>
  );
};

export default Pasos;
