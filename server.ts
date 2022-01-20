import * as dotenv from 'dotenv'
import bodyParser from 'body-parser'
import express from 'express'
import cors from 'cors'
import api from './api'
import auth from './auth'
import path from 'path'

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

// Serve static files from the React frontend app
app.use(express.static(path.join(__dirname, 'client/build')))

// Anything that doesn't match the above, send back index.html
app.get('/*', (req: any, res: any) => {
  res.sendFile(path.join(__dirname + '/client/build/index.html'))
})

app.listen(port, () => {
  console.log(`Server listening on the port::${port}`)
})
