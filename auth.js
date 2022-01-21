require('dotenv').config()
const express = require('express')
const spotifyWebApi = require('spotify-web-api-node')
const auth = express.Router()

const credentials = {
    clientId: process.env.SPOTIFY_CLIENT_ID,
    clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
    redirectUri: process.env.SPOTIFY_REDIRECT_URI,
}

auth.get('/login', (req, res) => {
    try {

        //  Get the "code" value posted from the client-side and get the user's accessToken from the spotify api     
        const code = req.query.code

        let spotifyApi = new spotifyWebApi(credentials)

        // Retrieve an access token
        spotifyApi.authorizationCodeGrant(code)
            .then((data) => {

                // Returning the User's AccessToken in the json formate  
                res.json({
                    access_token: data.body.access_token,
                    refresh_token: data.body.refresh_token,
                }) 
            })
            .catch((err) => {
                res.status(400).send(err)
            })
        
    }
    catch (err) {
        console.log(err)
    }
})

auth.get('/refresh_access_token', async (req, res) => {
    try {
        let refresh_token = req.query.refresh_token

        var spotifyApi = new spotifyWebApi(credentials)
        spotifyApi.setRefreshToken(refresh_token)
        
        let data = await spotifyApi.refreshAccessToken()

        res.json({
            access_token: data.body.access_token
        })
    }
    catch (err) {
        res.status(400).send('something went wrong')
    }
})

auth.get('/get_me', async (req, res) => {
    try {
        let access_token = req.query.access_token
        let spotifyApi = new spotifyWebApi(credentials)
        spotifyApi.setAccessToken(access_token)

        let data = await spotifyApi.getMe()
        res.json({ 
            me: data.body
        })
    }
    catch (err) {
        res.status(400).send('something went wrong')
    }
})

module.exports = auth