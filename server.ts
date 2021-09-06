import * as dotenv from "dotenv";
var bodyParser = require('body-parser')
const express = require('express')
const cors = require('cors')
const api = require('./api')
const auth = require('./auth')
dotenv.config();

const app = express()
const port = process.env.PORT || 4000

app.use(cors())
app.use(express.json())

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))

// parse application/json
app.use(bodyParser.json())

app.use('/api', api)
app.use('/auth', auth)

app.get('/', function (req: any, res: any) {
  console.log('hi')
});

app.listen(port, () => {
  console.log(`Server listening on the port::${port}`)
})
