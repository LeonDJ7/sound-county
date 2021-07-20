import React from 'react'
import { NavLink } from "react-router-dom"
import 'antd/dist/antd.css'
import { Layout, Menu } from 'antd'
import { BarChartOutlined, SlidersOutlined, MailOutlined, UserOutlined } from '@ant-design/icons'
import './Nav.css'

const { Sider } = Layout;

interface Props {
    
}
const Nav: React.FC<Props> = (props) => {

    const [collapsed, setCollapsed] = React.useState<boolean>(true)

    const onCollapse = () => {
        setCollapsed(!collapsed)
    }

    return (

            <Sider id='nav-root' collapsible collapsed={collapsed} onCollapse={onCollapse}>
                <img className="logo" src='' alt='' />
                <Menu id='nav-menu' theme='light' defaultSelectedKeys={['3']} mode="inline">

                    <Menu.Item key="1" >
                        <NavLink className='nav-option-title' to='/statistics'>
                            <BarChartOutlined />
                            <span> Statistics </span>
                        </NavLink>
                    </Menu.Item>

                    <Menu.Item key="2" >
                        <NavLink className='nav-option-title' to='/recommended'>
                            <SlidersOutlined />
                            <span> Recommended </span>
                        </NavLink>
                    </Menu.Item>

                    <Menu.Item key="3" >
                        <NavLink className='nav-option-title' to='/'>
                            <UserOutlined />
                            <span> Profile </span>
                        </NavLink>
                    </Menu.Item>

                    <Menu.Item key="4" >
                        <NavLink className='nav-option-title' to='/contact'>
                            <MailOutlined />
                            <span> Contact </span>
                        </NavLink>
                    </Menu.Item>

                </Menu>
            </Sider>
        
    )
}

export default Nav