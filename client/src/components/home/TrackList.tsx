import React from 'react'
import 'antd/dist/antd.css'
import { Skeleton } from 'antd'
import '../../css/TrackList.css'
import fake_list_icon from '../../assets/profile-white.png'

interface Props {
    type: string,
    list_id: number,
    data: any[]
    loading: boolean
}
const TrackList: React.FC<Props> = (props) => {

    let type = props.type
    let list_id = props.list_id
    let data = props.data
    let loading = props.loading

    return (
        <span id='track-list-root'>

            { (list_id === 1) && <div className='track-list-header'>
                {type}
            </div> }

            { (list_id === 2) && <div className='track-list-header' style={{ backgroundColor: '#A6AF96'}}>
                {type}
            </div> }       
        
            <div className='track-list-container'>

                { !loading && data && data.length > 0 && data.map( (item, i) => {
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
                                                <span className='track-list-subtext' style={{color: 'white'}}> {'|'} </span>
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
                        <Skeleton loading /> 
                    </span>
                }

            </div>
        
        </span>

    )
}

export default TrackList