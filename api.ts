import spotifyWebApi from 'spotify-web-api-node'
import * as dotenv from 'dotenv'
const fetch = require('node-fetch')
const express = require('express')
const api = express.Router()
dotenv.config();

const credentials = {
    clientId: process.env.SPOTIFY_CLIENT_SECRET,
    clientSecret: process.env.SPOTIFY_CLIENT_ID,
    redirectUri: process.env.SPOTIFY_REDIRECT_URI,
}

api.get('/playlist_items', async (req: any, res: any) => {
    try {

        let access_token = req.query.access_token
        let playlist_id = req.query.playlist_id

        let spotifyApi = new spotifyWebApi(credentials)
        spotifyApi.setAccessToken(access_token)

        // get items in playlist and assign points for each genre 

        let more_items = true
        let playlist_items: any[] = []
        let offset = 0

        while (more_items === true) {
            
            let data = await spotifyApi.getPlaylistTracks(playlist_id, {
                offset: offset,
                limit: 50,
            })

            offset += data.body.items.length
            data.body.items.forEach((item: any) => {
                playlist_items.push(item)
            })
            if (data.body.next === null) { more_items = false }

        }

        res.json(playlist_items)

    }
    catch (err) {
        res.status(400).send(err)
    }
})

api.get('/discover', async (req: any, res: any) => {
    try {

        let access_token = req.query.access_token
        let seeds = req.query.seeds
        let feature_targets = JSON.parse(req.query.feature_targets)

        seeds = seeds.split(',')

        let spotifyApi = new spotifyWebApi(credentials)
        spotifyApi.setAccessToken(access_token)

        let feature_data: any = {
            limit: 50,
            seed_tracks: seeds,
            target_danceability: feature_targets.danceability,
            target_energy: feature_targets.energy,
            target_valence: feature_targets.valence,
            target_liveness: feature_targets.liveness,
            target_instrumentalness: feature_targets.instrumentalness,
            target_acousticness: feature_targets.acousticness,
            target_speechiness: feature_targets.speechiness,
        }

        if (feature_targets.popularity) {
            feature_data['target_popularity'] = feature_targets.popularity
        }

        let data = await spotifyApi.getRecommendations(feature_data)

        let recs: any = data.body.tracks.map((item: any) => {
            return {
                album: item.album,
                artists: item.artists.map((artist: any) => artist.name),
                id: item.id,
                name: item.name,
                uri: item.uri
            }
        })

        for (let i = 0; i < recs.length; i++) {
            let rec_artist = await spotifyApi.getArtist(data.body.tracks[i].artists[0].id)
            recs[i].genres = rec_artist.body.genres
        }

        res.json(recs)

    }
    catch (err) {
        res.status(400).send(err)
    }

})

api.get('/average_audio_features', async (req: any, res: any) => {
    try {

        let access_token = req.query.access_token
        let songs = req.query.songs

        let spotifyApi = new spotifyWebApi(credentials)
        spotifyApi.setAccessToken(access_token)

        songs = songs.split(',')

        let avg_features: any = {
            danceability: 0,
            energy: 0,
            valence: 0,
            liveness: 0,
            instrumentalness: 0,
            acousticness: 0,
            speechiness: 0,
        }

        let total = songs.length
        let processed = 0

        while (processed !== total) {

            let current_songs = songs.slice(processed, processed + 100)
            processed = processed + current_songs.length

            let data = await spotifyApi.getAudioFeaturesForTracks(current_songs)


            data.body.audio_features.forEach((item: any) => {
                avg_features.danceability += item.danceability
                avg_features.energy += item.energy
                avg_features.valence += item.valence
                avg_features.liveness += item.liveness
                avg_features.instrumentalness += item.instrumentalness
                avg_features.acousticness += item.acousticness
                avg_features.speechiness += item.speechiness
            })
            
        }

        // divide by number of inputs and round to desireable decimal place
        avg_features.danceability = Math.round(avg_features.danceability / songs.length * 10) / 10
        avg_features.energy = Math.round(avg_features.energy / songs.length * 10) / 10
        avg_features.valence = Math.round(avg_features.valence / songs.length * 10) / 10
        avg_features.liveness = Math.round(avg_features.liveness / songs.length * 10) / 10
        avg_features.instrumentalness = Math.round(avg_features.instrumentalness / songs.length * 10) / 10
        avg_features.acousticness = Math.round(avg_features.acousticness / songs.length * 10) / 10
        avg_features.speechiness = Math.round(avg_features.speechiness / songs.length * 10) / 10

        res.json(avg_features)

    }
    catch (err) {
        console.log(err)
        res.status(400).send(err)
    }
})

