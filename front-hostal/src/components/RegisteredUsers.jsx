import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import $ from 'jquery';
import 'datatables.net-bs4'; // Importa el estilo de Bootstrap 4 para DataTables

function RegisteredUsers() {
  const [registros, setRegistros] = useState([]);
  const tableRef = useRef(null);

  useEffect(() => {
    // Obtener los registros desde la API
    axios.get('http://localhost:8000/api/registros')
      .then((response) => {
        setRegistros(response.data);
      })
      .catch((error) => {
        console.error('Error al obtener datos de registros:', error);
      });
  }, []);

  useEffect(() => {
    // Inicializar DataTables en la tabla después de cargar los datos
    if (registros.length > 0 && tableRef.current && !$.fn.DataTable.isDataTable(tableRef.current)) {
      $(tableRef.current).DataTable({
        // Opciones para dar estilo de Bootstrap 4 a la paginación
        pagingType: 'full_numbers',
      });
    }
  }, [registros]);

  return (
    <div className="container">
      <h2 className="my-4">Huéspedes</h2>
      <table className="table" ref={tableRef}>
        <thead className="table-dark">
          <tr>
            <th>ID</th>
            <th>Nombres</th>
            <th>Identificación</th>
            <th>Habitación</th>
            <th>Ingreso</th>
            <th>Salida</th>
          </tr>
        </thead>
        <tbody>
          {registros.map((registro) => (
            <tr key={registro.id_registro}>
              <td>{registro.id_registro}</td>
              <td>{registro.nombres}</td>
              <td>{registro.identificacion}</td>
              <td>{registro.habitacion}</td>
              <td>{registro.ingreso}</td>
              <td>{registro.salida}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default RegisteredUsers;
