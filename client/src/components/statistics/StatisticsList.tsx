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

    const [data, set_data] = React.useState<Array<any>>([])
    const [time_range, set_time_range] = React.useState<string>('long term')

    const load_data = () => {

        let access_code = window.localStorage.getItem

        if (list_id === 1) {
            fetch(`http://localhost:4000/api/top_songs?access_code=${access_code}&time_range=${time_range}`)
            .then((res: any) => {
                return res.json()
            })
            .then((data: any) => {
                console.log(data)
                set_data(data)
            })
            .catch((err: any) => {
                console.log(err)
            })
        } 

        if (list_id === 2) {
            fetch(`http://localhost:4000/api/top_artists?access_code=${access_code}&time_range=${time_range}`)
            .then((res: any) => {
                return res.json()
            })
            .then((data: any) => {
                console.log(data)
                set_data(data)
            })
            .catch((err: any) => {
                console.log(err)
            })
        } 

        if (list_id === 3) {
            fetch(`http://localhost:4000/api/top_genres?access_code=${access_code}&time_range=${time_range}`)
            .then((res: any) => {
                return res.json()
            })
            .then((data: any) => {
                console.log(data)
                set_data(data)
            })
            .catch((err: any) => {
                console.log(err)
            })
        } 

    }

    React.useEffect(() => {
        
        load_data()

    }, []);

    return (
        
        <span className='list-container'>

            <span className='list-header statistics-list-inline-info-container'>
                <span className='list-title'> {type} </span>
                <Select defaultValue="long term" style={{ width: 130 }} bordered={false}>
                    <Option onClick={() => { set_time_range('long term') }} value="long term"> long term </Option>
                    <Option onClick={() => { set_time_range('mid term') }} value="mid term"> mid term </Option>
                    <Option onClick={() => { set_time_range('short term') }} value="short term"> short term </Option>
                </Select>
            </span>

            { data.map( (item, i) => {
                return (
                    <span key={i} className='list-item statistics-list-inline-info-container' >
                        <img src={fake_list_icon} alt={fake_list_icon} className='list-icon' />
                        <span className='list-text'> {item.name} </span>
                        <span style={{marginLeft: '0.2rem'}}>
                            { (list_id === 1) && item.artists.map( (artist: any, i: number) => {
                                return (
                                    <span key={i}>
                                        <span className='list-subtext'> {'|'} </span>
                                        <span className='list-subtext' style={{color: 'whitesmoke', marginRight: '0.2rem'}} > {artist} </span>
                                    </span>
                                )
                            })}
                        </span>

                        { (list_id === 1 || list_id === 2) && item.genres.map( (genre: any, i: number) => {
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