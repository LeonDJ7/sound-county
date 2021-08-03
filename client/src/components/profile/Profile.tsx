import React from 'react'
import 'antd/dist/antd.css'
import { Button, Typography } from 'antd'
import default_user_image from '../../assets/profile-white.png'
import './Profile.css'

interface Props {
    
}
const Profile: React.FC<Props> = (props) => {

    const [email, set_email] = React.useState<string>('')
    const [username, set_username] = React.useState<string>('')
    const [image_url, set_image_url] = React.useState<string>('')
    const [logged_in, set_logged_in] = React.useState<boolean>(false)

    React.useEffect(() => {
        
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

    const logIn = () => {
        fetch('/log_in')
            .then((res: any) => {
                return res.json()
            })
            .then((data: any) => {
                set_email(data.email)
                set_username(data.username)
                set_image_url(data.image_url)
                window.localStorage.setItem('email', data.email)
                window.localStorage.setItem('username', data.username)
                window.localStorage.setItem('image_url', data.image)
                set_logged_in(true)
            })
            .catch((err) => {
                console.log(err)
            })
    }

    const logOut = () => {
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
                    <Button id='profile-login-button' onClick={logOut}> log out </Button>
                </span>
            }
            {   !logged_in &&
                <span id='profile-content-container'>
                    <img id='profile-img' src={default_user_image} alt={default_user_image}></img>
                    <Button className='default-button' style={{width: '120px'}} onClick={logIn}> log in </Button>
                </span>
            }
        </span>
    )
}

export default Profile