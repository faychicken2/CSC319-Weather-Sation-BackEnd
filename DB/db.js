import mysql from 'mysql';

var pool = mysql.createConnection({
    host: "192.168.0.125",
    database: "mydb",
    user: "WeatherStation"

});

pool.connect(function (err) {
    if (err) throw err;
    console.log("Connected to database!");
});

export class WeatherStation {

    constructor(sensors, keys) {
    
        this.sensors = ["humid", "temp", "bmp"] // the sensors that we accept
        this.keys = [
            "b704ecf8-e793-11eb-ba80-0242ac130004",
            "b704efc8-e793-11eb-ba80-0242ac130004",
            "b704f2fc-e793-11eb-ba80-0242ac130004",
            "b704f3ce-e793-11eb-ba80-0242ac130004",
            "b704f48c-e793-11eb-ba80-0242ac130004",
            "b704f842-e793-11eb-ba80-0242ac130004",
            "b704f914-e793-11eb-ba80-0242ac130004",
            "b704f9c8-e793-11eb-ba80-0242ac130004"
        ]
     }

    insertData = (table, data, timestamp) => {
        try {
            let sql = 'INSERT INTO ' + table + ' (data, TimeStamp) VALUES (' + data.toString() + ' ,' + ' "2021-07-17 01:01:37.5" ' + ')'
            // INSERT INTO humid (data, time) VALUES ("10","2021-07-17 01:01:37.5")
            return new Promise((resolve, reject) => {
                let test = table
                pool.query(sql, (err, result) => {
                    if (err) { reject(err) }
                    console.log("data posted to the db\n", result)
                    resolve(result)
                })
            })

        } catch (error) {
            console.log("error on insert Humid: ", error)
        }
    }

    getData = (table) => {
        
        let driver = false
        try {
            return new Promise((resolve, reject) => {

                for (let x in this.sensors) {

                    // TODO: check to see in table is in the sensors
                    // if it is then SELECT data from that table
                    // else if table isnt in sensors then reject the promise
                    if (table == this.sensors[x]) {
                        pool.query(`SELECT * FROM ${table}`, (err, result) => {
                            if (err) { reject(err) }
                            resolve(result)
                        })
                    }
                    else if (this.sensors.length == x) {
                        reject(500)
                    }

                }

            })

        } catch (error) {
            console.log("Error at getData: ", error)
        }
    }
}

