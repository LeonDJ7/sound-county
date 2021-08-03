import React from 'react'
import 'antd/dist/antd.css'
import { Select } from 'antd'
import './StatisticsList.css'
import fake_list_icon from '../../assets/profile-white.png'
import Artist from '../../models/Artist'

const { Option } = Select;

interface Props {
    type: string,
    list_id: number
}
const StatisticsList: React.FC<Props> = (props) => {

    let type = props.type
    let list_id = props.list_id
    let fake_data = [ 
        {
            name: 'Imagine', 
            artists: ['John Lennon'],
            image_url: '', 
            genre: 'psychedelic indie',
            genres: ['rock', 'pop'],
            show: 'The Crack Podcast'
        }, 
        {
            name: 'Ezequiles Dream for the future', 
            artists: ['Lil Zeke', 'reginald'],
            image_url: '', 
            genres: ['rock', 'pop'],
        } 
    ]

    return (
        
        <span className='list-container'>

            <span className='list-header statistics-list-inline-info-container'>
                <span className='list-title'> {type} </span>
                <Select defaultValue="long term" style={{ width: 130 }} bordered={false}>
                    <Option value="long term"> long term </Option>
                    <Option value="mid term"> mid term </Option>
                    <Option value="short term"> short term </Option>
                </Select>
            </span>

            { fake_data.map( (item, i) => {
                return (
                    <span key={i} className='list-item statistics-list-inline-info-container' >
                        <img src={fake_list_icon} alt={fake_list_icon} className='list-icon' />
                        <span className='list-text'> {item.name} </span>
                        <span style={{marginLeft: '0.2rem'}}>
                            { (list_id === 1) && item.artists.map( (artist, i) => {
                                return (
                                    <span key={i}>
                                        <span className='list-subtext'> {'|'} </span>
                                        <span className='list-subtext' style={{color: 'whitesmoke', marginRight: '0.2rem'}} > {artist} </span>
                                    </span>
                                )
                            })}
                        </span>

                        { (list_id === 1 || list_id === 2) && item.genres.map( (genre, i) => {
                            return (
                                <span key={i}>
                                    <span className='list-subtext'> {'|'} </span>
                                    <span className='list-subtext' style={{marginRight: '0.2rem'}}> {genre} </span>
                                </span>
                            )
                        })}

                    </span>
                )
            })}

            

        </span>

    )
}

export default StatisticsList