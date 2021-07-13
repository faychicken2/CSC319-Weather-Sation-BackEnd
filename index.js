import express from 'express'

const app = express();
const port = 5000;

let data = [
    {
        "temp": "65",
        "time": "7:30"
    },
    {
        "temp": "75",
        "time": "8:30"
    },
    {
        "temp": "85",
        "time": "9:30"
    },
]


app.use(express.json())

app.get('/', (req, res) => {
    res.json(data)
})

app.get('/temp', (req, res) => {
    res.json(data)
})

app.get('/humid', (req, res) => {
    res.json(data)
})

app.post('/', (req, res) => {
    let postedData = req.body
    data.push(postedData)
    console.log("POSTED", postedData)
    res.json(postedData)
})

app.post('/temp', (req, res) => {
    let postedData = req.body
    data.push(postedData)
    console.log("POSTED", postedData)
    res.json(postedData)
})

app.post('/humid', (req, res) => {
    let postedData = req.body
    data.push(postedData)
    console.log("POSTED", postedData)
    res.json(postedData)
})




app.listen(port, () => {
console.log(`server is running on PORT ${port}`)
})