import  { pool } from '../db.js'

export const getEstado =  async (req, res) => {
    try{
        const [rows] = await pool.query('SELECT * FROM estado');
        res.json(rows)
    } catch (error){
        return res.status(500).json({
            message: 'Algo salio mal'
        })
    }
}