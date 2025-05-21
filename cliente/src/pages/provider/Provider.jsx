import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import Modal from "../../components/Modal";

export const Provider = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentProviderId, setCurrentProviderId] = useState(null);
  const [proveedores, setProveedores] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedProvider, setSelectedProvider] = useState(null);

  const [formData, setFormData] = useState({
    name: "",
    lastname: "",
    surname: "",
    phoneNumber: "",
    email: "",
  });

  const fetchProviders = () => {
    fetch("http://localhost:8080/api/providers/")
      .then((res) => res.json())
      .then((data) => {
        console.log("Proveedores:", data);
        if (Array.isArray(data)) {
          setProveedores(data);
        } else if (Array.isArray(data.data)) {
          setProveedores(data.data);
        } else {
          console.error("Formato invalido:", data);
          setProveedores([]);
        }
      })
      .catch((err) => {
        console.error("Error:", err);
        setProveedores([]);
      });
  };

  useEffect(() => {
    fetchProviders();
  }, []);

  const handleView = (id) => {
    fetch(`http://localhost:8080/api/providers/${id}`)
      .then((res) => res.json())
      .then((response) => {
        if (response.data) {
          setSelectedProvider(response.data);
          setShowModal(true);
        }
      })
      .catch((err) => {
        console.error("Error:", err);
        Swal.fire("Error", "No se pudo obtener proveedor", "error");
      });
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedProvider(null);
  };

  const openModalForCreate = () => {
    setFormData({
      name: "",
      lastname: "",
      surname: "",
      phoneNumber: "",
      email: "",
    });
    setIsEditing(false);
    setCurrentProviderId(null);
    setModalOpen(true);
  };

  const openModalForEdit = (provider) => {
    setFormData({
      name: provider.name,
      lastname: provider.lastname,
      surname: provider.surname,
      phoneNumber: provider.phoneNumber,
      email: provider.email,
    });
    setIsEditing(true);
    setCurrentProviderId(provider.id);
    setModalOpen(true);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const url = isEditing
      ? "http://localhost:8080/api/providers/update"
      : "http://localhost:8080/api/providers/save";

    const method = isEditing ? "PUT" : "POST";

    try {
      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(
          isEditing ? { id: currentProviderId, ...formData } : formData
        ),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Error en la solicitud");
      }

      const result = await response.json();

      Swal.fire({
        title: isEditing ? "¡Actualizado!" : "¡Creado!",
        text: isEditing
          ? "El proveedor ha sido actualizado correctamente."
          : "El proveedor ha sido creado correctamente.",
        icon: "success",
        confirmButtonText: "Aceptar",
      });

      setModalOpen(false);
      fetchProviders();
    } catch (error) {
      console.error("Error al guardar proveedor:", error);
      Swal.fire({
        title: "Error",
        text: error.message || "Ocurrió un error al procesar la solicitud",
        icon: "error",
        confirmButtonText: "Entendido",
      });
    }
  };

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: "¿Estás seguro?",
      text: "¡Esta acción eliminará al proveedor!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar",
    });

    if (result.isConfirmed) {
      try {
        const response = await fetch(
          `http://localhost:8080/api/providers/delete/${id}`,
          {
            method: "DELETE",
          }
        );

        if (response.ok) {
          Swal.fire(
            "Eliminado",
            "Proveedor eliminado correctamente.",
            "success"
          );
          fetchProviders();
        } else {
          const errorData = await response.json();
          throw new Error(
            errorData.message || "No se pudo eliminar el proveedor"
          );
        }
      } catch (error) {
        Swal.fire(
          "Error",
          error.message || "Fallo la conexión con el servidor.",
          "error"
        );
      }
    }
  };

  return (
   <div className="min-h-screen bg-gray-100 py-10 px-4">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-3xl font-bold text-center text-gray-800">
          Proveedores
        </h2>
        <button
          onClick={openModalForCreate}
          className="py-2 px-4 bg-blue-500 rounded-lg text-white hover:bg-blue-600"
        >
          Registrar proveedor
        </button>
      </div>

      <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead>
          <tr className="bg-gray-200">
            <th scope="col" class="px-6 py-3">
              Nombre
            </th>
            <th scope="col" class="px-6 py-3">
              Apellido paterno
            </th>
            <th scope="col" class="px-6 py-3">
              Apellido materno
            </th>
            <th scope="col" class="px-6 py-3">
              Teléfono
            </th>
            <th scope="col" class="px-6 py-3">
              Email
            </th>
            <th scope="col" class="px-6 py-3">
              Acciones
            </th>
          </tr>
        </thead>
        <tbody>
          {proveedores.map((prov) => (
            <tr key={prov.id} className="border-t">
              <td>{prov.name}</td>
              <td>{prov.lastname}</td>
              <td>{prov.surname}</td>
              <td>{prov.phoneNumber}</td>
              <td>{prov.email}</td>
              <td className="flex space-x-2">
                <button
                  onClick={() => {
                    handleView(prov.id);
                    setShowModal(true);
                  }}
                  className="p-2 text-blue-600 hover:text-blue-800 hover:bg-blue-100 rounded-full transition-colors duration-200"
                  title="Ver detalles"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="w-5 h-5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                    />
                  </svg>
                </button>

                <button
                  onClick={() => openModalForEdit(prov)}
                  className="p-2 text-green-600 hover:text-green-800 hover:bg-green-100 rounded-full transition-colors duration-200"
                  title="Editar"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="w-5 h-5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
                    />
                  </svg>
                </button>

                <button
                  onClick={() => handleDelete(prov.id)}
                  className="p-2 text-red-600 hover:text-red-800 hover:bg-red-100 rounded-full transition-colors duration-200"
                  title="Eliminar"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="w-5 h-5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                    />
                  </svg>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {showModal && selectedProvider && (
        <Modal
          isOpen={showModal}
          onClose={closeModal}
          title="Detalles del Proveedor"
        >
          <div className="space-y-2 text-gray-800">
            <p>
              <strong>Nombre:</strong> {selectedProvider.name}{" "}
              {selectedProvider.surname} {selectedProvider.lastname}
            </p>
            <p>
              <strong>Email:</strong> {selectedProvider.email}
            </p>
            <p>
              <strong>Teléfono:</strong> {selectedProvider.phoneNumber}
            </p>

            <h3 className="font-semibold mt-4">Autos registrados:</h3>
            {selectedProvider.cars && selectedProvider.cars.length > 0 ? (
              <ul className="list-disc list-inside">
                {selectedProvider.cars.map((car) => (
                  <li key={car.id}>
                    {car.brand} {car.model} - {car.plate}
                  </li>
                ))}
              </ul>
            ) : (
              <p>No tiene autos registrados.</p>
            )}
          </div>
        </Modal>
      )}

      {modalOpen && (
        <Modal
          isOpen={modalOpen}
          onClose={() => setModalOpen(false)}
          title={isEditing ? "Editar proveedor" : "Registrar proveedor"}
        >
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="text-gray-800">Nombre:</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full p-2 border rounded"
                required
              />
            </div>
            <div>
              <label className="text-gray-800">Apellido paterno:</label>
              <input
                type="text"
                name="lastname"
                value={formData.lastname}
                onChange={handleChange}
                className="w-full p-2 border rounded"
                required
              />
            </div>
            <div>
              <label className="text-gray-800">Apellido materno:</label>
              <input
                type="text"
                name="surname"
                value={formData.surname}
                onChange={handleChange}
                className="w-full p-2 border rounded"
                required
              />
            </div>
            <div>
              <label className="text-gray-800">Teléfono:</label>
              <input
                type="text"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleChange}
                className="w-full p-2 border rounded"
                required
              />
            </div>
            <div>
              <label className="text-gray-800">Correo electrónico:</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full p-2 border rounded"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
            >
              {isEditing ? "Actualizar" : "Guardar"}
            </button>
          </form>
        </Modal>
      )}
    </div>
  );
};
