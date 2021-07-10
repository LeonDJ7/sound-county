//const express = require('express')
import mongoose from 'mongoose'
import { User } from './models/User';
const auth = express.Router()

auth.get('/login', async (req: any, res: any) => {
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

auth.get('/login_callback', async (req: any, res: any) => {
    try {

        let code = req.query.code
        let state = req.query.state

        await fetch('https://accounts.spotify.com/api/token', {
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
            .then((user_data: any) => {

                let new_user = new User({
                    email: user_data.email,
                    access_token: data.access_token,
                    refresh_token: data.refresh_token
                })

                let options = {
                    upsert: true,
                    overwrite: true
                }
    
                User.findOneAndUpdate({ email: user_data.email }, new_user, options)

                res.send(new_user)
            })
        })
        
    }
    catch (err) {
        console.log(err)
    }
})

auth.get('/spotify_new_access_token/:refresh_token', async (req: any, res: any) => {
    try {

        let refresh_token = req.query.refresh_token

        let data = await fetch('https://accounts.spotify.com/api/token', {
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
        .then((data: any) => {
            res.send(data)
        })
        
    }
    catch (err) {
        console.log(err)
    }
})

auth.get('/logout', async (req: any, res: any) => {
    try {
        res.send('hi')
    }
    catch (err) {
        console.log(err)
    }
})