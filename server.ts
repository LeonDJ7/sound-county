import * as dotenv from "dotenv";
import mongoose from 'mongoose'
const express = require('express')
const cors = require('cors')
const api = require('./api')
const auth = require('./auth')

dotenv.config({ path: __dirname+'/.env' });
const app = express()
const port = process.env.PORT || 3000

mongoose.connect(process.env.MONGODB_CONNECTION_URL as string, {useNewUrlParser: true, useUnifiedTopology: true});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('we r connected!')
});

app.use(cors())
app.use(express.json())
app.use(express.static(process.cwd() + "/client/public"))
app.use('/api', api)
app.use('/auth', auth)

app.get('/*', (req: any, res: any) => {
  res.sendFile(process.cwd() + "/client/public/index.html")
})

app.listen(port, () => {
  console.log(`Server listening on the port::${port}`)
})
