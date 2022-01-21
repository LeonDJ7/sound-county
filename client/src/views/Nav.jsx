import React from 'react'
import { Link } from "react-router-dom"
import 'antd/dist/antd.css'
import { Typography } from 'antd'
import '../../css/Nav.css'

const Nav = (props) => {

    return (

        <span id='nav-root'>
            <span id='nav-items-container'>
                <Link to='/statistics'>
                    <Typography className='nav-item-typography'> Statistics </Typography>
                </Link>
                <Link to='/recommendations'>
                    <Typography className='nav-item-typography'> Recommendations </Typography>
                </Link>
            </span>
        </span>
        
    )
}

export default Nav