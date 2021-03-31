import React, { Suspense, lazy } from "react";
import { HashRouter, Route, Switch, Link } from 'react-router-dom';
import HackerNews from "./components/HackerNews/HackerNews";


export interface Info {
    userInfo: any;
    user: User;
    isShow: boolean;
    message?: string;
}
interface User {
    Title: string;
    ID: string;
}
interface IAppState {
    info: any
}
export class App extends React.Component<{}, IAppState> {
    private menus = {}
    constructor(props) {
        super(props);
        this.state = {
            info: undefined
        }
    }
    render() {
        return (
            <HashRouter>
                <div className="app" >
                    <div className="sr-app-content">
                        <Switch>
                            <Route path="/" component={HackerNews} ></Route>
                        </Switch>
                    
                    </div>

                </div>
            </HashRouter>)
    }

    componentDidMount() {
        this.onInitial()
    }

    /**
     * 初始化页面
     */
    async onInitial() {
        let info: Info = {
            user: undefined,
            userInfo: undefined,
            message: "",
            isShow: false,
        };
        try {
            // let userInfo = await this.getUserInfo();
            // info = await this.getSiteUserInfo(userInfo);
            // this.setState({
            //     info
            // });
        }
        catch (e) {
          
            info.message = e + "初始化失败";
        }
    }

   
}
export default App;
