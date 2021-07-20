import 'antd/dist/antd.css'
import { Layout } from 'antd'
import './App.css';
import Nav from './components/nav/Nav'
import Main from './Main'

const { Footer, Content } = Layout;

function App() {
    return (
        <div className="App">
            <Layout style={{ minHeight: '100vh' }}>
                <Nav />
                <Layout>
                    <Content style={{ padding: '16px 16px', margin: '16px 16px 0 16px', backgroundColor: '#454545' }}>
                        <Main />
                    </Content>
                    <Footer style={{ textAlign: 'center' }}>
                        created by <a href='https://github.com/LeonDJ7'>Jared Dye</a>, <a href='https://github.com/LeonDJ7'>Leon Djusberg</a>, and <a href='https://github.com/adamgilbert912'>Adam Gilbert</a>
                    </Footer>
                </Layout>
            </Layout>
        </div>
    )
}

export default App;
