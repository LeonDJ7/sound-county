import React from 'react'
import 'antd/dist/antd.css'
import { Skeleton } from 'antd'
import './TrackList.css'
import fake_list_icon from '../../assets/profile-white.png'
import { refresh_access_token } from '../../tools'

interface Props {
    type: string,
    list_id: number
}
const TrackList: React.FC<Props> = (props) => {

    let type = props.type
    let list_id = props.list_id

    const [data, set_data] = React.useState<any[]>([])
    const [loading, set_loading] = React.useState<boolean>(false)
    const [show_error_alert, set_show_error_alert] = React.useState<boolean>(false)

    React.useEffect(() => {
        
        load_data()
        
    }, [])

    const load_data = () => {

        set_loading(true)
        let access_token = window.localStorage.getItem('access_token')
        let route = ''

        if (list_id === 1) {
            route = 'top_tracks'
        } else if (list_id === 2) {
            route = 'top_artists'
        }

        fetch(`http://localhost:4000/api/${route}?access_token=${access_token}&time_range=short_term`)
        .then((res: any) => res.json())
        .then((data: any[]) => {
            set_data(data)
            set_loading(false)
        })
        .catch( async (err: any) => {
            console.log(err)
            await refresh_access_token()
            access_token = window.localStorage.getItem('access_token')
            fetch(`http://localhost:4000/api/${route}?access_token=${access_token}&time_range=short_term`)
            .then((res: any) => res.json())
            .then((data: any[]) => {
                set_data(data)
                set_loading(false)
            })
            .catch((err: any) => {
                // okay now give up, figure out how to handle
                set_loading(false)
                set_show_error_alert(true)
                console.log(err)
            })
        })

    }

    return (
        <span id='track-list-root'>

            { (list_id === 1) && <div className='track-list-header'>
                {type}
            </div> }

            { (list_id === 2) && <div className='track-list-header' style={{ backgroundColor: '#F1EC78' }}>
                {type}
            </div> }       
        
            <div className='track-list-container'>

                { show_error_alert && <span className='track-list-item'> oops... something went wrong :[ </span> }

                { !loading && data && data.map( (item, i) => {
                    return (
                        <span key={i} className='track-list-item track-list-inline-info-container' >
                            <img src={item.image_url} alt={fake_list_icon} className='track-list-icon' />
                            <span style={{display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', textAlign: 'left'}}>

                                <span className='track-list-text'> {item.name} </span>

                                <span style={{marginLeft: '0.2rem', display: 'flex', flexDirection: 'row'}}>
                                    { (list_id === 1) && item.artists.map( (artist: string, i: number) => {
                                        return (
                                            <span key={i}>
                                                <span className='track-list-subtext'> {'|'} </span>
                                                <span className='track-list-subtext' style={{color: 'white', marginRight: '0.2rem'}} > {artist} </span>
                                            </span>
                                        )
                                    })}
                                </span>

                                <span style={{marginLeft: '0.2rem', display: 'flex', flexDirection: 'row'}}>
                                    { (list_id === 2) && item.genres.map( (genre: string, i: number) => {
                                        return (
                                            <span key={i}>
                                                <span className='track-list-subtext'> {'|'} </span>
                                                <span className='track-list-subtext' style={{marginRight: '0.2rem'}}> {genre} </span>
                                            </span>
                                        )
                                    })}
                                </span>

                            </span>
                            

                        </span>
                    )
                })}

                { loading && 
                    <span style={{ display: 'flex', height: '80%', alignItems: 'center' }}>
                        <Skeleton loading={true} /> 
                    </span>
                }

            </div>
        
        </span>

    )
}

export default TrackList