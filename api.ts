const express = require('express')
const api = express.Router()

api.get('/topartists', async (req: any, res: any) => {
    try {

        res.send('hi')
    }
    catch (err) {
        console.log(err)
    }
})

api.get('/topsongs', async (req: any, res: any) => {
    try {
        res.send('hi')
    }
    catch (err) {
        console.log(err)
    }
})

api.get('/topgenres', async (req: any, res: any) => {
    try {
        res.send('hi')
    }
    catch (err) {
        console.log(err)
    }
})

api.get('/topsubgenres:genre', async (req: any, res: any) => {
    try {
        res.send('hi')
    }
    catch (err) {
        console.log(err)
    }
})

api.get('/recommended:genreinfo', async (req: any, res: any) => {
    try {
        res.send('hi')
    }
    catch (err) {
        console.log(err)
    }
})

api.get('/queue:songinfo', async (req: any, res: any) => {
    try {
        res.send('hi')
    }
    catch (err) {
        console.log(err)
    }
})

module.exports = api