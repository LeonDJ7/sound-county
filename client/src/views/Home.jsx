import React from 'react'
import '../css/Home.css'
import 'antd/dist/antd.css'
import { Button, Alert, Skeleton } from 'antd'
import { get_feature_data, refresh_access_token } from '../tools'
import TrackList from '../components/home/TrackList'
import FeatureChart from '../components/core/FeatureChart'
import { Link } from 'react-router-dom'

const Home = (props) => {

    const [logged_in, set_logged_in] = React.useState(false)
    const [user_playlists, set_user_playlists] = React.useState([])
    const [top_songs, set_top_songs] = React.useState([])
    const [top_songs_feature_data, set_top_songs_feature_data] = React.useState()
    const [top_artists, set_top_artists] = React.useState([])
    const [top_songs_error, set_top_songs_error] = React.useState(false)
    const [top_artists_loading, set_top_artists_loading] = React.useState(false)
    const [top_songs_loading, set_top_songs_loading] = React.useState(false)
    const [playlists_error, set_playlists_error] = React.useState(false)
    const [top_songs_feature_data_loading, set_top_songs_feature_data_loading] = React.useState(false)
    const [playlists_loading, set_playlists_loading] = React.useState(false)

    React.useEffect( () => {

        let stored_id = window.localStorage.getItem('id')

        if (stored_id) {
            set_logged_in(true)
            set_top_songs_error(false)
            set_playlists_error(false)
            set_top_artists_loading(true)
            set_top_songs_loading(true)
            set_top_songs_feature_data_loading(true)
            set_playlists_loading(true)
            get_top_songs()
            get_user_playlists()
            get_top_artists()
        }

    }, []);


    const get_top_artists = () => {

        let access_token = window.localStorage.getItem('access_token')

        fetch(`/api/top_artists?access_token=${access_token}&time_range=short_term`)
        .then((res) => res.json())
        .then((data) => {
            set_top_artists(data)
            set_top_artists_loading(false)
        })
        .catch( async (err) => {
            await refresh_access_token()
            access_token = window.localStorage.getItem('access_token')
            fetch(`/api/top_artists?access_token=${access_token}&time_range=short_term`)
            .then((res) => res.json())
            .then((data) => {
                set_top_artists(data)
                set_top_artists_loading(false)
            })
            .catch((err) => {
                set_top_songs_error(true)
                set_top_artists_loading(false)
            })
        })

    }

    const get_top_songs = () => {

        let access_token = window.localStorage.getItem('access_token')

        fetch(`/api/top_tracks?access_token=${access_token}&time_range=short_term`)
        .then((res) => res.json())
        .then((data) => {
            set_top_songs(data)
            set_top_songs_loading(false)

            get_feature_data(data)
            .then((feature_data) => {
                set_top_songs_feature_data(feature_data)
                set_top_songs_feature_data_loading(false)
            })
            .catch( async (err) => {
                await refresh_access_token()
                get_feature_data(data)
                .then((feature_data) => {
                    set_top_songs_feature_data(feature_data)
                    set_top_songs_feature_data_loading(false)
                })
                .catch( async (err) => {
                    console.log(err)
                })
            })

        })
        .catch( async (err) => {
            await refresh_access_token()
            access_token = window.localStorage.getItem('access_token')
            fetch(`/api/top_tracks?access_token=${access_token}&time_range=short_term`)
            .then((res) => res.json())
            .then((data) => {
                set_top_songs(data)
                set_top_songs_loading(false)

                get_feature_data(data)
                .then((feature_data) => {
                    set_top_songs_feature_data(feature_data)
                    set_top_songs_feature_data_loading(false)
                })
                .catch( async (err) => {
                    await refresh_access_token()
                    get_feature_data(data)
                    .then((feature_data) => {
                        set_top_songs_feature_data(feature_data)
                        set_top_songs_feature_data_loading(false)
                    })
                    .catch( async (err) => {
                        console.log(err)
                        set_top_songs_feature_data_loading(false)
                    })
                })

            })
            .catch((err) => {
                console.log(err)
            })
        })

    }

    // load user playlists
    const get_user_playlists = () => {

        let id = window.localStorage.getItem('id')
        let access_token = window.localStorage.getItem('access_token')

        fetch(`/api/user_playlists?access_token=${access_token}&id=${id}`)
        .then((res) => res.json())
        .then((data) => {
            set_user_playlists( data.map( (playlist) => {
                return {
                    name: playlist.name,
                    id: playlist.id,
                    image: playlist.images[0]
                }
            }))
            set_playlists_loading(false)
        })
        .catch( async (err) => {
            await refresh_access_token()
            access_token = window.localStorage.getItem('access_token')
            fetch(`/api/user_playlists?access_token=${access_token}&id=${id}`)
            .then((res) => res.json())
            .then((data) => {
                set_user_playlists( data.map( (playlist) => {
                    return {
                        name: playlist.name,
                        id: playlist.id,
                        image: playlist.images[0]
                    }
                }))
                set_playlists_loading(false)
            })
            .catch((err) => {
                console.log(err)
                set_playlists_error(true)
                set_playlists_loading(false)
            })
        })
        
    }

    return (
        <span id='home-root'>

            {   logged_in && 

                <span>

                    { top_songs_error && 
                        <div style={{marginBottom: '1rem'}}>
                            <Alert showIcon message={'oops... something went wrong retrieving your top artists and songs'} type='error' />
                        </div> 
                    }

                    {!top_songs_error && 
                        <span id='top-songs-info-box'> 
                            <span id='top-songs-lists'>
                                <TrackList key={top_songs} type='Top Songs' list_id={1} data={top_songs} loading={top_songs_loading}/>
                                <TrackList key={top_artists} type='Top Artists' list_id={2} data={top_artists} loading={top_artists_loading}/>
                            </span>
                            { top_songs_feature_data_loading && 
                                <span style={{margin: '2rem 0 2rem 0'}}>
                                    <Skeleton active loading/> 
                                </span>
                            }
                            { !top_songs_feature_data_loading && <FeatureChart feature_data={top_songs_feature_data} type={1}/> }
                        </span>
                    }

                    { playlists_error && 
                        <div style={{marginBottom: '1rem'}}>
                            <Alert showIcon message={'oops... something went wrong retrieving your playlists'} type='error' />
                        </div> 
                    }

                    { playlists_loading && 
                        <span style={{margin: '2rem 0 2rem 0'}}>
                            <Skeleton />
                        </span>
                    }

                    { !playlists_error && !playlists_loading &&
                        <span id='playlists-box' >

                            { user_playlists.map((playlist, i) => {
                                return (
                                    <Link key={i} to={{
                                        pathname: `/playlists/${playlist.id}`,
                                        state: {
                                            playlist_info: playlist,
                                        }
                                    }}>
                                        <button className='playlist-preview-img' style={{ background: `url(${playlist.image ? playlist.image.url : ''})`}}>
                                            <span style={{backgroundColor: 'white', color: 'dimgray', padding: '0 0.5rem 0 0.5rem'}}> {playlist.name} </span>
                                        </button>
                                    </Link>
                                    
                                )
                            }) }
                            
                        </span>
                    }

                </span>

            }

            { !logged_in && 
                <Button className='default-button' style={{marginTop: '25%', width: '120px'}}> 
                    <a href='/profile' > log in </a>
                </Button> }

        </span>
    )
}

export default Home