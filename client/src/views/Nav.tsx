import React from 'react'
import { Link } from "react-router-dom"
import 'antd/dist/antd.css'
import { Typography, Space } from 'antd'
// import { UserOutlined, MenuOutlined } from '@ant-design/icons'
import '../../css/Nav.css'

interface Props {
    
}
const Nav: React.FC<Props> = (props) => {

    const [hidden, setHidden] = React.useState<boolean>(true)

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