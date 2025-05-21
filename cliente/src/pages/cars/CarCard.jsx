import React from 'react'

export const CarCard = ({ car, onEdit }) => {
  return (
    <div className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 p-6 space-y-2">
      <span className="block font-bold text-xl text-gray-900">{car.marca}</span>
      <span className="block text-lg text-gray-700">{car.modelo}</span>
      <span className="block text-lg text-gray-700">{car.color}</span>
      <span className="block text-lg text-gray-700">Placa {car.numeroPlaca}</span>
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
        <button className="bg-red-400 hover:bg-red-500 text-white p-2 rounded-lg">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2"
            viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 7h14m-9 3v8m4-8v8M10 3h4a1 
            1 0 0 1 1 1v3H9V4a1 1 0 0 1 1-1zM6 7h12v13a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V7z" />
          </svg>
        </button>
        <button className="bg-blue-500 hover:bg-blue-600 text-white text-sm px-4 py-2 rounded-lg">
          Ver más
        </button>
      </div>
    </div>
  );
};
