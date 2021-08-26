import React from 'react'
import './Info.css'
import 'antd/dist/antd.css'
import { Button, Spin } from 'antd'
import { refresh_access_token } from '../../tools'
import TrackList from './TrackList'
import FeatureChart from './FeatureChart'
import PlaylistExpanded from './PlaylistExpanded'

interface Props {
    
}
const Info: React.FC<Props> = (props) => {

    const [logged_in, set_logged_in] = React.useState<boolean>(false)
    const [loading, set_loading] = React.useState<boolean>(false)
    const [user_playlists, set_user_playlists] = React.useState<any[]>([])
    const [selected_playlist, set_selected_playlist] = React.useState<any>({})
    const [top_songs, set_top_songs] = React.useState<any[]>([])

    React.useEffect( () => {

        let stored_id = window.localStorage.getItem('id')

        if (stored_id) {
            set_logged_in(true)
            get_user_playlists()
        }

    }, []);

    // load user playlists
    const get_user_playlists = () => {

        let id = window.localStorage.getItem('id')
        let access_token = window.localStorage.getItem('access_token')
        set_loading(true)

        fetch(`http://localhost:4000/api/user_playlists?access_token=${access_token}&id=${id}`)
        .then((res: any) => res.json())
        .then((data: any[]) => {
            set_loading(false)
            set_user_playlists( data.map( (playlist: any) => {
                return {
                    name: playlist.name,
                    id: playlist.id,
                    image: playlist.images[0]
                }
            }))
        })
        .catch( async (err: any) => {
            await refresh_access_token()
            access_token = window.localStorage.getItem('access_token')
            fetch(`http://localhost:4000/api/user_playlists?access_token=${access_token}&id=${id}`)
            .then((res: any) => res.json())
            .then((data: any[]) => {
                set_loading(false)
                set_user_playlists( data.map( (playlist: any) => {
                    return {
                        name: playlist.name,
                        id: playlist.id,
                        image: playlist.images[0]
                    }
                }))
            })
            .catch((err: any) => {
                console.log(err)
            })
        })
        
    }

    return (
        <span id='info-root'>

            {   logged_in && 

                <span>

                    { !selected_playlist['name'] && 
                        <span id='top-songs-info-box'> 
                            <span id='top-songs-lists'>
                                <TrackList type='Top Songs' list_id={1} />
                                <TrackList type='Top Artists' list_id={2} />
                            </span>
                            <FeatureChart type={1}/>
                        </span>
                    }

                    { !selected_playlist['name'] && 
                        <span id='playlists-box' >

                            { user_playlists.map((playlist: any, i) => {
                                return (
                                    <button key={i} onClick={() => { set_selected_playlist(playlist)}} className='playlist-img' style={{ background: `url(${playlist.image ? playlist.image.url : ''})`}}>
                                        <span style={{backgroundColor: 'white', color: 'dimgray', padding: '0 0.5rem 0 0.5rem'}}> {playlist.name} </span>
                                    </button>
                                )
                            }) }
                            
                        </span>
                    }

                    { selected_playlist['name'] && 
                        <PlaylistExpanded playlist_info={selected_playlist} set_selected_playlist={set_selected_playlist} />
                    }

                </span>

            }

            { !logged_in && <Button className='default-button' style={{margin: 'auto', width: '120px'}}> log in </Button> }

        </span>
    )
}

export default Info