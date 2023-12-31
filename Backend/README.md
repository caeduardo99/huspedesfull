# Backend del Proyecto de Registro de Huéspedes

Este es el backend del proyecto de Registro de Huéspedes. El backend está desarrollado utilizando Node.js, Express.js y MySQL para manejar las solicitudes HTTP y almacenar los datos de los huéspedes y las habitaciones.

## Instalación

1. Navega a la carpeta backend en la raíz del proyecto.
3. Ejecuta el siguiente comando para instalar las dependencias necesarias:

```bash
npm install
```

## Variables de Entorno
Este repositorio se utlizo variables de entorno para la conexion a mysql, crear un archivo .env
```bash
DB_HOST=localhost
DB_USER=usuario
DB_PORT=puerto
DB_PASSWORD=tcontraseña
DB_NAME=base
```

## Endpoints
```bash
GET /api/habitaciones: Obtiene la lista de habitaciones disponibles y ocupadas.
GET /api/estados: Obtiene la lista de estados disponibles y ocupadas.
GET&POST /api/registros: Registra un nuevo huésped y asigna una habitación disponible.
PUT /api/habitaciones/:id: Actualiza el estado de una habitación.
```
## Iniciar el servidor
```bash
npm run dev
```

La aplicación frontend estará disponible en http://localhost:8000

