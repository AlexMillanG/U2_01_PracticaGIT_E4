import React, { useEffect, useState } from "react";

export const Provider = () => {
  const [proveedores, setProveedores] = useState([]);
  const [autos, setAutos] = useState([]);
  const [detallePlaca, setDetallePlaca] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

/*   useEffect(() => {
    fetch("/api/proveedores")
      .then((res) => res.json())
      .then((data) => setProveedores(data));
  }, []);

  const handleSelectProveedor = (id) => {
    fetch(`/api/proveedores/${id}/autos`)
      .then((res) => res.json())
      .then((data) => {
        setAutos(data);
        setModalOpen(true);
      });
  };

  const verDetallePlacas = (placa) => {
    fetch(`/api/autos/placa/${placa}`)
      .then((res) => res.json())
      .then((data) => setDetallePlaca(data));
  };
*/
  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4">
      <h2 className="text-3xl font-bold text-start text-gray-800 mb-8">Proveedores</h2>

      <div className="overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left text-gray-500">
          <thead className="text-xs text-gray-700 uppercase bg-gray-200">
            <tr>
              <th scope="col" className="px-6 py-3">Nombre completo</th>
              <th scope="col" className="px-6 py-3">Teléfono</th>
              <th scope="col" className="px-6 py-3">Ver Autos</th>
            </tr>
          </thead>
          <tbody>
             <tr  className="bg-white border-b hover:bg-gray-100">
                <td className="px-6 py-4">Ilce Rosel</td>
                <td className="px-6 py-4"> 777 2474738</td>
                <td className="px-6 py-4">ver mas</td>
               
                </tr>
            {/* {proveedores.map((prov) => ( 
              <tr key={prov.id} className="bg-white border-b hover:bg-gray-100">
                <td className="px-6 py-4">{prov.nombre} {prov.apellido}</td>
                <td className="px-6 py-4">{prov.telefono}</td>
                <td className="px-6 py-4">
                  <button
                    onClick={() => handleSelectProveedor(prov.id)}
                    className="text-blue-600 hover:underline"
                  >
                    Ver Autos
                  </button>
                </td>
              </tr>
            ))}*/}
          </tbody>
        </table>
      </div>

      {/* Modal autos 
      {modalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-2xl shadow-lg">
            <h3 className="text-xl font-bold mb-4">Autos relacionados</h3>
            <table className="w-full text-sm text-left text-gray-500 mb-4">
              <thead className="text-xs text-gray-700 uppercase bg-gray-100">
                <tr>
                  <th className="px-4 py-2">Nombre del auto</th>
                  <th className="px-4 py-2">Placas</th>
                  <th className="px-4 py-2">Detalle</th>
                </tr>
              </thead>
              <tbody>
                {autos.map((auto) => (
                  <tr key={auto.id} className="bg-white border-b hover:bg-gray-100">
                    <td className="px-4 py-2">{auto.nombre_auto}</td>
                    <td className="px-4 py-2">{auto.placas}</td>
                    <td className="px-4 py-2">
                      <button
                        onClick={() => verDetallePlacas(auto.placas)}
                        className="text-indigo-600 hover:underline"
                      >
                        Ver Detalle
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            <button
              onClick={() => {
                setModalOpen(false);
                setDetallePlaca(null);
              }}
              className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
            >
              Cerrar
            </button>
          </div>
        </div>
      )}

    
      {detallePlaca && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-96 shadow-xl text-center">
            <h3 className="text-lg font-bold mb-2">Detalle de Placa</h3>
            <p><strong>Auto:</strong> {detallePlaca.nombre_auto}</p>
            <p><strong>Placa:</strong> {detallePlaca.placas}</p>
            <button
              onClick={() => setDetallePlaca(null)}
              className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              Cerrar detalle
            </button>
          </div>
        </div>
      )} */}
    </div>
  );
};
