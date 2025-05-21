import React, { useEffect, useState } from 'react'
import { CarCard } from './CarCard'
import Modal from '../../components/Modal';

export const Cars = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentCarId, setCurrentCarId] = useState(null);

  const proveedores = [
    { id: '1', nombre: 'Proveedor A' },
    { id: '2', nombre: 'Proveedor B' },
    { id: '3', nombre: 'Proveedor C' },
  ];

  const [cars, setCars] = useState([
    {
      id: 1,
      marca: 'Nissan',
      modelo: 'Versa',
      color: 'Azul',
      numeroPlaca: 'XYZ123',
      idProveedor: '2'
    },
    {
      id: 2,
      marca: 'Toyota',
      modelo: 'Corolla',
      color: 'Rojo',
      numeroPlaca: 'ABC456',
      idProveedor: '1'
    }
  ]);

  const [formData, setFormData] = useState({
    marca: '',
    modelo: '',
    color: '',
    numeroPlaca: '',
    idProveedor: '',
  });

  const openModalForEdit = (car) => {
    setFormData(car);
    setCurrentCarId(car.id);
    setIsEditing(true);
    setModalOpen(true);
  };

  const openModalForCreate = () => {
    setFormData({
      marca: '',
      modelo: '',
      color: '',
      numeroPlaca: '',
      idProveedor: '',
    });
    setCurrentCarId(null);
    setIsEditing(false);
    setModalOpen(true);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (isEditing) {
      setCars(prevCars =>
        prevCars.map(car => car.id === currentCarId ? { ...formData, id: currentCarId } : car)
      );
    } else {
      const newCar = { ...formData, id: Date.now() };
      setCars(prevCars => [...prevCars, newCar]);
    }

    setModalOpen(false);
  };

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4">
      <div className='flex items-center justify-between mb-8'>
        <h2 className="text-3xl font-bold text-center text-gray-800">Catálogo de Autos</h2>
        <button onClick={openModalForCreate} className='py-2 px-4 bg-blue-500 rounded-lg text-white hover:bg-blue-600'>
          Registrar Carro
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {cars.map(car => (
          <CarCard key={car.id} car={car} onEdit={openModalForEdit} />
        ))}
      </div>

      <Modal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        title={isEditing ? "Editar auto" : "Registrar auto"}
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className='text-gray-800'>Marca:</label>
            <input
              type="text"
              name="marca"
              value={formData.marca}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <div>
            <label className='text-gray-800'>Modelo:</label>
            <input
              type="text"
              name="modelo"
              value={formData.modelo}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <div>
            <label className='text-gray-800'>Color:</label>
            <input
              type="text"
              name="color"
              value={formData.color}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <div>
            <label className='text-gray-800'>Número de placa:</label>
            <input
              type="text"
              name="numeroPlaca"
              value={formData.numeroPlaca}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <div>
            <label className='text-gray-800'>Proveedor:</label>
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
            {isEditing ? "Actualizar" : "Guardar"}
          </button>
        </form>
      </Modal>
    </div>
  );
};

