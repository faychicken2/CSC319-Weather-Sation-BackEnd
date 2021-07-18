import mysql from 'mysql';

var pool = mysql.createConnection({
  host: "192.168.0.125",
  database: "mydb",
  user: "WeatherStation"

});

pool.connect(function(err) {
  if (err) throw err;
  console.log("Connected to database!");
});

export default class WeatherStation {

    insertHumid = (table, data, timestamp) => {
        try {
            let sql = 'INSERT INTO ' + table + ' (data, TimeStamp) VALUES (' + data.toString() + ' ,' + ' "2021-07-17 01:01:37.5" ' + ')'
            // INSERT INTO humid (data, time) VALUES ("10","2021-07-17 01:01:37.5")
            return new Promise((resolve, reject) => {
                let test = table
                pool.query(sql, (err, result) => {
                    if (err) {reject(err)}
                    console.log("data posted to the db")
                    resolve(result)
                })
            })

        } catch (error) {
            console.log("error on insertHumid: ", error)
        }
    }
}

