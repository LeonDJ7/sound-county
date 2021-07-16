import React from 'react'
import { Button, Typography } from 'antd'
import { UserOutlined } from '@ant-design/icons'

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
                <span>
                    <img id='profile-img' src={userData.image} alt=''></img>
                    <Typography> Welcome {' ' + userData.username}</Typography>
                    <Button onClick={logOut}> log out </Button>
                </span>
            }
            {   !loggedIn &&
                <span>
                    <Button onClick={logIn}> log in </Button>
                </span>
            }
        </span>
    )
}

export default Profile