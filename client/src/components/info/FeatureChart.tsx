import React from 'react'
import 'antd/dist/antd.css'
import { Alert } from 'antd'
import './FeatureChart.css'
import { Chart, ChartConfiguration, ChartData } from 'chart.js'
import { refresh_access_token } from '../../tools'


interface Props {
    feature_data: any
    type: number
}
const FeatureChart: React.FC<Props> = (props) => {

    let type = props.type
    let feature_data = props.feature_data

    const [show_error_alert, set_show_error_alert] = React.useState<boolean>(false)

    React.useEffect(() => {

        try {
            set_up_chart(feature_data)
        }
        catch (err: any) {
            set_show_error_alert(true)
        }
        

    }, [])

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