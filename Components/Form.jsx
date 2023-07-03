import { useState, useEffect } from "react";

export default ({
  setCreateRamModel,
  createRamModel,
  createRam,
}) => {
  const [ram, setRam] = useState({
    receptor: "",
    fechaCreacion: "",
    tipo: "",
    cantidad: "",
  });

  const createItem = async () => {
    try {
      await createRam(ram);
    } catch (error) {
      console.log("Wrong creating item");
    }
  };

  const [currentDate, setCurrentDate] = useState('');

  useEffect(() => {
    const date = new Date();
    const formattedDate = `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`;
    setCurrentDate(formattedDate);
  }, []);
  
  return createRamModel ? (
    <div className="fixed inset-0 z-10 overflow-y-auto">
      <div
        className="fixed inset-0 w-full h-full bg-black opacity-40"
        onClick={() => setCreateRamModel(false)}
      ></div>
      <div className="flex items-center min-h-screen px-4 py-8">
        <div className="relative w-full max-w-lg p-4 mx-auto bg-white rounded-md shadow-lg">
          <div className="flex justify-end">
            <button
              className="p-2 text-gray-400 rounded-md hover:bg-gray-100"
              onClick={() => setCreateRamModel(false)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-5 h-5 mx-auto"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </div>
          <div className="max-w-sm mx-auto py-3 space-y-3 text-center">
            <h4 className="text-lg font-medium text-gray-800">
              Ensamblar RAM
            </h4>
            <p className="text-[15px] text-gray-600">
              Ingrese los datos revisandolos detalladamente
            </p>
            <form onSubmit={(e) => e.preventDefault()}>
              <div className="relative mt-3">
                <input
                  type="text"
                  placeholder="receptor"
                  className="w-full pl-5 pr-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
                  onChange={(e) =>
                    setRam({
                      ...ram,
                      receptor: e.target.value,
                    })
                  }
                />
              </div>
              <div className="relative mt-3">
              
                {console.log(currentDate)}
              </div>
              {/* <div className="relative mt-3">
                <input
                  type="text"
                  placeholder="TIPO DE RAM"
                  className="w-full pl-5 pr-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
                  onChange={(e) =>
                    setRam({
                      ...ram,
                      tipo: e.target.value,
                    })
                  }
                />
              </div> */}
              <div className="relative mt-3">
                <select
                  value={ram.tipo}
                  onChange={(e) =>
                    setRam({
                      ...ram,
                      tipo: e.target.value,
                    })
                  }
                  className="w-full pl-5 pr-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
                >
                  <option disabled value="">Selecciona un tipo de producto</option>
                  <option value="1">RAM</option>
                  <option value="2">HDD</option>
                  <option value="3">SSD</option>
                </select>
                
              </div>
              <div className="relative mt-3">
                <input
                  type="text"
                  placeholder="Cantidad"
                  className="w-full pl-5 pr-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
                  onChange={(e) =>
                    setRam({
                      ...ram,
                      cantidad: e.target.value,
                      fechaCreacion: currentDate
                    })
                  }
                />
              </div>

              <button
                onClick={() => createItem()}
                className="block w-full mt-3 py-3 px-4 font-medium text-sm text-center text-white bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-700 rounded-lg ring-offset-2 ring-indigo-600 focus:ring-2"
              >
                Ensamblar RAM
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  ) : (
    ""
  );
};
