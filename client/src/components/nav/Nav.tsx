import React from 'react'
import { Link } from "react-router-dom"
import 'antd/dist/antd.css'
import { Layout, Menu, Space } from 'antd'
import { PieChartOutlined, DesktopOutlined } from '@ant-design/icons'
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

        <React.Fragment>

            <Sider collapsible collapsed={collapsed} onCollapse={onCollapse}>
                <img className="logo" src='' alt='' />
                <Menu theme="dark" defaultSelectedKeys={['3']} mode="inline">
                    <Link to='/statistics'>
                        <Menu.Item key="1" icon={<PieChartOutlined />}> Statistics </Menu.Item>
                    </Link>
                    <Link to='/recommended'>
                        <Menu.Item key="2" icon={<DesktopOutlined />}> Recommended </Menu.Item>
                    </Link>
                    <Space id='space' />
                    { collapsed &&
                        <Link to='/' id='nav-options-container' style={{flexDirection: 'column'}}>
                            <Menu.Item key="3" icon={<PieChartOutlined />}></Menu.Item>
                        </Link>
                    }
                    { !collapsed &&
                        <Link to='/' id='nav-options-container' style={{flexDirection: 'row'}}>
                            <Menu.Item key="4" icon={<DesktopOutlined />}></Menu.Item>
                        </Link>
                    }
                </Menu>
            </Sider>
            
        </React.Fragment>
        
    )
}

export default Nav