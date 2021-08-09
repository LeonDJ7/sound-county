import spotifyWebApi from 'spotify-web-api-node';
import { client_id, client_secret } from './spotify';

export const update_access_token = () => {

    let refresh_token = window.localStorage.getItem('refresh_token')

    if (!refresh_token) { console.log('couldnt find refresh token in localStorage'); return; }

    let spotifyApi = new spotifyWebApi({
        clientId: client_id,
        clientSecret: client_secret,
        refreshToken: refresh_token
    })

    spotifyApi.refreshAccessToken().then(
        (data: any) => {
            console.log('The access token has been refreshed!');
            window.localStorage.setItem('access_token', data.body['access_token'])
        }, (err: any) => {
            console.log('Could not refresh access token', err);
        }
    )

}