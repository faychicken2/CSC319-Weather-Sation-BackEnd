import express from 'express'
import { WeatherStation } from '../DB/db.js'

const router = express.Router();

let db = new WeatherStation()

 //TODO:
 // res data by what is requested in body
 // if temp and humid is in the body return everything in the table
 // if temp is in body then just return everything in the table
router.get('/data', async (req, res) => {
    try {
        let data = await db.getData("temp")
        res.json(data)
    } catch (error) {
        console.log("error while getting data: ", error)
        res.sendStatus(500)
    }

})

export default router