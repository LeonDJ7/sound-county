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
                <Content style={{ margin: '0 16px' }}>
                    <Main />
                </Content>
                <Footer style={{ textAlign: 'center' }}>
                    created by Jared Dye, Leon Djusberg, and Adam Gilbert
                </Footer>
            </Layout>
        </div>
    )
}

export default App;
