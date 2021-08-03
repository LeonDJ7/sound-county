import { Message } from './models/Message';
const express = require('express')
const api = express.Router()

// gets 50 top artists for user, basic spotify api call
api.get('/top_artists/:access_token/:time_range', (req: any, res: any) => {
    try {

        let time_range = req.query.time_range
        let access_token = req.query.access_token

        res.send(fetch(`https://api.spotify.com/v1/me/top/artists?time_range=${time_range}&limit=50`, {
            method: 'GET',
            headers: {
                Authorization: 'Bearer ' + access_token
            },
        })
        .then((res) => {
            return res.json()
        })
        .then((data) => {
            return data.items.map( (item: any) => {
                return {
                    name: item.name,
                    genres: item.genres,
                    image_url: item.images ? item.images[0].url : '' // not sure if its guaranteed all tracks/artists have image
                }
            })
        }))

    }
    catch (err) {
        console.log(err)
    }
})

// gets 50 top songs for user, basic spotify api call
api.get('/top_songs/:access_token/:time_range', (req: any, res: any) => {
    try {

        let time_range = req.query.time_range
        let access_token = req.query.access_token

        res.send(fetch(`https://api.spotify.com/v1/me/top/tracks?time_range=${time_range}&limit=50`, {
            method: 'GET',
            headers: {
                Authorization: 'Bearer ' + access_token
            },
        })
        .then((res) => {
            return res.json()
        })
        .then((data) => {
            return data.items.map((item: any) => {
                return {
                    name: item.name,
                    artists: item.artists,
                    genres: item.genres,
                    href: item.href,
                    image_url: item.images ? item.images[0].url : ''
                }
            })
        }))

    }
    catch (err) {
        console.log(err)
    }
})      

// find top songs, extrapolate genre data from that
api.get('/top_genres/:access_token/:time_range', (req: any, res: any) => {
    try {

        let time_range = req.query.time_range
        let access_token = req.query.access_token

        res.send(fetch(`https://api.spotify.com/v1/me/top/tracks?time_range=${time_range}&limit=50`, {
            method: 'GET',
            headers: {
                Authorization: 'Bearer ' + access_token
            },
        })
        .then((res) => {
            return res.json()
        })
        .then((data) => {

            let genre_scores: { [key: string]: number; } = {}

            data.items.forEach((item: any, i: number) => {
                
                item.genres.forEach((genre: string) => {
                    genre_scores[genre] += (50 - i)
                })

            })

            return genre_scores
        }))

    }
    catch (err) {
        console.log(err)
    }
})      

// get newly released albums and recommend ones similar in taste to user

// ummmmmmm... this gonna take the most work ill think about it later. lowkey gotta make sure its possible tho. otherwise i aint makin this thing
api.get('/recommended/:genre_info', (req: any, res: any) => {
    try {
        res.send('hi')
    }
    catch (err) {
        console.log(err)
    }
})

// simple spotify api call
api.get('/queue/:uri', (req: any, res: any) => {
    try {

        let uri = req.query.uri

        fetch('https://api.spotify.com/v1/me/player/queue', {
            method: 'POST',
            headers: {
                Authorization: 'Bearer ' + req.query.access_token
            },
            body: JSON.stringify({
                uri: uri
            })
        })
        .then(() => {
            res.send('success: song added to queue')
        })

    }
    catch (err) {
        console.log(err)
    }
})

// simple spotify api call
api.post('/contact', (req: any, res: any) => {
    try {

        const message = new Message()
        message.content = req.body.content
        message.save()

        res.send('success: message saved')

    }
    catch (err) {
        console.log(err)
    }
})

module.exports = api