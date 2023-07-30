import express, { json } from 'express'
import cors from 'cors';
import {pool} from './db.js'
import registroRoutes from './routes/registro.routes.js'
import estadoRoutes from './routes/estado.routes.js'
import habitacionesRoutes from './routes/habitaciones.routes.js'


const app = express()


app.use(cors());

app.get('/ping', async(req, res) => {
   const [result] = await pool.query('select 1+1 as result')
   res.json(result)
})


app.use(express.json())

app.use('/api',registroRoutes)
app.use('/api',estadoRoutes)
app.use('/api',habitacionesRoutes)



app.use((req,res, next) =>{
   res.status(404).json({
      message: 'Not found'
   })
})

export default app;
