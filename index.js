import express from 'express'

// importing the routes
import Client from './Routes/Client.js'
import Sensors from './Routes/Sensors.js'

const app = express();
const port = 5000;

app.use(express.json())


app.use('/client', Client)
app.use('/sensor', Sensors)


app.listen(port, () => {
    console.log(`server is running on PORT ${port}`)
})
