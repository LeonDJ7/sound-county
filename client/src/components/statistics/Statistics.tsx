import React from 'react'
import 'antd/dist/antd.css'
import { Select } from 'antd'
import './Statistics.css'
import StatisticsList from './StatisticsList'

const { Option } = Select;

interface Props {
    
}
const Statistics: React.FC<Props> = (props) => {

    return (
        <span id='statistics-root'>
            <span className='inline-info-container'>
                <span id='statistics-time-listened-title'> Time Listened</span>
                <Select defaultValue="all time" style={{ width: 120 }} bordered={false}>
                    <Option value="all time"> all time </Option>
                    <Option value="mid term"> mid term </Option>
                    <Option value="short term"> short term </Option>
                </Select>
            </span>
            <div id='statistics-time-listened-chart'></div>

            <span id='statistics-lists-container'>

                <StatisticsList list_id={1} />
                <StatisticsList list_id={2} />
                <StatisticsList list_id={3} />
                <StatisticsList list_id={4} />
                
            </span>


        </span>
    )
}

export default Statistics