import React from 'react';

const Modal = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md relative">
        {/* Botón de cerrar */}
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-500 hover:text-red-600 text-xl font-bold"
        >
          ×
        </button>

        {/* Titulo del modal */}
        {title && <h2 className="text-xl font-semibold mb-4">{title}</h2>}

        {/* Contenido */}
        <div>{children}</div>
      </div>
    </div>
  );
};

export default Modal;
