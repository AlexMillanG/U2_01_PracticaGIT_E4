import React, { useEffect, useState } from 'react'
import { CarCard } from './CarCard'
import Modal from '../../components/Modal';

export const Cars = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentCarId, setCurrentCarId] = useState(null);
  const [providers, setProviders] = useState([]);

  const [cars, setCars] = useState([]);

  const fetchCars = async () => {
    try {
      const response = await fetch('http://localhost:8080/api/cars/');
      const data = await response.json();
      console.log(data)
      setCars(data.data)

    } catch (error) {
      console.log(error)
    }
  }
  const fetchProviders = async () => {
    try {
      const response = await fetch('http://localhost:8080/api/providers/');
      const data = await response.json();
      console.log(data)
      setProviders(data.data)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    fetchCars();
    fetchProviders()
  }, []);

  const [formData, setFormData] = useState({
    marca: '',
    modelo: '',
    numeroPlaca: '',
    idProveedor: '',
  });

  const openModalForEdit = (car) => {
    setFormData({
      id: car.id,
      marca: car.brand,       
      modelo: car.model,       
      numeroPlaca: car.plate,  
      idProveedor: car.provider?.id || '' 
    });
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

  const handleSubmit = async (e) => {
  e.preventDefault();

  const carData = {
    model: formData.modelo,
    brand: formData.marca,
    plate: formData.numeroPlaca,
    provider: {
      id: formData.idProveedor
    }
  };

  try {
    let url, method;
    
    if (isEditing) {
      url = `http://localhost:8080/api/cars/update`;
      method = 'PUT';
      carData.id = currentCarId;
    } else {
      url = 'http://localhost:8080/api/cars/save';
      method = 'POST';
    }
    console.log(carData)

    const response = await fetch(url, {
      method: method,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(carData),
    });

    if (!response.ok) {
      throw new Error(`Error al ${isEditing ? 'actualizar' : 'guardar'} el auto`);
    }

    setModalOpen(false);
    fetchCars();

  } catch (error) {
    console.error('Error:', error);
  }
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
              {providers.map((prov) => (
                <option key={prov.id} value={prov.id}>
                  {prov.name}
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

