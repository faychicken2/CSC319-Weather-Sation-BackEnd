import express from 'express'

import { WeatherStation } from './DB/db.js'
// importing the routes
import Client from './Routes/Client.js'
import Sensors from './Routes/Sensors.js'

const app = express();
const port = 5000;

let data = []


app.use(express.json())
let db = new WeatherStation();

/**
Format:
    {
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


app.use('/client', Client)

app.post('/data', (req, res) => {
    // array of sensors
    let sensors = db.sensors
    let keys = [
        "b704ecf8-e793-11eb-ba80-0242ac130004",
        "b704efc8-e793-11eb-ba80-0242ac130004",
        "b704f2fc-e793-11eb-ba80-0242ac130004",
        "b704f3ce-e793-11eb-ba80-0242ac130004",
        "b704f48c-e793-11eb-ba80-0242ac130004",
        "b704f842-e793-11eb-ba80-0242ac130004",
        "b704f914-e793-11eb-ba80-0242ac130004",
        "b704f9c8-e793-11eb-ba80-0242ac130004"
    ]

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
                    data.push(req.body[x])

                    console.log(x)

                    let senData = req.body[x].data
                    let stamp = req.body[x].time
                    try {
                        db.insertHumid(x, senData, stamp)
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





app.listen(port, () => {
    console.log(`server is running on PORT ${port}`)
})
