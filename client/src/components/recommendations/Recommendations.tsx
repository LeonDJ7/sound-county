import React from 'react'
import './Recommendations.css'
import 'antd/dist/antd.css'
import { Slider, Select, Button } from 'antd'
import $ from 'jquery'
import fake_list_icon from '../../assets/profile-white.png'
import Song from '../../models/Song';

const { Option } = Select;

interface Props {
    
}
const Recommendations: React.FC<Props> = (props) => {

    const [logged_in, set_logged_in] = React.useState<boolean>(false)

    // for setting alternating background colors on recommended songs
    React.useEffect(() => {
        
        let stored_email = window.localStorage.getItem('email')

        if (stored_email) {
            set_logged_in(true)
        }

        $('.recommendations-inline-info-container').each( (i, element) => {
            element.style.backgroundColor = random_green()
        })


    }, []);

    const random_green = () => {

        let palette = ['#D0EBAD', '#C1E098', '#B8CD9D', '#BAE286', '#B8CAA2', '#CADDB3', '#BED0A6', '#CFF2A3', '#BCCDA6']
        let random = Math.floor(Math.random() * palette.length)

        return palette[random]
    }

    const recommended_songs: Array<Song> = [
        {
            name: 'Let It Happen',
            artists: ['Tame Impala'],
            image_url: '',
            genres: ['psychedelic rock', 'indie sea shanties'],
            uri: ''
        },
        {
            name: 'Singy Song',
            artists: ['Dre Drexler'],
            image_url: '',
            genres: ['cool jazz', 'jet fuel'],
            uri: ''
        },
        {
            name: 'Ezequiels bars',
            artists: ['Lil zeke'],
            image_url: '',
            genres: ['demonic indie', 'classic rap'],
            uri: ''
        },
        {
            name: 'Ezequiels bars',
            artists: ['Lil zeke'],
            image_url: '',
            genres: ['demonic indie', 'classic rap'],
            uri: ''
        },
        {
            name: 'Ezequiels bars',
            artists: ['Lil zeke'],
            image_url: '',
            genres: ['demonic indie', 'classic rap'],
            uri: ''
        },
        {
            name: 'Ezequiels bars',
            artists: ['Lil zeke'],
            image_url: '',
            genres: ['demonic indie', 'classic rap'],
            uri: ''
        },
        {
            name: 'Ezequiels bars',
            artists: ['Lil zeke'],
            image_url: '',
            genres: ['demonic indie', 'classic rap'],
            uri: ''
        },
        {
            name: 'Ezequiels bars',
            artists: ['Lil zeke'],
            image_url: '',
            genres: ['demonic indie', 'classic rap'],
            uri: ''
        },
        {
            name: 'Ezequiels bars',
            artists: ['Lil zeke'],
            image_url: '',
            genres: ['demonic indie', 'classic rap'],
            uri: ''
        },
        {
            name: 'Ezequiels bars',
            artists: ['Lil zeke'],
            image_url: '',
            genres: ['demonic indie', 'classic rap'],
            uri: ''
        },
        {
            name: 'Ezequiels bars',
            artists: ['Lil zeke'],
            image_url: '',
            genres: ['demonic indie', 'classic rap'],
            uri: ''
        },
        
    ]

    return (

        <React.Fragment>

            { logged_in && <span id='recommendations-root'>

                <span id='recommendations-input-container'>
                    <span id='recommendations-popularity-slider-title'> Popularity </span>
                    <Slider max={10} min={1} defaultValue={1} ></Slider>
                    <Select defaultValue="playlist 1" style={{ width: 130 }} bordered={false}>
                        <Option value="long term"> playlist 1 </Option>
                        <Option value="mid term"> playlist 2 </Option>
                        <Option value="short term"> playlist 3 </Option>
                        <Option value="short term"> playlist 4 </Option>
                    </Select>
                    <Button id='recommendations-refresh-button'> refresh </Button>
                    <Button id='recommendations-queue-all-button'> queue all </Button>
                </span>

                <span id='recommended-songs-container'>
                    { recommended_songs.map( (song, i) => {
                        return (
                            <span key={i} className='recommendations-inline-info-container list-item'> 
                                <img src={fake_list_icon} alt={fake_list_icon} className='list-icon' />
                                <span className='list-text'> {song.name} </span>
                                <span className='sub-info-container'>
                                    { song.artists.map( (artist, i) => {
                                        return (
                                            <span key={i}>
                                                <span className='list-subtext'> {'|'} </span>
                                                <span style={{color: 'whitesmoke', marginRight: '0.2rem'}} className='list-subtext'> {artist} </span>
                                            </span>
                                        )
                                    })}
                                </span>
                                <span className='sub-info-container' style={{flexGrow: 1}}>
                                    { song.genres.map( (genre, i) => {
                                        return (
                                            <span>
                                                <span className='list-subtext'> {'|'} </span>
                                                <span className='list-subtext' style={{marginRight: '0.2rem'}}> {genre} </span>
                                            </span>
                                        )
                                    })}
                                </span>
                                <span className='list-add-button'> + </span>
                            </span>
                        )
                    })}
                </span>

            </span> }

            { !logged_in && <Button className='default-button' style={{margin: 'auto', width: '120px'}}> log in </Button> }

        </React.Fragment>
        
    )
}

export default Recommendations