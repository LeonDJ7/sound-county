import React from 'react'
import 'antd/dist/antd.css'
import { Button, Skeleton, Typography } from 'antd'
import default_user_image from '../assets/profile-white.png'
import '../css/Profile.css'

let client_id = process.env.REACT_APP_SPOTIFY_CLIENT_ID
let redirect_uri = process.env.REACT_APP_SPOTIFY_REDIRECT_URI

const scopes = [
    "user-read-email",
    "user-read-private",
    "user-top-read",
    "playlist-read-private",
    "user-modify-playback-state",
]
  
let login_url = `https://accounts.spotify.com/en/authorize/?client_id=${client_id}&response_type=code&redirect_uri=${redirect_uri}&show_dialog=true&scope=${scopes.join("%20")}`

const Profile = (props) => {

    const [id, set_id] = React.useState('')
    const [image_url, set_image_url] = React.useState('')
    const [logged_in, set_logged_in] = React.useState(false)
    const [loading, set_loading] = React.useState(false)

    React.useEffect(() => {

        let stored_id = window.localStorage.getItem('id')
        let stored_image_url = window.localStorage.getItem('image_url')

        if (stored_id) {
            set_id(stored_id)
            set_image_url(stored_image_url)
            set_logged_in(true)
        }

        // 'URLSearchParams(window.location.search)' will get url string after the '?' & .get() will get the code value from the url
        const code = new URLSearchParams(window.location.search).get('code')

        if (code) {

            set_loading(true)

            fetch(`/auth/login?code=${code}`)
            .then((res) => res.json())
            .then((data) => {

                let access_token = data.access_token
                let refresh_token = data.refresh_token

                if (!access_token) {
                    window.location.href = '/profile'
                    return;
                }

                // If success then cut the code string from the URL and execute the other thing
                window.history.pushState({}, '', '/profile')
                window.localStorage.setItem('access_token', access_token)
                window.localStorage.setItem('refresh_token', refresh_token)

                fetch(`/auth/get_me?access_token=${access_token}`)
                .then((res) => res.json())
                .then((data) => {
                    set_id(data.me.id)
                    set_image_url(data.me.images ? data.me.images[0].url : '')
                    window.localStorage.setItem('id', data.me.id)
                    window.localStorage.setItem('image_url', data.me.images ? data.me.images[0].url : '')
                    set_logged_in(true)
                    set_loading(false)
                })
                .catch((err) => {
                    console.log(err)
                    set_loading(false)
                })

            })
            .catch((err) => {
                console.log(err)
                set_loading(false)
            })
        }

    }, []);

    const log_out = () => {
        window.localStorage.clear()
        set_id('')
        set_image_url('')
        set_logged_in(false)
    }

    return (
        <span id='profile-root'>
            {   logged_in && !loading &&
                <span id='profile-content-container'>
                    <img id='profile-img' src={image_url} alt={default_user_image}></img>
                    <Typography id='profile-welcome-text'> Welcome {' ' + id}</Typography>
                    <Button className='default-button' style={{width: '120px'}} onClick={log_out}> log out </Button>
                </span>
            }
            {   !logged_in && !loading &&
                <span id='profile-content-container'>
                    <img id='profile-img' src={default_user_image} alt={default_user_image}></img>
                    <Button className='default-button' style={{width: '180px'}}>
                        <a href={login_url}>log in with spotify</a>
                    </Button>
                </span>
            }

            { loading && 
                <span style={{ display: 'flex', width: '100%', height: '100%', padding: '4rem 4rem 4rem 4rem'}}>
                    <Skeleton active loading/> 
                </span>
            }

        </span>
    )
}

export default Profile