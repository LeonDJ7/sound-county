import React from 'react'
import './PlaylistExpanded.css'
import 'antd/dist/antd.css'
import { } from 'antd'
import { refresh_access_token } from '../../tools'
import FeatureChart from './FeatureChart'
import RecommendedTracks from './RecommendedTracks'

interface Props {
    playlist_info: any,
    set_selected_playlist: React.Dispatch<any>
}
const PlaylistExpanded: React.FC<Props> = (props) => {

    const playlist_info = props.playlist_info
    
    const [loading, set_loading] = React.useState<boolean>(false)
    const [playlist_items, set_playlist_items] = React.useState<any[]>([])
    const [playlist_feature_data, set_playlist_feature_data] = React.useState<any>({})

    React.useEffect(() => {

        let access_token = window.localStorage.getItem('access_token')
        set_loading(true)

        fetch(`http://localhost:4000/api/playlist_items?access_token=${access_token}&playlist_id=${playlist_info.id}`)
            .then((res: any) => res.json()) 
            .then((data: any[]) => {
                console.log(data)
                set_playlist_items(data)
                set_loading(false)
            })
            .catch( async (err: Error) => {
                await refresh_access_token()
                access_token = window.localStorage.getItem('access_token')
                fetch(`http://localhost:4000/api/playlist_items?access_token=${access_token}&playlist_id=${playlist_info.id}`)
                .then((res: any) => res.json()) 
                .then((data: any[]) => {
                    console.log(data)
                    set_playlist_items(data)
                    set_loading(false)
                })
                .catch( async (err: Error) => {
                    console.log(err)
                    set_loading(false)
                })
            })

    }, [])


    return (
        <span id='playlist-expanded-root'>
            <span id='playlist-expanded-header'>
                <button onClick={() => { props.set_selected_playlist({}) }} className='playlist-img' style={{ background: `url(${playlist_info.image ? playlist_info.image.url : ''})`, marginRight: '3rem'}} />
                <span id='playlist-title'> {playlist_info.name} </span>
            </span>

            { !loading && <FeatureChart set_feature_data={set_playlist_feature_data} playlist_items={playlist_items} type={2} /> }
            { !loading && <RecommendedTracks playlist_feature_data={playlist_feature_data} playlist_items={playlist_items} /> }

        </span>
    )
}

export default PlaylistExpanded