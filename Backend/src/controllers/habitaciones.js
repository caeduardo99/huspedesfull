import  { pool } from '../db.js'

export const getHabitaciones =  async (req, res) => {
    try{
        const [rows] = await pool.query('SELECT * FROM habitaciones');
        res.json(rows)
    } catch (error){
        return res.status(500).json({
            message: 'Algo salio mal'
        })
    }
}


export const updateHabitaciones = async (req,res) => {
    const {id_habitacion} = req.params
    const {id_estado} = req.body
   try{
    const [result] = await pool.query('UPDATE habitaciones SET id_estado = ? WHERE id_habitacion = ?', [id_estado,id_habitacion])

    
    
    if (result.affectedRows === 0) return res.status(404).json({
        message: 'No existe la habitacion'
    })

    const [rows] = await pool.query('SELECT * FROM habitaciones WHERE id_habitacion = ?', [id_habitacion])

    res.json(rows[0])
   }catch (error){
    return res.status(500).json({
        message: 'Algo salio mal'
    })
   }
}