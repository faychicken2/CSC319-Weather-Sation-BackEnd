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

// CreateNewTicket = (reqTicket) => {
//     //
//     //creating new promise
//     try {
//         return new Promise((resolve, reject) => {
//             // creating the query from the db
//             pool.query(`INSERT INTO ticket (FK_Ticket_SLA, FK_Ticket_Priority, FK_Emplyee, FK_Ticket_Status, FK_Client_Location, Issue_Summary, Created) VALUES (?,?,?,?, ?,?,?)`, [reqTicket.slaFK, reqTicket.priorityFK, reqTicket.employeeFK, reqTicket.slaFK, reqTicket.locationsFK, reqTicket.issueSummary, new Date()], (err, result) => {
//                 if (err) { 
//                     reject (err)
//                     console.log("Error: ", err)
//                 }
//                 return resolve(result);
//             })
//         });
//     } catch (error) {
//         console.error(error)
//     }
// }