import React from 'react'
import 'antd/dist/antd.css'
import { Alert, Spin } from 'antd'
import './FeatureChart.css'
import { Chart, ChartConfiguration, ChartData } from 'chart.js'
import { refresh_access_token } from '../../tools'


interface Props {
    set_feature_data?: React.Dispatch<any>
    playlist_items?: any[],
    type: number
}
const FeatureChart: React.FC<Props> = (props) => {

    let type = props.type

    const [loading, set_loading] = React.useState(false)
    const [show_error_alert, set_show_error_alert] = React.useState<boolean>(false)

    React.useEffect(() => {

        get_songs()

    }, []);


    const get_songs = () => {

        set_loading(true)
        let access_token = window.localStorage.getItem('access_token')

        if (type === 1) {

            fetch(`http://localhost:4000/api/top_songs?access_token=${access_token}&time_range=short_term`)
            .then((res: any) => res.json())
            .then((data: any[]) => {
                load_chart(data)
            })
            .catch( async (err: any) => {
                await refresh_access_token()
                access_token = window.localStorage.getItem('access_token')
                fetch(`http://localhost:4000/api/top_songs?access_token=${access_token}&time_range=short_term`)
                .then((res: any) => res.json())
                .then((data: any[]) => {
                    load_chart(data)
                })
                .catch((err: any) => {
                    // okay now give up, figure out how to handle
                    set_loading(false)
                    set_show_error_alert(true)
                    console.log(err)
                })
            })

        } else {

            if (props.playlist_items) { console.log(props.playlist_items); load_chart(props.playlist_items) }

        }

    }

    const load_chart = (songs: any[]) => {

        let access_token = window.localStorage.getItem('access_token')

        fetch(`http://localhost:4000/api/average_audio_features?access_token=${access_token}&songs=${songs.map((song: any) => song.track.id)}`)
        .then((res: any) => res.json())
        .then((data: any) => {
            console.log(data)
            if (props.set_feature_data) props.set_feature_data(data)
            set_up_chart(data)
        })
        .catch( async (err: Error) => {
            await refresh_access_token()
            access_token = window.localStorage.getItem('access_token')
            fetch(`http://localhost:4000/api/average_audio_features?access_token=${access_token}&songs=${songs.map((song: any) => song.track.id)}`)
            .then((res: any) => res.json())
            .then((data: any) => {
                console.log(data)
                if (props.set_feature_data) props.set_feature_data(data)
                set_up_chart(data)
            })
            .catch( async (err: Error) => {
                set_loading(false)
                set_show_error_alert(true)
                console.log(err)
            })
        })

    }

    const set_up_chart = (feature_data: any) => {

        const chart_data: ChartData = {
            labels: [
                'danceability',
                'energy',
                'valence',
                'liveness',
                'tempo',
                'instrumentalness',
                'acousticness',
                'speechiness',
            ],
            datasets: [
                feature_data['danceability'],
                feature_data['energy'],
                feature_data['valence'],
                feature_data['liveness'],
                feature_data['instrumentalness'],
                feature_data['acousticness'],
                feature_data['speechiness']
            ]
        }
        
        const config: ChartConfiguration = {
            type: 'line',
            data: chart_data,
            options: {}
        }

        let id = ''

        if (type === 1) {
            id = 'top-chart'
        } else {
            id = 'playlist-chart'
        }

        var chart = new Chart(
            document.getElementById(id) as HTMLCanvasElement,
            config
        )

    }

    return (
        <div id='feature-chart-root'>

            { show_error_alert && 
                <div style={{marginBottom: '1rem'}}>
                    <Alert showIcon message={'oops... something went wrong'} type='error' />
                </div> 
            }

            { type === 1 && <canvas id='top-chart'></canvas> }
            { type === 2 && <canvas id='playlist-chart'></canvas> }
            
        </div>
    )
}

export default FeatureChart