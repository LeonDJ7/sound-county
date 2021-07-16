const express = require('express')
import mongoose from 'mongoose'
import { User } from './models/User';
const auth = express.Router()

auth.get('/log_in', (req: any, res: any) => {
    try {
        var scopes = 'user-read-private user-read-email';
        res.redirect('https://accounts.spotify.com/authorize' +
        '?response_type=code' +
        '&client_id=' +  process.env.SPOTIFY_CLIENT_ID +
        (scopes ? '&scope=' + encodeURIComponent(scopes) : '') +
        '&redirect_uri=' + encodeURIComponent(process.env.SPOTIFY_REDIRECT_URI as string));
    }
    catch (err) {
        console.log(err)
    }
})

auth.get('/log_in_callback', (req: any, res: any) => {
    try {

        let code = req.query.code
        let state = req.query.state

        fetch('https://accounts.spotify.com/api/token', {
            method: 'POST',
            headers: {
                //'Content-Type': 'application/json',
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: JSON.stringify({
                grant_type: 'authorization_code',
                code: code,
                redirect_uri: process.env.SPOTIFY_REDIRECT_URI,
                client_id: process.env.CLIENT_ID,
                client_secret: process.env.CLIENT_SECRET,
            })
        })
        .then((res: any) => {
            return res.json()
        })
        .then((data: any) => {

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

                let options = {
                    upsert: true,
                    overwrite: true
                }
    
                await User.findOneAndUpdate({ email: user_data.email }, new_user, options)
                res.send(new_user)
            })
        })
        
    }
    catch (err) {
        console.log(err)
    }
})

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