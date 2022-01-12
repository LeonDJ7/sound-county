import React from 'react'
import {useHistory, useLocation} from "react-router-dom"
import '../css/Playlist.css'
import 'antd/dist/antd.css'
import { Skeleton } from 'antd'
import { get_feature_data, refresh_access_token } from '../tools'
import FeatureChart from '../components/core/FeatureChart'
import RecommendedTracks from '../components/playlist/RecommendedTracks'

interface Props {
}
const Playlist: React.FC<Props> = (props) => {

    const history = useHistory<any>()
    const passed_data = useLocation<any>()
    let playlist_info = passed_data.state.playlist_info
    
    const [loading, set_loading] = React.useState<boolean>(false)
    const [playlist_items, set_playlist_items] = React.useState<any[]>([])
    const [playlist_feature_data, set_playlist_feature_data] = React.useState<any>({})

    React.useEffect(() => {
        get_songs()
    }, [])

    const get_songs = () => {

        let access_token = window.localStorage.getItem('access_token')
        set_loading(true)

        fetch(`/api/playlist_items?access_token=${access_token}&playlist_id=${playlist_info.id}`)
        .then((res: any) => res.json()) 
        .then((data: any[]) => {
            set_playlist_items(data)

            get_feature_data(data)
            .then((feature_data) => {
                set_playlist_feature_data(feature_data)
                set_loading(false)
            })
            .catch( async (err) => {
                await refresh_access_token()
                get_feature_data(data)
                .then((feature_data) => {
                    set_playlist_feature_data(feature_data)
                    set_loading(false)
                })
                .catch( async (err) => {
                    console.log(err)
                    set_loading(false)
                })
            })

        })
        .catch( async (err: Error) => {
            await refresh_access_token()
            access_token = window.localStorage.getItem('access_token')
            fetch(`/api/playlist_items?access_token=${access_token}&playlist_id=${playlist_info.id}`)
            .then((res: any) => res.json()) 
            .then((data: any[]) => {
                set_playlist_items(data)

                get_feature_data(data)
                .then((feature_data) => {
                    set_playlist_feature_data(feature_data)
                    set_loading(false)
                })
                .catch( async (err) => {
                    await refresh_access_token()
                    get_feature_data(data)
                    .then((feature_data) => {
                        set_playlist_feature_data(feature_data)
                        set_loading(false)
                    })
                    .catch( async (err) => {
                        console.log(err)
                        set_loading(false)
                    })
                })

            })
            .catch( async (err: Error) => {
                console.log(err)
                set_loading(false)
            })
        })

    }

    return (
        <span id='playlist-root'>
            <span id='playlist-info'> 
                <span id='playlist-header'>
                    <span id='playlist-title'> {playlist_info.name} </span>
                    <button onClick={() => { history.goBack() }} className='playlist-img' style={{ background: `url(${playlist_info.image ? playlist_info.image.url : ''})`}} />
                </span>

                { !loading && <FeatureChart feature_data={playlist_feature_data} type={2} /> }
            </span>
            
            { !loading && <RecommendedTracks playlist_feature_data={playlist_feature_data} playlist_items={playlist_items} /> }

            { loading && <Skeleton loading/> }
        </span>
    )
}

export default Playlist