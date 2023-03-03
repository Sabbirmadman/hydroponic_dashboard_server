//express
const express = require("express");
const app = express();
const port = 8000;
const mysql = require("mysql");
var cors = require("cors");

//body-parser
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});

//connect to database
const pool = mysql.createPool({
    connectionLimit: 10,
    host: "localhost",
    user: "root",
    password: "",
    database: "hydroponic",
});

app.get("/api/get", (req, res) => {
    console.log("get request");
    //get only the first row
    pool.query(
        "SELECT * FROM hydroponic_table ORDER BY Time ASC LIMIT 1",
        (err, rows) => {
            if (err) throw err;
            console.log("Data received from Db:\n", rows);
            res.send(rows);
        }
    );
});
