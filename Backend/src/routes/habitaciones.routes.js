import { Router } from 'express';
import {getHabitaciones,updateHabitaciones} from '../controllers/habitaciones.js'

const router = Router()


 
router.get('/habitaciones',getHabitaciones)
 
router.put('/habitaciones/:id_habitacion',updateHabitaciones)
 




export default router