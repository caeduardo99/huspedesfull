export function validarCedula(cedula) {
    // Eliminar espacios en blanco y caracteres no numéricos
    const cedulaLimpia = cedula.replace(/\D/g, '');
  
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
  
//   // Ejemplo de uso:
//   const cedula = '0105885537';
//   const esValida = validarCedula(cedula);
//   console.log(esValida); // Debería imprimir true
  