api.get('/user_playlists', async (req: any, res: any) => {
    try {

        let id = req.query.id
        let access_token = req.query.access_token
        let spotifyApi = new spotifyWebApi(credentials)
        spotifyApi.setAccessToken(access_token)

        let playlist_data: any[] = []
        let offset = 0
        let more_items = true

        while (more_items === true) {
            let data = await spotifyApi.getUserPlaylists(id, { limit : 50, offset: offset })
            offset += data.body.items.length
            playlist_data = playlist_data.concat(data.body.items)
            if (data.body.next === null) { more_items = false}
        }

        res.json(playlist_data)

    }
    catch (err) {
        res.status(400).send(err)
    }
})

// simple spotify api call
api.get('/queue_song', (req: any, res: any) => {
    try {

        let access_token = req.query.access_token
        let uri = req.query.uri

        let spotifyApi = new spotifyWebApi(credentials)
        spotifyApi.setAccessToken(access_token)

        spotifyApi.addToQueue(uri)
        .then((data: any) => {
            console.log('success: song added to queue')
        })
        .catch((err: any) => {
            console.log(err)
            res.status(400).send(err)
        })

    }
    catch (err) {
        console.log(err)
    }
})

// gets 50 top songs for user, basic spotify api call
api.get('/top_tracks', (req: any, res: any) => {
    try {

        let time_range = req.query.time_range
        let access_token = req.query.access_token

        var spotifyApi = new spotifyWebApi(credentials)
        spotifyApi.setAccessToken(access_token)

        spotifyApi.getMyTopTracks({ time_range: time_range, limit: 50 })
            .then((data: any) => {

                let top_tracks = data.body.items

                let filtered_top_tracks = top_tracks.map( (item: any) => {
                    return {
                        name: item.name,
                        artists: item.artists.map((artist: any) => artist.name),
                        image_url: item.album.images ? item.album.images[0].url : '', // not sure if its guaranteed all tracks/artists have image
                        id: item.id
                    }
                })

                res.json(filtered_top_tracks)

            })
            .catch((err: any) => {
                res.status(400).send(err)
            })

    }
    catch (err) {
        console.log(err)
    }
})

// gets 50 top artists for user, basic spotify api call
api.get('/top_artists', (req: any, res: any) => {
    try {

        let time_range = req.query.time_range
        let access_token = req.query.access_token

        var spotifyApi = new spotifyWebApi(credentials)
        spotifyApi.setAccessToken(access_token)

        spotifyApi.getMyTopArtists({ time_range: time_range, limit: 50 })
            .then((data: any) => {

                let top_artists = data.body.items

                let filtered_top_artists = top_artists.map( (item: any) => {
                    return {
                        name: item.name,
                        genres: item.genres,
                        image_url: item.images ? item.images[0].url : '' // not sure if its guaranteed all tracks/artists have image
                    }
                })

                res.json(filtered_top_artists)

            })
            .catch((err: any) => {
                res.status(400).send(err)
            })

    }
    catch (err) {
        console.log(err)
    }
})   

// find top artists, extrapolate genre data from that
api.get('/top_genres', (req: any, res: any) => {
    try {

        let time_range = req.query.time_range
        let access_token = req.query.access_token

        var spotifyApi = new spotifyWebApi(credentials)
        spotifyApi.setAccessToken(access_token)

        spotifyApi.getMyTopArtists({ time_range: time_range, limit: 50 })
            .then((data: any) => {

                let top_artists = data.body.items
                let genre_scores: { [key: string]: number; } = {}

                top_artists.forEach((item: any, i: number) => {
                    
                    item.genres.forEach((genre: string) => {
                        if (!genre_scores[genre]) genre_scores[genre] = 0
                        genre_scores[genre] += (50 - i)
                    })

                })

                let genre_array = Object.keys(genre_scores).map((key) => { return { 
                    name: key, 
                    score: genre_scores[key] 
                }})

                genre_array.sort((a, b) => (a.score < b.score) ? 1 : ((b.score < a.score) ? -1 : 0))

                // maybe remove genres spotify would consider parent genres

                res.json(genre_array)

            })
            .catch((err: any) => {
                res.status(400).send(err)
            })

    }
    catch (err) {
        console.log(err)
    }
})

module.exports = api