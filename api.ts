const express = require('express')
const api = express.Router()

api.get('/topartists/:access_token/:time_range', async (req: any, res: any) => {
    try {

        let data = await fetch('https://api.spotify.com/v1/me/top/artists', {
            method: 'GET',
            headers: {
                Authorization: 'Bearer ' + req.query.access_token
            },
            body: JSON.stringify({
                time_range: 'long_term',
                limit: 50
            })
        })
        .then((res) => {
            return res.json()
        })
        .then((data) => {
            return data.items
        })

        res.send(data)

    }
    catch (err) {
        console.log(err)
    }
})

api.get('/topsongs', async (req: any, res: any) => {
    try {
        let data = await fetch('https://api.spotify.com/v1/me/top/tracks', {
            method: 'GET',
            headers: {
                Authorization: 'Bearer ' + req.query.access_token
            },
            body: JSON.stringify({
                time_range: 'long_term',
                limit: 50
            })
        })
        .then((res) => {
            return res.json()
        })
        .then((data) => {
            return data.items
        })

        res.send(data)
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

api.get('/topsubgenres/:genre', async (req: any, res: any) => {
    try {
        res.send('hi')
    }
    catch (err) {
        console.log(err)
    }
})

api.get('/recommended/:genreinfo', async (req: any, res: any) => {
    try {
        res.send('hi')
    }
    catch (err) {
        console.log(err)
    }
})

api.get('/queue/:songinfo', async (req: any, res: any) => {
    try {
        res.send('hi')
    }
    catch (err) {
        console.log(err)
    }
})

module.exports = api