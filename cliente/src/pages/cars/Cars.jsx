import React, { useState } from 'react'
import { CarCard } from './CarCard'
import Modal from '../../components/Modal';

export const Cars = () => {
    const [modalOpen, setModalOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4">
      <div className='flex items-center justify-between mb-8'>
        <h2 className="text-3xl font-bold text-center  text-gray-800">Catálogo de Autos</h2>
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
        <p>Aquí van los detalles del automóvil seleccionado.</p>
      </Modal>
    </div>
  )
}
