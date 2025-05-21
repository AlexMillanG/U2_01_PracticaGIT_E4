import React, { useEffect, useState } from 'react'
import { CarCard } from './CarCard'
import Modal from '../../components/Modal';

export const Cars = () => {
  const [modalOpen, setModalOpen] = useState(false);
  // const [proveedores, setProveedores] = useState([]);
  const proveedores = [
    { id: '1', nombre: 'Proveedor A' },
    { id: '2', nombre: 'Proveedor B' },
    { id: '3', nombre: 'Proveedor C' },
  ];

  const [formData, setFormData] = useState({
    marca: '',
    modelo: '',
    color: '',
    numeroPlaca: '',
    idProveedor: '',
  });

  useEffect(() => {
    // fetch('http://localhost:8080/api/proveedores') 
    //   .then(res => res.json())
    //   .then(data => setProveedores(data))
    //   .catch(err => console.error('Error al obtener proveedores:', err));
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    setModalOpen(false);
  };

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4">
      <div className='flex items-center justify-between mb-8'>
        <h2 className="text-3xl font-bold text-center text-gray-800">Catálogo de Autos</h2>
        <button onClick={() => setModalOpen(true)} className='py-2 px-4 bg-blue-500 rounded-lg text-white hover:bg-blue-600'>
          Registrar Carro
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        <CarCard />
        <CarCard />
        <CarCard />
        <CarCard />
        <CarCard />
      </div>

      <Modal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        title="Detalles del Auto"
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="marca" className='text-gray-800'>Marca:</label>
            <input
              type="text"
              name="marca"
              placeholder="Marca"
              value={formData.marca}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <div>
            <label htmlFor="modelo" className='text-gray-800'>Modelo:</label>
            <input
              type="text"
              name="modelo"
              placeholder="Modelo"
              value={formData.modelo}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              required
            />
          </div>

          <div>
            <label htmlFor="color" className='text-gray-800'>Modelo:</label>
            <input
              type="text"
              name="color"
              placeholder="Color"
              value={formData.color}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              required
            />
          </div>

          <div>
            <label htmlFor="numeroPlaca" className='text-gray-800'>Número de placa:</label>

            <input
              type="text"
              name="numeroPlaca"
              placeholder="Número de Placa"
              value={formData.numeroPlaca}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              required
            />
          </div>

          <div>
            <label htmlFor="idProveedor" className='text-gray-800'>Proveedor:</label>

            <select
              name="idProveedor"
              value={formData.idProveedor}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              required
            >
              <option value="">Seleccione un proveedor</option>
              {proveedores.map((prov) => (
                <option key={prov.id} value={prov.id}>
                  {prov.nombre}
                </option>
              ))}
            </select>
          </div>


          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
          >
            Guardar
          </button>
        </form>
      </Modal>
    </div>
  );
}
