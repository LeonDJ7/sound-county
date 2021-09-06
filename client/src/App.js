import React from 'react'
import { NavLink } from "react-router-dom"
import 'antd/dist/antd.css'
import { Layout, Menu } from 'antd'
import './App.css';
import Main from './Main'
import { SlidersOutlined, MailOutlined, UserOutlined } from '@ant-design/icons'

const { Sider, Footer, Content } = Layout;

const App = () => {

    const [collapsed, setCollapsed] = React.useState(true)

    const onCollapse = () => {
        setCollapsed(!collapsed)
    }

    const ShrunkNav = (props) => {

        return (
            <span id='shrunk-nav-root' >

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
                <img className="logo" src='' alt='' />
                <Menu id='nav-menu' theme='light' defaultSelectedKeys={['1']} mode="inline">

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
