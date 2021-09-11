import React from 'react'
import { NavLink } from "react-router-dom"
import 'antd/dist/antd.css'
import { Layout, Menu } from 'antd'
import './App.css';
import Main from './Main'
import { SlidersOutlined, MailOutlined, UserOutlined } from '@ant-design/icons'
import sound_county_logo from './assets/sound-county-logo.png'

const { Sider, Footer, Content } = Layout;

const App = () => {

    let path = window.location.pathname
    let nav_selection = ['1']

    if (path === '/profile') { nav_selection = ['2'] }
    if (path === '/contact') { nav_selection = ['3'] }

    const [collapsed, setCollapsed] = React.useState(true)

    const onCollapse = () => {
        setCollapsed(!collapsed)
    }

    const ShrunkNav = (props) => {

        return (
            <span id='shrunk-nav-root' >

                <img className='logo' src={sound_county_logo} alt=''></img>

                <span className='shrunk-link-background'>
                    <NavLink to='/'>
                        <SlidersOutlined />
                    </NavLink>
                </span>

                <span className='shrunk-link-background'>
                    <NavLink to='/profile'>
                        <UserOutlined />
                    </NavLink>
                </span>

                <span className='shrunk-link-background'>
                    <NavLink to='/contact'>
                        <MailOutlined />
                    </NavLink>
                </span>
                
            </span>
        )
    }

    return (
        <Layout className='App' style={{ minHeight: '100vh' }}>
            <Sider id='nav-root' collapsible collapsed={collapsed} onCollapse={onCollapse}>
                <img className="logo" src={sound_county_logo} alt='' />
                <Menu id='nav-menu' theme='light' defaultSelectedKeys={nav_selection} mode="inline">

                    <Menu.Item key="1" >
                        <NavLink to='/'>
                            <SlidersOutlined />
                            <span> Discover </span>
                        </NavLink>
                    </Menu.Item>

                    <Menu.Item key="2" >
                        <NavLink to='/profile'>
                            <UserOutlined />
                            <span> Profile </span>
                        </NavLink>
                    </Menu.Item>

                    <Menu.Item key="3" >
                        <NavLink to='/contact'>
                            <MailOutlined />
                            <span> Contact </span>
                        </NavLink>
                    </Menu.Item>

                </Menu>
            </Sider>

            <Layout> 
                <Content className='content'>
                    <ShrunkNav />
                    <Main />
                </Content>
                <Footer style={{ textAlign: 'center' }}>
                    created by <a href='https://leondj7.github.io/personal-website/'>Leon Djusberg</a>
                </Footer>
            </Layout>

        </Layout>
    )
}

// set app min width to size of iphone

export default App;
