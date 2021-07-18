import express from 'express'

import WeatherStation from './db.js'

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

app.get('/data', (req, res) => {
    res.json(data)
})

app.post('/data', (req, res) => {
        // array of sensors
        let sensors = ["humid", "temp", "bmp"]


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

        // console.log(req.body.temp)
        res.sendStatus(200)
    })




app.listen(port, () => {
    console.log(`server is running on PORT ${port}`)
})
