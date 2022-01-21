import React from 'react'
import 'antd/dist/antd.css'
import { Alert } from 'antd'
import '../../css/FeatureChart.css'
import { Chart, registerables } from 'chart.js'

Chart.register(...registerables);

const FeatureChart = (props) => {

    let type = props.type
    const [show_error_alert, set_show_error_alert] = React.useState(false)

    React.useEffect(() => {

        const set_up_chart = (feature_data) => {

            Chart.defaults.color ='lightgray';
            Chart.defaults.font.size = 12
    
            set_show_error_alert(false)
    
            const chart_data = {
                labels: [
                    'danceability',
                    'energy',
                    'valence',
                    'liveness',
                    'instrumentalness',
                    'acousticness',
                    'speechiness',
                ],
                datasets: [{
                    label: type === 1 ? 'top songs avg' : 'playlist avg',
                    fill: true,
                    data: [
                        feature_data['danceability'],
                        feature_data['energy'],
                        feature_data['valence'],
                        feature_data['liveness'],
                        feature_data['instrumentalness'],
                        feature_data['acousticness'],
                        feature_data['speechiness']
                    ],
                    backgroundColor: '#A1B592',
                    borderColor: 'white',
                }]
            }
            
            const config = {
                type: 'line',
                data: chart_data,
                options: {
                    scales: {
                        y: {
                            max: 1,
                            beginAtZero: true,
                        }
                    },
                }
            }
    
            let id = ''
    
            if (type === 1) {
                id = 'top-chart'
            } else {
                id = 'playlist-chart'
            }
    
            new Chart(
                document.getElementById(id),
                config
            )
    
        }

        try {
            set_up_chart(props.feature_data)
        }
        catch (err) {
            set_show_error_alert(true)
        }

    }, [props.feature_data, type])

    return (
        <div id='feature-chart-root'>

            { show_error_alert && 
                <div style={{marginBottom: '1rem'}}>
                    <Alert showIcon message={'oops... something went wrong loading your graph'} type='error' />
                </div> 
            }

            { type === 1 && !show_error_alert && <canvas id='top-chart'></canvas> }
            { type === 2 && !show_error_alert && <canvas id='playlist-chart'></canvas> }

        </div>
    )
}

export default FeatureChart