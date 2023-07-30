import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2'; // Importar SweetAlert2

// Función para validar la cédula de Ecuador
function validarCedula(cedula) {
  // Eliminar espacios en blanco y caracteres no numéricos
  const cedulaLimpia = cedula.replace(/\D/g, "");

  // Verificar si la cédula tiene exactamente 10 dígitos
  if (cedulaLimpia.length !== 10) {
    return false;
  }

  // Verificar que todos los caracteres sean dígitos
  if (!/^\d+$/.test(cedulaLimpia)) {
    return false;
  }

  // Validar el dígito verificador de la cédula
  const provincia = parseInt(cedulaLimpia.substr(0, 2), 10);
  if (provincia < 1 || provincia > 24) {
    return false;
  }

  const coeficientes = [2, 1, 2, 1, 2, 1, 2, 1, 2];
  let suma = 0;

  for (let i = 0; i < 9; i++) {
    let valor = parseInt(cedulaLimpia.charAt(i), 10) * coeficientes[i];

    if (valor >= 10) {
      valor -= 9;
    }

    suma += valor;
  }

  const digitoVerificadorCalculado = 10 - (suma % 10);
  const digitoVerificador = parseInt(cedulaLimpia.charAt(9), 10);

  return digitoVerificador === digitoVerificadorCalculado;
}

function RegisterForm() {
  const [nombres, setNombres] = useState('');
  const [identificacion, setIdentificacion] = useState('');
  const [habitacion, setHabitacion] = useState('');
  const [ingreso, setIngreso] = useState('');
  const [salida, setSalida] = useState('');
  const [cedulaValida, setCedulaValida] = useState(true);

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

  const handleCedulaChange = (e) => {
    const cedula = e.target.value;
    setIdentificacion(cedula);
    setCedulaValida(validarCedula(cedula));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = {
      nombres,
      identificacion,
      habitacion,
      ingreso,
      salida,
    };

    axios.post('http://localhost:8000/api/registros', formData)
      .then((response) => {
        console.log('Registro exitoso:', response.data);

        Swal.fire({
          icon: 'success',
          title: 'Registro Exitoso',
          text: 'El huésped ha sido registrado correctamente.',
        });

        axios.put(`http://localhost:8000/api/habitaciones/${habitacion}`, { id_estado: 2 })
          .then(() => {
            console.log(`Habitación ${habitacion} marcada como ocupada.`);
            axios.get('http://localhost:8000/api/habitaciones')
              .then((response) => {
                setHabitacionesData(response.data);
              })
              .catch((error) => {
                console.error('Error al obtener datos de habitaciones:', error);
              });
          })
          .catch((error) => {
            console.error('Error al actualizar estado de habitación:', error);
          });
      })
      .catch((error) => {
        console.error('Error al registrar:', error);
      });

    setNombres('');
    setIdentificacion('');
    setHabitacion('');
    setIngreso('');
    setSalida('');
  };

  return (
    <div className="container">
      <h2 className="my-4">Formulario de Registro de Huéspedes</h2>
      <form onSubmit={handleSubmit} className="p-3 border rounded">
        <div className="row">
          <div className="col-md-6">
            <div className="mb-3">
              <label htmlFor="nombres" className="form-label">Nombres</label>
              <input type="text" className="form-control" id="nombres" value={nombres} onChange={(e) => setNombres(e.target.value)} required />
            </div>
            <div className="mb-3">
              <label htmlFor="identificacion" className="form-label">Identificación</label>
              <input
                type="text"
                className={`form-control ${cedulaValida ? '' : 'is-invalid'}`}
                id="identificacion"
                value={identificacion}
                onChange={handleCedulaChange}
                required
              />
              {!cedulaValida && (
                <div className="invalid-feedback">Cédula inválida</div>
              )}
            </div>
            <div className="mb-3">
              <label htmlFor="habitacion" className="form-label">Habitación</label>
              <select className="form-control" id="habitacion" value={habitacion} onChange={(e) => setHabitacion(e.target.value)} required>
                <option value="">Seleccionar habitación</option>
                {habitacionesData.map((habitacion) => (
                  <option key={habitacion.id_habitacion} value={habitacion.id_habitacion} disabled={habitacion.id_estado !== 1}>
                    {habitacion.num_habitacion} - {habitacion.id_estado === 1 ? 'Disponible' : 'Ocupada'}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="col-md-6">
            <div className="mb-3">
              <label htmlFor="ingreso" className="form-label">Fecha de Ingreso</label>
              <input type="datetime-local" className="form-control" id="ingreso" value={ingreso} onChange={(e) => setIngreso(e.target.value)} required />
            </div>
            <div className="mb-3">
              <label htmlFor="salida" className="form-label">Fecha de Salida</label>
              <input type="datetime-local" className="form-control" id="salida" value={salida} onChange={(e) => setSalida(e.target.value)} required />
            </div>
            <button type="submit" className="btn btn-primary">Registrar</button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default RegisterForm;
