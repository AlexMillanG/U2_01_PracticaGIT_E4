import React, { useState } from 'react';
import Swal from 'sweetalert2';
import Modal from '../../components/Modal';

export const CarCard = ({ car, onEdit }) => {
  const [modalOpen, setModalOpen] = useState(false);

  const deleteCar = async () => {
    const result = await Swal.fire({
      title: "¿Estás seguro que quieres eliminar este carro?",
      showDenyButton: true,
      showCancelButton: false,
      confirmButtonText: "Eliminar",
      denyButtonText: "Cancelar",
      customClass: {
        confirmButton: 'swal2-confirm-btn',
        denyButton: 'swal2-deny-btn'
      }
    });

    if (result.isConfirmed) {
      try {
        const response = await fetch(`http://localhost:8080/api/cars/delete/${car.id}`, {
          method: 'DELETE'
        });

        if (!response.ok) {
          throw new Error('Error al eliminar el carro');
        }

        Swal.fire("¡Carro eliminado!", "", "success");
        setTimeout(() => {
          window.location.reload()
        }, 2000);
      } catch (error) {
        console.error('Error:', error);
        Swal.fire("Error", "No se pudo eliminar el carro", "error");
      }
    } else if (result.isDenied) {
      Swal.fire("Acción cancelada", "", "info");
    }
  };

  return (
    <>
      <div className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 p-6 space-y-2">
        <span className="block font-bold text-xl text-gray-900">{car.brand}</span>
        <span className="block text-lg text-gray-700">{car.model}</span>
        <span className="block text-lg text-gray-700">Placa {car.plate}</span>
        <div className="flex items-center justify-around pt-4">
          <button
            className="bg-yellow-400 hover:bg-yellow-500 text-white p-2 rounded-lg"
            onClick={() => onEdit(car)}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2"
              viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M14.3 4.8l2.9 2.9M7 7H4a1 1 0 0 0-1 1v10a1 
            1 0 0 0 1 1h11a1 1 0 0 0 1-1v-4.5m2.4-9.9a2 2 0 0 1 0 2.8l-6.8 6.8L8 14l.7-3.6 6.8-6.8a2 2 0 0 1 
            2.8 0z" />
            </svg>
          </button>
          <button
            onClick={deleteCar}
            className="bg-red-400 hover:bg-red-500 text-white p-2 rounded-lg"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2"
              viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 7h14m-9 3v8m4-8v8M10 3h4a1 
            1 0 0 1 1 1v3H9V4a1 1 0 0 1 1-1zM6 7h12v13a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V7z" />
            </svg>
          </button>
          <button
            className="bg-blue-500 hover:bg-blue-600 text-white text-sm px-4 py-2 rounded-lg"
            onClick={() => setModalOpen(true)}
          >
            Ver más
          </button>
        </div>
      </div>

      <Modal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        title={"Info"}
      >
        <p className='mb-4'>Más información del carro: <span className='font-bold'>
          {car.brand} {car.model}</span></p>
        <hr />
        <div className='mt-4 flex flex-col'>
          <span className='font-bold text-lg '>Datos del proveedor:  </span>
          <span>Nombre completo: {car.provider.name} {car.provider.surname} {car.provider.lastname}</span>
          <span>Número telefónico: {car.provider.phoneNumber} </span>
          <span>Correo: {car.provider.email} </span>
        </div>
      </Modal>
    </>
  );
};
