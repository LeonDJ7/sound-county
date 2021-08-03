import React from 'react'
import 'antd/dist/antd.css'
import { Button } from 'antd'
import './Statistics.css'
import StatisticsList from './StatisticsList'

interface Props {
    
}
const Statistics: React.FC<Props> = (props) => {

    const [logged_in, set_logged_in] = React.useState<boolean>(false)

    React.useEffect(() => {
        
        let stored_email = window.localStorage.getItem('email')

        if (stored_email) {
            set_logged_in(true)
        }

    }, []);

    return (

        <React.Fragment>

            { logged_in && <span id='statistics-root'>

                <span id='statistics-lists-container'>

                    <StatisticsList type='Top Songs' list_id={1} />
                    <StatisticsList type='Top Artists' list_id={2} />
                    <StatisticsList type='Top Genres' list_id={3} />
                    <span className='statistics-fake-ad'> fake ad </span>
                    
                </span>

            </span> }

            { !logged_in && <Button className='default-button' style={{width: '120px', margin: 'auto'}} > log in </Button> }

        </React.Fragment>
        
    )
}

export default Statistics