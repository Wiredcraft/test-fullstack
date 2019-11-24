import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter, Route } from 'react-router-dom'
import { ConfigProvider } from 'antd';
import 'antd/dist/antd.css';
import Layout from './js/components/Layout/Layout'
import Home from './js/pages/Home'
import Newest from './js/pages/Newest'
import Past from './js/pages/Past'
import Comment from './js/pages/Comment'
import Submit from './js/pages/Submit'
import Detail from './js/pages/Detail'
import { Provider } from "react-redux";
import store from './js/store'

const App = () => {
    return(
        <Provider store={store}>
            <ConfigProvider>
                <BrowserRouter basename="/">
                    <Layout >
                        <Route path="/" render={() => <Home />} exact />
                        <Route path="/newest" render={() => <Newest />} />
                        <Route path="/past" render={() => <Past />} />
                        <Route path="/submit" render={() => <Submit />} />
                        <Route path="/talks/:id" render={() => <Detail />} />
                    </Layout>
                </BrowserRouter>
            </ConfigProvider>
        </Provider>
    )
}

ReactDOM.render(
    <App />,
    document.getElementById('app')
)

if(module.hot){
    module.hot.accept();
}