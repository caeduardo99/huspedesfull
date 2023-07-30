import { Router } from 'express';
import {getRegistro,createRegistro} from '../controllers/registro.js'

const router = Router()


 
router.get('/registros',getRegistro)
 
router.put('/registros',createRegistro)
 




export default router