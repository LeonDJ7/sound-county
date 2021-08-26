import React from 'react'
import 'antd/dist/antd.css'
import { Spin, Slider, Button, Alert } from 'antd'
import './RecommendedTracks.css'
import { refresh_access_token } from '../../tools'

interface Props {
    playlist_feature_data: any
    playlist_items: any[]
}
const RecommendedTracks: React.FC<Props> = (props) => {

    let playlist_feature_data = props.playlist_feature_data
    let playlist_items = props.playlist_items

    const [loading, set_loading] = React.useState<boolean>(false)
    const [show_error_alert, set_show_error_alert] = React.useState<boolean>(false)
    const [recommended_songs, set_recommended_songs] = React.useState<any>([])

    let og_danceability = playlist_feature_data.danceability // for some reason setting just this one as a seperate variable solving issue where slider starts at value 0
    const [danceability, set_danceability] = React.useState<number>(og_danceability)
    const [energy, set_energy] = React.useState<number>(playlist_feature_data.energy)
    const [valence, set_valence] = React.useState<number>(playlist_feature_data.valence)
    const [liveness, set_liveness] = React.useState<number>(playlist_feature_data.liveness)
    const [instrumentalness, set_instrumentalness] = React.useState<number>(playlist_feature_data.liveness)
    const [acousticness, set_acousticness] = React.useState<number>(playlist_feature_data.acousticness)
    const [speechiness, set_speechiness] = React.useState<number>(playlist_feature_data.speechiness)

    const recommend_songs = () => {

        let access_token = window.localStorage.getItem('access_token')
        set_loading(true)
        set_show_error_alert(false)

        let seeds: any[] = []

        for (let i = 0; i < 3; i ++) {
            seeds.push(playlist_items[Math.floor(Math.random() * playlist_items.length)])
        }

        let feature_targets = {
            danceability: danceability,
            energy: energy,
            valence: valence,
            liveness: liveness,
            instrumentalness: instrumentalness,
            acousticness: acousticness,
            speechiness: speechiness
        }

        fetch(`http://localhost:4000/api/discover?access_token=${access_token}&seeds=${seeds}&feature_targets=${feature_targets}`)
        .then((res: any) => res.json())
        .then((data: any) => {
            set_recommended_songs(data)
            set_loading(false)
        })
        .catch( async (err: Error) => {
            await refresh_access_token()
            access_token = window.localStorage.getItem('access_token')
            fetch(`http://localhost:4000/api/discover?access_token=${access_token}&seeds=${seeds}&feature_targets=${feature_targets}`)
            .then((res: any) => res.json())
            .then((data: any) => {
                set_recommended_songs(data)
                set_loading(false)
            })
            .catch( async (err: Error) => {
                // now give up
                set_loading(false)
                set_show_error_alert(true)
                console.log(err)
            })
        })

    }

    const random_green = () => {

        let palette = ['#D0EBAD', '#C1E098', '#B8CD9D', '#BAE286', '#B8CAA2', '#CADDB3', '#BED0A6', '#CFF2A3', '#BCCDA6']
        let random = Math.floor(Math.random() * palette.length)

        return palette[random]
    }

    const queue_song = (uri: string) => {

        let access_token = window.localStorage.getItem('access_token')

        fetch(`http://localhost:4000/api/queue_song`, {
            method: 'POST',
            body: JSON.stringify({
                access_token: access_token as string,
                uri: uri
            })
        })
        .catch( async (err: any) => {

            await refresh_access_token()
            access_token = window.localStorage.getItem('access_token')
            fetch(`http://localhost:4000/api/queue_song`, {
                method: 'POST',
                body: JSON.stringify({
                    access_token: access_token as string,
                    uri: uri
                })
            })
            .catch((err: any) => {
                // okay now we give up
                console.log(err)
            })
        })
        
    }

    return (
        <React.Fragment>

            <span style={{ fontSize: '3rem', fontWeight: 800, textAlign: 'left', color: '#A1B592'}}> discover songs based on this playlist </span>

            
            <span style={{display: 'flex', flexDirection: 'row', textAlign: 'left', alignItems: 'center', marginTop: '2rem'}}>
                <span className='recs-feature-label'>danceability</span>
                <Slider trackStyle={{backgroundColor: '#A1B592'}} handleStyle={{border: 'none'}} className='recs-feature-slider' value={danceability} onChange={(value: number) => { set_danceability(value) }} step={0.1} max={1} marks={{[playlist_feature_data['danceability']]: `${playlist_feature_data['danceability']}`}}/>
            </span>

            <span style={{display: 'flex', flexDirection: 'row', textAlign: 'left', alignItems: 'center', marginTop: '2rem'}}>
                <span className='recs-feature-label'>energy</span>
                <Slider trackStyle={{backgroundColor: '#A1B592'}} handleStyle={{border: 'none'}} className='recs-feature-slider' value={energy} onChange={(value: number) => { set_energy(value) }} step={0.1} max={1} marks={{[playlist_feature_data['energy']]: `${playlist_feature_data['energy']}`}}/>
            </span>

            <span style={{display: 'flex', flexDirection: 'row', textAlign: 'left', alignItems: 'center', marginTop: '2rem'}}>
                <span className='recs-feature-label'>valence</span>
                <Slider trackStyle={{backgroundColor: '#A1B592'}} handleStyle={{border: 'none'}} className='recs-feature-slider' value={valence} onChange={(value: number) => { set_valence(value) }} step={0.1} max={1} marks={{[playlist_feature_data['valence']]: `${playlist_feature_data['valence']}`}}/>
            </span>

            <span style={{display: 'flex', flexDirection: 'row', textAlign: 'left', alignItems: 'center', marginTop: '2rem'}}>
                <span className='recs-feature-label'>liveness</span>
                <Slider trackStyle={{backgroundColor: '#A1B592'}} handleStyle={{border: 'none'}} className='recs-feature-slider' value={liveness} onChange={(value: number) => { set_liveness(value) }} step={0.1} max={1} marks={{[playlist_feature_data['liveness']]: `${playlist_feature_data['liveness']}`}}/>
            </span>

            <span style={{display: 'flex', flexDirection: 'row', textAlign: 'left', alignItems: 'center', marginTop: '2rem'}}>
                <span className='recs-feature-label'>instrumentalness</span>
                <Slider trackStyle={{backgroundColor: '#A1B592'}} handleStyle={{border: 'none'}} className='recs-feature-slider' value={instrumentalness} onChange={(value: number) => { set_instrumentalness(value) }} step={0.1} max={1} marks={{[playlist_feature_data['instrumentalness']]: `${playlist_feature_data['instrumentalness']}`}}/>
            </span>

            <span style={{display: 'flex', flexDirection: 'row', textAlign: 'left', alignItems: 'center', marginTop: '2rem'}}>
                <span className='recs-feature-label'>acousticness</span>
                <Slider trackStyle={{backgroundColor: '#A1B592'}} handleStyle={{border: 'none'}} className='recs-feature-slider' value={acousticness} onChange={(value: number) => { set_acousticness(value) }} step={0.1} max={1} marks={{[playlist_feature_data['acousticness']]: `${playlist_feature_data['acousticness']}`}}/>
            </span>

            <span style={{display: 'flex', flexDirection: 'row', textAlign: 'left', alignItems: 'center', marginTop: '2rem'}}>
                <span className='recs-feature-label'>speechiness</span>
                <Slider trackStyle={{backgroundColor: '#A1B592'}} handleStyle={{border: 'none'}} className='recs-feature-slider' value={speechiness} onChange={(value: number) => { set_speechiness(value) }} step={0.1} max={1} marks={{[playlist_feature_data['speechiness']]: `${playlist_feature_data['speechiness']}`}}/>
            </span> 

            <Button onClick={recommend_songs} id='recs-refresh-button'> refresh </Button>

            { show_error_alert && <div style={{marginBottom: '1rem'}}>
                <Alert showIcon message={'oops... something went wrong'} type='error' />
            </div> }

            { !loading && recommended_songs && <span id='recs-item-container'>
                { recommended_songs.map( (song: any, i: number) => {
                    return (
                        <span key={i} style={{ backgroundColor: `${random_green()}`}} className='recs-inline-info-container recs-list-item'> 
                            <img src={song.album.images ? song.album.images[0].url : ''} alt='' className='recs-list-icon' />
                            <span className='recs-list-text'> {song.name} </span>
                            <span className='recs-sub-info-container'>
                                { song.artists.map( (artist: any, i: number) => {
                                    return (
                                        <span key={i}>
                                            <span className='recs'> {'|'} </span>
                                            <span style={{color: 'whitesmoke', marginRight: '0.2rem'}} className='recs-list-subtext'> {artist} </span>
                                        </span>
                                    )
                                })}
                            </span>
                            <span onClick={() => { queue_song(song.uri) }} className='recs-list-add-button'> + </span>
                        </span>
                    )
                }) }
            </span> }

            { loading && 
                <span style={{ display: 'flex', height: '30vh', alignItems: 'center' }}>
                    <Spin size='large' style={{margin: 'auto'}}></Spin> 
                </span>
            }

        </React.Fragment>
    )

}

export default RecommendedTracks