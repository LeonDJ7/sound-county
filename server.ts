import * as dotenv from "dotenv";
const express = require('express')
const cors = require('cors')
const api = require('./api')
const auth = require('./auth')

dotenv.config({ path: __dirname+'/.env' });
const app = express()
const port = process.env.PORT || 3000

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
