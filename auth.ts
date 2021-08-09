const express = require('express')
import mongoose from 'mongoose'
import spotifyWebApi from "spotify-web-api-node";
import { User } from './models/User';
const auth = express.Router()

const credentials = {
    clientId: process.env.CLIENT_SECRET,
    clientSecret: process.env.CLIENT_ID,
    redirectUri: process.env.SPOTIFY_REDIRECT_URI,
}

let spotifyApi = new spotifyWebApi(credentials)

auth.get('/login', (req: any, res: any) => {
    try {

        //  Get the "code" value posted from the client-side and get the user's accessToken from the spotify api     
        const code = req.body.code

        // Retrieve an access token
        spotifyApi.authorizationCodeGrant(code).then((data: any) => {

            // Returning the User's AccessToken in the json formate  
            res.json({
                access_token: data.body.access_token,
                refresh_token: data.body.refresh_token,
                expires_in: data.body.refresh_token
            }) 
        })
        .catch((err: any) => {
            console.log(err);
            res.sendStatus(400)
        })

        
        
    }
    catch (err) {
        console.log(err)
    }
})

/*
        fetch('https://api.spotify.com/v1/me', {
            headers: {
                'Authorization': 'Bearer ' + data.access_token
            }
        })
        .then((res) => {
            return res.json
        })
        .then( async (user_data: any) => {

            let new_user = new User({
                email: user_data.email,
                username: user_data.display_name,
                image: user_data.images[0].url,
                access_token: data.access_token,
                refresh_token: data.refresh_token
            })

            console.log(new_user)

            let options = {
                upsert: true,
                overwrite: true
            }

            await User.findOneAndUpdate({ email: user_data.email }, new_user, options)
            res.json(new_user)
        })
        */

auth.get('/new_access_token/:refresh_token/:email', (req: any, res: any) => {
    try {

        let email = req.query.email
        let refresh_token = req.query.refresh_token

        fetch('https://accounts.spotify.com/api/token', {
            method: 'POST',
            headers: {
                //'Content-Type': 'application/json',
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: JSON.stringify({
                grant_type: 'refresh_token',
                refresh_token: refresh_token,
                client_id: process.env.CLIENT_ID,
                client_secret: process.env.CLIENT_SECRET,
            })
        })
        .then((res: any) => {
            return res.json()
        })
        .then( async (data: any) => {

            let options = {
                upsert: true,
            }

            await User.findOneAndUpdate({ email: email }, { refresh_token: refresh_token }, options)
            res.send('success: new refresh_token acquired')

        })
        
    }
    catch (err) {
        console.log(err)
    }
})

module.exports = auth