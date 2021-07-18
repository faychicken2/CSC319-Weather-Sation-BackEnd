import express from 'express'
import { WeatherStation } from '../DB/db.js'

const router = express.Router();

let db = new WeatherStation()

router.post('/data', (req, res) => {
    // array of sensors
    let sensors = db.sensors
    let keys = db.keys
    
    let driver = false
    // console.log(req.body.key)
    for (let key in keys) {
        if (req.body.key == keys[key]) {
            console.log("key is accepted")
            driver = true
        }
    }
    
    
    /*
    FORMAT:
    {
        "key": "b704ecf8-e793-11eb-ba80-0242ac130004",
        
        "humid": {
            "data": 25,
            "time": "time"
        },
        
        "temp": {
            "data": 85,
            "time": "time"
        }
        
    }
    */
   
   if (driver == true) {
       // going through the posted data (body)
       for (let x in req.body) {
            // checking in the sensor data in the body
            for (let i in sensors) {

                // if the 
                if (x == sensors[i]) {
                    console.log(x)

                    let senData = req.body[x].data
                    let stamp = req.body[x].time
                    try {
                        db.insertData(x, senData, stamp)
                    } catch (error) {
                        res.sendStatus(500)
                        console.log("error on post: ", error)
                    }
                }
            }
        }
    }

    // console.log(req.body.temp)
    res.sendStatus(200)
})

export default router
