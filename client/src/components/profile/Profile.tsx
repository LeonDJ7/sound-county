import React from 'react'
import 'antd/dist/antd.css'
import { Button, Typography } from 'antd'
import default_user_image from '../../assets/profile-white.png'
import './Profile.css'

interface Props {
    
}
const Profile: React.FC<Props> = (props) => {

    const [userData, setUserData] = React.useState<any>({})
    const [loggedIn, setLoggedIn] = React.useState<boolean>(false)

    const logIn = () => {
        fetch('/log_in')
            .then((res: any) => {
                return res.json()
            })
            .then((data: any) => {
                setUserData({
                    email: data.email,
                    username: data.username,
                    image_url: data.image,
                    access_token: data.access_token,
                    reload_token: data.reload_token
                })
                setLoggedIn(true)
            })
            .catch((err) => {
                console.log(err)
            })
    }

    const logOut = () => {
        setUserData({})
        setLoggedIn(false)
    }

    return (
        <span id='profile-root'>
            {   loggedIn &&
                <span id='profile-content-container'>
                    <img id='profile-img' src={userData.image} alt={default_user_image}></img>
                    <Typography id='profile-welcome-text'> Welcome {' ' + userData.username}</Typography>
                    <Button id='profile-login-button' onClick={logOut}> log out </Button>
                </span>
            }
            {   !loggedIn &&
                <span id='profile-content-container'>
                    <img id='profile-img' src={default_user_image} alt={default_user_image}></img>
                    <Button id='profile-login-button' onClick={logIn}> log in </Button>
                </span>
            }
        </span>
    )
}

export default Profile