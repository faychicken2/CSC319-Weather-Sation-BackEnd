import express from 'express'
import { WeatherStation } from '../DB/db.js'

const router = express.Router();

let db = new WeatherStation()

 //TODO:
 // return data by what is requested in body
 // if temp and humid is in the body return everything in the tables temp and humid
 // if temp is in body then just return everything in the table temp
router.get('/data', async (req, res) => {
    try {
        let data = await db.getData("temp")
        console.log("data: ", data)
        res.json(data)
    } catch (error) {
        // change error code 500 to a better fitting code
        console.log("error while getting data: ", error)
        res.sendStatus(500)
    }

})

//TODO: FIX THIS
router.get('/data/today', async (req, res) => {
    // res.send("hello")
    res.json(await db.getToday("b704ecf8-e793-11eb-ba80-0242ac130004", "humid"))
})

router.get('/data/:start/:end', (req, res) => {
    res.send(req.params.start + " " + req.params.end)
})

export default router