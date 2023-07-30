import { Router } from 'express';
import {getEstado} from '../controllers/estado.js'

const router = Router()


 
router.get('/estados',getEstado)
 


export default router