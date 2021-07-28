import React from 'react'
import { NavLink } from "react-router-dom"
import 'antd/dist/antd.css'
import { Layout, Menu } from 'antd'
import './App.css';
import Main from './Main'
import { BarChartOutlined, SlidersOutlined, MailOutlined, UserOutlined } from '@ant-design/icons'

const { Sider, Footer, Content } = Layout;

const App = () => {

    const [collapsed, setCollapsed] = React.useState(true)

    const onCollapse = () => {
        setCollapsed(!collapsed)
    }

    return (
        <Layout className='App' style={{ minHeight: '100vh' }}>
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

            <Layout> 
                <Content style={{ display: 'flex', flexDirection: 'column', margin: '16px 16px 0px 16px', backgroundColor: '#454545' }}>
                    <Main />
                </Content>
                <Footer style={{ textAlign: 'center' }}>
                    created by <a href='https://github.com/LeonDJ7'>Jared Dye</a>, <a href='https://github.com/LeonDJ7'>Leon Djusberg</a>, and <a href='https://github.com/adamgilbert912'>Adam Gilbert</a>
                </Footer>
            </Layout>

        </Layout>
    )
}

// set app min width to size of iphone

export default App;
