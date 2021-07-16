import { Message } from './models/Message';
const express = require('express')
const api = express.Router()

// basically looping through recently played data, fetching 50 records at a time. Not sure if this is realistic but if it is then we can show users how many plays they have for their top songs and artists
api.get('/history/:access_token', async (req: any, res: any) => {
    let all_songs_read = false
    let before_timestamp = Date.now()

    while (all_songs_read === false) {

        await fetch(`https://api.spotify.com/v1/me/player/recently-played?before=${before_timestamp}&limit=50`, {
            method: 'GET',
            headers: {
                Authorization: 'Bearer ' + req.query.access_token
            }
        })
        .then((res) => {
            return res.json()
        })
        .then((data) => {

            if (data.items.length < 50) {
                all_songs_read = true
            }

            before_timestamp = data.cursors.before
            
            return data.items.map((track: any, played_at: string) => {
                return {
                    artists: track.artists.map((name: string) => name),
                    song: track.name,
                    uri: track.uri,
                    played_at: played_at
                }
            })

        })

    }
})

// gets name of 50 top artists for user, basic spotify api call
api.get('/top_artists/:access_token/:time_range', (req: any, res: any) => {
    try {

        let time_range = req.query.time_range
        let access_token = req.query.access_token

        fetch(`https://api.spotify.com/v1/me/top/artists?time_range=${time_range}&limit=50`, {
            method: 'GET',
            headers: {
                Authorization: 'Bearer ' + access_token
            },
        })
        .then((res) => {
            return res.json()
        })
        .then((data) => {
            return data.items.map((name: string, genres: string[], href: string, images: any) => {
                return {
                    artist: name,
                    genres: genres,
                    href: href,
                    image_url: images ? images[0].url : '' // not sure if its guaranteed all tracks/artists have image
                }
            })
        })

    }
    catch (err) {
        console.log(err)
    }
})

// gets name of 50 top songs for user, basic spotify api call
api.get('/top_songs/:access_token/:time_range', (req: any, res: any) => {
    try {

        let time_range = req.query.time_range
        let access_token = req.query.access_token

        fetch(`https://api.spotify.com/v1/me/top/tracks?time_range=${time_range}&limit=50`, {
            method: 'GET',
            headers: {
                Authorization: 'Bearer ' + access_token
            },
        })
        .then((res) => {
            return res.json()
        })
        .then((data) => {
            return data.items.map((name: string, genres: string[], href: string, images: any) => {
                return {
                    song: name,
                    genres: genres,
                    href: href,
                    image_url: images ? images[0].url : ''
                }
            })
        })

    }
    catch (err) {
        console.log(err)
    }
})      

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