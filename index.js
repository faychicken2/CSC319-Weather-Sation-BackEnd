import express from 'express'

// importing the routes
import Client from './Routes/Client.js'
import Sensors from './Routes/Sensors.js'

const app = express();
const PORT = 5000;
const OPEN = "0.0.0.0";
const IP = "25.17.103.240"


app.use(express.json())

// router
app.use('/client', Client)
app.use('/sensor', Sensors)

// start the server

app.listen(PORT, OPEN, () => console.log(`\n\nserver is running on http://${OPEN}:${PORT}`)); // listening on PORT 