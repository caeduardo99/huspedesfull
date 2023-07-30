import  { pool } from '../db.js'


// OBETENER TODO LOS REGISTROS
export const getRegistro =  async (req, res) => {
    try{
        const [rows] = await pool.query('SELECT * FROM registro');
        res.json(rows)
    } catch (error){
        return res.status(500).json({
            message: 'Algo salio mal'
        })
    }
}

export const createRegistro =  async (req, res) => {
    try{
        const {nombres, identificacion, habitacion, ingreso, salida} = req.body
        const [rows] = await pool.query('INSERT INTO registro (nombres, identificacion, habitacion, ingreso, salida) VALUES (?,?,?,?,?)', [nombres, identificacion, habitacion, ingreso, salida])
        res.send({
            id: rows.insertId,
            nombres, 
            identificacion, 
            habitacion, 
            ingreso, 
            salida,
        })
    } catch (error){
        return res.status(500).json({
            message: 'Algo salio mal'
        })
    }
}
