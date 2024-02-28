require('dotenv').config();

const express = require("express")
const cors = require("cors")
const DBconnect = require("./src/config/database")
const bodyParser = require("body-parser")


DBconnect()

const app = express()
app.use(express.json());
app.use(cors())

// create application/json parser
app.use(bodyParser.json());
//  parse various different custom JSON types as JSON
app.use(bodyParser.json({ type: 'application/*+json' }));
// parse some custom thing into a Buffer
app.use(bodyParser.raw({ type: 'application/vnd.custom-type' }));
// parse an HTML body into a string
app.use(bodyParser.text({ type: 'text/html' }));
// parse an text body into a string
app.use(bodyParser.text({ type: 'text/plain' }));
// create application/x-www-form-urlencoded parser
app.use(bodyParser.urlencoded({ extended: false }));


app.get("/", (req, res) => {
    res.json("Welcome to the POS Backend")
})

const responseHandler = require('./src/MiddleWares/responseHandler')
app.use('/', responseHandler)

app.listen(process.env.PORT, () => {
    console.log(`Server Started Successfully ${process.env.PORT}`)
})

/* Admin Url Path */
const Admin = require("./src/Routes/wpsAdmin")
app.use("/wpsadmin", Admin)
