import React, { SyntheticEvent } from 'react'
import 'antd/dist/antd.css'
import { Switch, Slider, Button, Alert, Skeleton } from 'antd'
import './RecommendedTracks.css'
import { refresh_access_token } from '../../tools'
import { CheckOutlined, CloseOutlined } from '@ant-design/icons'

interface Props {
    playlist_feature_data: any
    playlist_items: any[]
}
const RecommendedTracks: React.FC<Props> = (props) => {

    let playlist_feature_data = props.playlist_feature_data
    let playlist_items = props.playlist_items
    var avg_popularity = 0

    props.playlist_items.forEach((item) => {
        avg_popularity += item.track.popularity
    })

    avg_popularity = Math.round(avg_popularity / playlist_items.length)

    const [loading, set_loading] = React.useState<boolean>(false)
    const [show_error_alert, set_show_error_alert] = React.useState<boolean>(false)
    const [show_device_error, set_show_device_error] = React.useState<boolean>(false)
    const [use_popularity, set_use_popularity] = React.useState<boolean>(false)

    const [recommended_songs, set_recommended_songs] = React.useState<any[]>([])

    let og_danceability = playlist_feature_data.danceability
    const [danceability, set_danceability] = React.useState<number>(og_danceability)
    const [energy, set_energy] = React.useState<number>(playlist_feature_data.energy)
    const [valence, set_valence] = React.useState<number>(playlist_feature_data.valence)
    const [liveness, set_liveness] = React.useState<number>(playlist_feature_data.liveness)
    const [instrumentalness, set_instrumentalness] = React.useState<number>(playlist_feature_data.instrumentalness)
    const [acousticness, set_acousticness] = React.useState<number>(playlist_feature_data.acousticness)
    const [speechiness, set_speechiness] = React.useState<number>(playlist_feature_data.speechiness)
    const [popularity, set_popularity] = React.useState<number>(avg_popularity)

    const recommend_songs = () => {

        let access_token = window.localStorage.getItem('access_token')
        set_loading(true)
        set_show_error_alert(false)
        set_show_device_error(false)

        let seeds: string[] = []

        for (let i = 0; i < 3; i ++) {
            seeds.push(playlist_items[Math.floor(Math.random() * playlist_items.length)].track.id)
        }

        let feature_targets: any = {
            danceability: danceability,
            energy: energy,
            valence: valence,
            liveness: liveness,
            instrumentalness: instrumentalness,
            acousticness: acousticness,
            speechiness: speechiness,
        }

        if (use_popularity) {
            feature_targets.popularity = popularity
        }

        fetch(`http://localhost:4000/api/discover?access_token=${access_token}&seeds=${seeds}&feature_targets=${JSON.stringify(feature_targets)}`)
        .then((res: any) => res.json())
        .then((data: any[] | any) => {
            set_loading(false)
            if (data.body) { set_show_error_alert(true); return }
            let data_filtered = data.filter((rec: any) => {
                return playlist_items.find(item => rec.id === item.track.id) === undefined
            })
            let recs = []

            if (data_filtered.length > 10) {
                for (let i = 0; i < 10; i++) {
                    let i = Math.floor(Math.random() * data_filtered.length)
                    recs.push(data_filtered[i])
                    data_filtered.splice(i, 1)
                }
            } else {
                recs = data_filtered
            }

            set_recommended_songs(recs)
        })
        .catch( async (err: Error) => {
            await refresh_access_token()
            access_token = window.localStorage.getItem('access_token')
            fetch(`http://localhost:4000/api/discover?access_token=${access_token}&seeds=${seeds}&feature_targets=${feature_targets}`)
            .then((res: any) => res.json())
            .then((data: any[] | any) => {
                set_loading(false)
            if (data.body) { set_show_error_alert(true); return }
            let data_filtered = data.filter((rec: any) => {
                return playlist_items.find(item => rec.id === item.track.id) === undefined
            })
            let recs = []

            if (data_filtered.length > 10) {
                for (let i = 0; i < 10; i++) {
                    let i = Math.floor(Math.random() * data_filtered.length)
                    recs.push(data_filtered[i])
                    data_filtered.splice(i, 1)
                }
            } else {
                recs = data_filtered
            }

            set_recommended_songs(recs)
            })
            .catch( (err: any) => {
                // now give up
                set_loading(false)
                set_show_error_alert(true)
            })
        })

    }

    const random_green = () => {

        let palette = ['#D0EBAD', '#C1E098', '#B8CD9D', '#BAE286', '#B8CAA2', '#CADDB3', '#BED0A6', '#CFF2A3', '#BCCDA6']
        let random = Math.floor(Math.random() * palette.length)

        return palette[random]
    }

    const queue_song = (uri: string, e: SyntheticEvent) => {

        set_show_device_error(false)
        set_show_error_alert(false)

        let access_token = window.localStorage.getItem('access_token')
        let evt = e.target as HTMLElement

        evt.style.color = '#000000'

        fetch(`http://localhost:4000/api/queue_song?access_token=${access_token}&uri=${uri}`)
        .then((res: any) => res.json())
        .then((data: any) => {

            if (data.body.error && data.body.error.reason === 'NO_ACTIVE_DEVICE') {
                set_show_device_error(true)
            }

            setTimeout(() => {
                evt.style.color = 'dimgrey'
            }, 500);

        })
        .catch( (err: any) => {
            set_show_error_alert(true)
            console.log(err)
        })
        
    }

    return (
        <React.Fragment>

            { og_danceability && <span style={{textAlign: 'right'}}>
                
                <span className='recs-feature' style={{marginTop: 0}}>
                    <span className='recs-feature-label'>danceability</span>
                    <Slider trackStyle={{backgroundColor: '#A1B592'}} handleStyle={{border: 'none'}} className='recs-feature-slider' value={danceability} onChange={(value: number) => { set_danceability(value) }} step={0.1} max={1} marks={{[playlist_feature_data['danceability']]: `${playlist_feature_data['danceability']}`}}/>
                </span>

                <span className='recs-feature'>
                    <span className='recs-feature-label'>energy</span>
                    <Slider trackStyle={{backgroundColor: '#A1B592'}} handleStyle={{border: 'none'}} className='recs-feature-slider' value={energy} onChange={(value: number) => { set_energy(value) }} step={0.1} max={1} marks={{[playlist_feature_data['energy']]: `${playlist_feature_data['energy']}`}}/>
                </span>

                <span className='recs-feature'>
                    <span className='recs-feature-label'>valence</span>
                    <Slider trackStyle={{backgroundColor: '#A1B592'}} handleStyle={{border: 'none'}} className='recs-feature-slider' value={valence} onChange={(value: number) => { set_valence(value) }} step={0.1} max={1} marks={{[playlist_feature_data['valence']]: `${playlist_feature_data['valence']}`}}/>
                </span>

                <span className='recs-feature'>
                    <span className='recs-feature-label'>liveness</span>
                    <Slider trackStyle={{backgroundColor: '#A1B592'}} handleStyle={{border: 'none'}} className='recs-feature-slider' value={liveness} onChange={(value: number) => { set_liveness(value) }} step={0.1} max={1} marks={{[playlist_feature_data['liveness']]: `${playlist_feature_data['liveness']}`}}/>
                </span>

                <span className='recs-feature'>
                    <span className='recs-feature-label'>instrumentalness</span>
                    <Slider trackStyle={{backgroundColor: '#A1B592'}} handleStyle={{border: 'none'}} className='recs-feature-slider' value={instrumentalness} onChange={(value: number) => { set_instrumentalness(value) }} step={0.1} max={1} marks={{[playlist_feature_data['instrumentalness']]: `${playlist_feature_data['instrumentalness']}`}}/>
                </span>

                <span className='recs-feature'>
                    <span className='recs-feature-label'>acousticness</span>
                    <Slider trackStyle={{backgroundColor: '#A1B592'}} handleStyle={{border: 'none'}} className='recs-feature-slider' value={acousticness} onChange={(value: number) => { set_acousticness(value) }} step={0.1} max={1} marks={{[playlist_feature_data['acousticness']]: `${playlist_feature_data['acousticness']}`}}/>
                </span>

                <span className='recs-feature'>
                    <span className='recs-feature-label'>speechiness</span>
                    <Slider trackStyle={{backgroundColor: '#A1B592'}} handleStyle={{border: 'none'}} className='recs-feature-slider' value={speechiness} onChange={(value: number) => { set_speechiness(value) }} step={0.1} max={1} marks={{[playlist_feature_data['speechiness']]: `${playlist_feature_data['speechiness']}`}}/>
                </span> 

                { use_popularity &&
                    <span className='recs-feature'>
                        <span className='recs-feature-label' style={{ color: '#A6AF96', flexGrow: 0 }}>popularity</span>
                        <span style={{flexGrow: 1}}>
                            <Switch style={{marginLeft: '0.7rem'}} checkedChildren={<CheckOutlined />} unCheckedChildren={<CloseOutlined />} defaultChecked onChange={() => { set_use_popularity(!use_popularity) }} />
                        </span>
                        <Slider trackStyle={{backgroundColor: '#A6AF96' }} handleStyle={{border: 'none' }} className='recs-feature-slider' value={popularity} onChange={(value: number) => { set_popularity(value) }} step={1} max={100} marks={{[avg_popularity]: `${avg_popularity}`}}/>
                    </span> 
                }

                { !use_popularity &&
                    <span className='recs-feature'>
                        <span className='recs-feature-label' style={{ color: '#A6AF96', opacity: '50%', flexGrow: 0 }}>popularity</span>
                        <span style={{flexGrow: 1}}>
                            <Switch style={{marginLeft: '0.7rem'}} checkedChildren={<CheckOutlined />} unCheckedChildren={<CloseOutlined />} defaultChecked={false} onChange={() => { set_use_popularity(!use_popularity) }} />
                        </span>
                        <Slider disabled trackStyle={{backgroundColor: '#A6AF96', opacity: '99%' }} handleStyle={{border: 'none' }} className='recs-feature-slider' value={popularity} onChange={(value: number) => { set_popularity(value) }} step={1} max={100} marks={{[avg_popularity]: `${avg_popularity}`}}/>
                    </span> 
                }
                
                <span className='recs-refresh'>
                    <span style={{ fontWeight: 800, color: '#A1B592', flexGrow: 1}}> discover songs based on this playlist </span>
                    <Button onClick={recommend_songs} id='recs-refresh-button'> refresh </Button>
                </span>
                

                { show_error_alert && <div style={{ textAlign: 'center', marginTop: '2rem'}}>
                    <Alert showIcon message={'oops... something went wrong'} type='error' />
                </div> }

                { show_device_error && <div style={{ textAlign: 'center', marginTop: '2rem'}}>
                    <Alert showIcon message={'open up spotify on your device to queue a song'} type='error' />
                </div> }

                { !loading && !show_error_alert && recommended_songs.length > 0 && recommended_songs && 
                    <span id='recs-item-container'>
                        { recommended_songs.map( (song: any, i: number) => {
                            return (
                                <span key={i} style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', textAlign: 'center'}} >
                                    <button className='queue-button' onClick={(e) => { queue_song(song.uri, e) }} style={{ background: `url(${song.album.images ? song.album.images[0].url : ''}) no-repeat center`}} >
                                        <span className='queue-indicator'> + </span>
                                    </button>
                                    <span style={{width: '12rem'}} >
                                        <div> {song.name} </div>
                                        <span style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', flexWrap: 'wrap'}}>
                                            { song.artists.map((artist: string, i: number) => { return (
                                                <span key={i} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                                                    <span style={{ fontSize: '0.6rem', color: `${random_green()}`}}> {artist} </span>
                                                    <span style={{ margin: '0 0.8rem 0 0.8rem'}}> {'  |  '} </span>
                                                </span>) 
                                            })}
                                            { song.genres.map((genre: string, i: number) => { return (
                                                <span key={i} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                                                    <span style={{ fontSize: '0.6rem'}}> {genre} </span>
                                                    <span style={{ margin: '0 0.8rem 0 0.8rem', color: `${random_green()}`}}> {'  |  '} </span>
                                                </span>) 
                                            })}
                                        </span>
                                    </span>
                                </span>
                            )
                        })}
                    </span>
                }

                { loading && 
                    <span style={{ display: 'flex', alignItems: 'center' }}>
                        <Skeleton loading/>
                    </span>
                }

            </span> }

        </React.Fragment>
    )

}

export default RecommendedTracks