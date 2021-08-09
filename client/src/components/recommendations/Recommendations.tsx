import React from 'react'
import './Recommendations.css'
import 'antd/dist/antd.css'
import { Slider, Select, Button, Spin } from 'antd'
import $ from 'jquery'
import { update_access_token } from '../../tools'
import fake_list_icon from '../../assets/profile-white.png'
import Song from '../../models/Song';
import Playlist from '../../models/Playlist'

const { Option } = Select;

interface Props {
    
}
const Recommendations: React.FC<Props> = (props) => {

    const [logged_in, set_logged_in] = React.useState<boolean>(false)
    const [loading, set_loading] = React.useState<boolean>(false)
    const [user_playlists, set_user_playlists] = React.useState<Playlist[]>([])
    const [recommended_songs, set_recommended_songs] = React.useState<Song[]>([])
    const [selected_playlist, set_selected_playlist] = React.useState<string>('')

    React.useEffect(() => {
        
        let stored_email = window.localStorage.getItem('email')

        if (stored_email) {

            set_logged_in(true)

            get_user_playlists()
            .then((res: any) => {
                return res.json()
            })
            .then((data: any) => {
                console.log(data)
                set_user_playlists( data.map( (playlist: any) => {
                    return {
                        name: playlist.name,
                        id: playlist.id
                    }
                }))
            })
            .catch((err: any) => {

                console.log(err)

                // try updating access token
                update_access_token()

                get_user_playlists()
                .then((res: any) => {
                    return res.json()
                })
                .then((data: any) => {
                    set_user_playlists( data.map( (playlist: any) => {
                        return {
                            name: playlist.name,
                            id: playlist.id
                        }
                    }))
                })
                .catch((err: any) => {

                    // give up, figure out a way to handle
                    console.log(err)
                })
            })
        }

        // set playlist item background color
        $('.recommendations-inline-info-container').each( (i, element) => {
            element.style.backgroundColor = random_green()
        })

    }, [])

    // load user playlists
    const get_user_playlists = () => {
        const username = window.localStorage.getItem('username')
        return fetch(`http://localhost:4000/api/user_playlists?username=${username}`)
    }

    // load recommended songs
    const recommend_songs = () => {

        if (selected_playlist === '') return

        set_loading(true)

        fetch(`http://localhost:4000/api/recommended_songs?playlist_id=${selected_playlist}`)
        .then((res: any) => {
            return res.json
        })
        .then((data: any) => {
            set_recommended_songs(data)
            set_loading(false)
        })
        
    }

    const queue_songs = (uri?: string) => {

        let access_code = window.localStorage.getItem('access_code')

        if (uri) {
            fetch(`http://localhost:4000/api/queue_song`, {
                method: 'POST',
                body: JSON.stringify({
                    access_code: access_code as string,
                    uri: uri
                })
            })
        } else {
            recommended_songs.forEach((song) => {
                fetch(`http://localhost:4000/api/queue_song`, {
                    method: 'POST',
                    body: JSON.stringify({
                        access_code: access_code as string,
                        uri: song.uri
                    })
                })
            })
            // display new recommended for user
            recommend_songs() 
        }
        
    }

    const random_green = () => {

        let palette = ['#D0EBAD', '#C1E098', '#B8CD9D', '#BAE286', '#B8CAA2', '#CADDB3', '#BED0A6', '#CFF2A3', '#BCCDA6']
        let random = Math.floor(Math.random() * palette.length)

        return palette[random]
    }

    return (

        <React.Fragment>

            { logged_in && <span id='recommendations-root'>

                <span id='recommendations-input-container'>
                    <span id='recommendations-popularity-slider-title'> Popularity </span>
                    <Slider max={10} min={1} defaultValue={1} ></Slider>
                    <Select defaultValue="playlist 1" style={{ width: 130 }} bordered={false}>
                        { user_playlists.map((playlist: Playlist) => {
                            return (
                                <Option onClick={ () => { set_selected_playlist(playlist.id) }} value={playlist.name}> {playlist.name} </Option>
                            )
                        }) }
                    </Select>
                    <Button onClick={recommend_songs} id='recommendations-refresh-button'> refresh </Button>
                    <Button onClick={() => { queue_songs() }} id='recommendations-queue-all-button'> queue all </Button>
                </span>

                { !loading && <span id='recommended-songs-container'>
                    { recommended_songs.map( (song, i) => {
                        return (
                            <span key={i} className='recommendations-inline-info-container list-item'> 
                                <img src={fake_list_icon} alt={fake_list_icon} className='list-icon' />
                                <span className='list-text'> {song.name} </span>
                                <span className='sub-info-container'>
                                    { song.artists.map( (artist, i) => {
                                        return (
                                            <span key={i}>
                                                <span className='list-subtext'> {'|'} </span>
                                                <span style={{color: 'whitesmoke', marginRight: '0.2rem'}} className='list-subtext'> {artist} </span>
                                            </span>
                                        )
                                    })}
                                </span>
                                <span className='sub-info-container' style={{flexGrow: 1}}>
                                    { song.genres.map( (genre, i) => {
                                        return (
                                            <span>
                                                <span className='list-subtext'> {'|'} </span>
                                                <span className='list-subtext' style={{marginRight: '0.2rem'}}> {genre} </span>
                                            </span>
                                        )
                                    }) }
                                </span>
                                <span onClick={() => { queue_songs(song.uri) }} className='list-add-button'> + </span>
                            </span>
                        )
                    }) }
                </span> }

                { loading && <Spin size="large" /> }

            </span> }

            { !logged_in && <Button className='default-button' style={{margin: 'auto', width: '120px'}}> log in </Button> }

        </React.Fragment>
        
    )
}

export default Recommendations