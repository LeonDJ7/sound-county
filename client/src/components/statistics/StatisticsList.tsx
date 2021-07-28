import React from 'react'
import 'antd/dist/antd.css'
import { Select } from 'antd'
import './StatisticsList.css'
import fake_list_icon from '../../assets/profile-white.png'
import ListItem from '../../models/ListItem'

const { Option } = Select;

interface Props {
    list_id: number
}
const StatisticsList: React.FC<Props> = (props) => {

    let list_id = props.list_id
    let list_items = [ {name: 'John Lennon', image_url: ''}, {name: 'Trippie Redd', image_url: ''} ]

    return (
        
        <span className='list-container'>

            <span className='list-header inline-info-container'>
                <span className='list-title'> Top Artists </span>
                <Select defaultValue="all time" style={{ width: 120 }} bordered={false}>
                    <Option value="all time"> all time </Option>
                    <Option value="mid term"> mid term </Option>
                    <Option value="short term"> short term </Option>
                </Select>
            </span>

            { list_items.map( (item) => {
                return (
                    <span className='list-item inline-info-container'>
                        <img src={fake_list_icon} alt={fake_list_icon} className='list-icon' />
                        <span className='list-text'> {item.name} </span>
                    </span>
                )
            })}

            

        </span>

    )
}

export default StatisticsList