import express from 'express'
import { WeatherStation } from '../DB/db.js'

const router = express.Router();

let db = new WeatherStation()

router.post('/data', (req, res) => {
     // array of sensors
     let sensors = ["humid", "temp", "bmp"]
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
 
export default router
