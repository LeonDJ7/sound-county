import React from 'react'
import spotifyWebApi from "spotify-web-api-node";
import 'antd/dist/antd.css'
import { Button, Typography } from 'antd'
import default_user_image from '../../assets/profile-white.png'
import './Profile.css'
import { login_url, client_id } from '../../spotify'

const spotifyApi = new spotifyWebApi({
    clientId: client_id,
});

interface Props {
    
}
const Profile: React.FC<Props> = (props) => {

    const [email, set_email] = React.useState<string>('')
    const [username, set_username] = React.useState<string>('')
    const [image_url, set_image_url] = React.useState<string>('')
    const [logged_in, set_logged_in] = React.useState<boolean>(false)

    React.useEffect(() => {

        // 'URLSearchParams(window.location.search)' will get url string after the '?' & .get() will get the code value from the url
        const code = new URLSearchParams(window.location.search).get('code')

        if (code) {
            fetch('http://localhost:8000/login', {
                method: 'post',
                body: JSON.stringify({
                    code: code
                })
            })
            .then((res: any) => {
                return res.json()
            })
            .then((data: any) => {

                let access_token = data.access_token
                let refresh_token = data.refresh_token
                let expires_in = data.expires_in

                if (!access_token) {
                    window.location.href = '/'
                    return;
                }

                // If success then cut the code string from the URL and execute the other thing
                window.history.pushState({}, '', '/')

                spotifyApi.setAccessToken(access_token)
                spotifyApi.setRefreshToken(refresh_token)

                window.localStorage.setItem('access_token', access_token)
                window.localStorage.setItem('refresh_token', refresh_token)

                spotifyApi.getMe()
                .then(data => {
                    console.log(data.body);
                    set_email(data.body.email)
                    set_username(data.body.display_name ? data.body.display_name : '')
                    set_image_url(data.body.images ? data.body.images[0].url : '')
                    window.localStorage.setItem('email', data.body.email)
                    window.localStorage.setItem('username', data.body.display_name ? data.body.display_name : '')
                    window.localStorage.setItem('image_url', data.body.images ? data.body.images[0].url : '')
                    set_logged_in(true)
                })
                .catch((err) => {
                    console.log(err)
                })

            })
            .catch((err) => {
                console.log(err)
            })
        }
        
        let stored_email = window.localStorage.getItem('email')
        let stored_username = window.localStorage.getItem('username')
        let stored_image_url = window.localStorage.getItem('image_url')

        if (stored_email) {
            set_email(stored_email)
            set_username(stored_username as string)
            set_image_url(stored_image_url as string)
            set_logged_in(true)
        }

        // TODO: retrive actual user profile from spotify

    }, []);

    const log_out = () => {
        window.localStorage.clear()
        set_email('')
        set_username('')
        set_image_url('')
        set_logged_in(false)
    }

    return (
        <span id='profile-root'>
            {   logged_in &&
                <span id='profile-content-container'>
                    <img id='profile-img' src={image_url} alt={default_user_image}></img>
                    <Typography id='profile-welcome-text'> Welcome {' ' + username}</Typography>
                    <Button className='default-button' style={{width: '120px'}} onClick={log_out}> log out </Button>
                </span>
            }
            {   !logged_in &&
                <span id='profile-content-container'>
                    <img id='profile-img' src={default_user_image} alt={default_user_image}></img>
                    <a href={login_url}>LOGIN WITH SPOTIFY</a>
                </span>
            }
        </span>
    )
}

export default Profile