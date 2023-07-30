import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Rooms = () => {
  const [habitacionesData, setHabitacionesData] = useState([]);

  useEffect(() => {
    // Obtener los datos de habitaciones desde la API
    axios.get('http://localhost:8000/api/habitaciones')
      .then((response) => {
        setHabitacionesData(response.data);
      })
      .catch((error) => {
        console.error('Error al obtener datos de habitaciones:', error);
      });
  }, []);

  const handleDesocupar = (idHabitacion) => {
    // Enviar solicitud para desocupar la habitación
    axios.put(`http://localhost:8000/api/habitaciones/${idHabitacion}`, { id_estado: 1 })
      .then((response) => {
        // Actualizar la lista de habitaciones después de desocupar
        setHabitacionesData((prevData) =>
          prevData.map((habitacion) =>
            habitacion.id_habitacion === idHabitacion
              ? { ...habitacion, id_estado: 1 }
              : habitacion
          )
        );
        console.log('Habitación desocupada con éxito.');
      })
      .catch((error) => {
        console.error('Error al desocupar la habitación:', error);
      });
  };

  return (
    <div>
      <h2>Lista de Habitaciones</h2>
      <table className="table">
        <thead>
          <tr>
            <th>Número de Habitación</th>
            <th>Estado</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {habitacionesData.map((habitacion) => (
            <tr key={habitacion.id_habitacion}>
              <td>{habitacion.num_habitacion}</td>
              <td>{habitacion.id_estado === 1 ? 'Disponible' : 'Ocupada'}</td>
              <td>
                {habitacion.id_estado === 2 && ( // Mostrar botón de desocupar solo si está ocupada
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => handleDesocupar(habitacion.id_habitacion)}
                  >
                    Desocupar
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Rooms;
