import React from 'react';
import './HackerNews.css';
import ReactDom from 'react-dom';
import { Logger } from "@services/logger";
import Config from "@config";
import NewsInput from './NewsInput';
import NewsList from './NewsList';
import HackerNewsAPI from '@services/modal/HackerNews';

interface IHomeState {
     news:INews[];
   
}
export interface INews{
    topic:string;
    user:string;
    votes:number;
};
export class HackerNews extends React.Component<{}, IHomeState>{
    constructor(props) {
        super(props);
        this.state = {
            news: [],
        }
        document.title = "HackerNews";
    }

    render() {
        return (
            <div className="sr-HackerNews">
                <div className="sr-HackerNewsheader">
                    HackerNews
                </div>
                <NewsList news={this.state.news}  onVote={this.onVotes.bind(this)}/>
                <NewsInput 
                 onSubmit={this.onSubmit.bind(this)}
                />
                
            </div>
        )
    }
    componentDidMount(){ 
        this.onInitial();
    }
    public onInitial = async () => {
        try {
            //此处只有API调用框架，并未实现后台API
            // let result = await HackerNewsAPI.query();
            // debugger;
            // if (result.success){
            //     this.setState({news:result.data});
            // }
            //API接口失败则模拟处理
           let sampleNews=[
               {topic:"Today is a beatiful day",user:"Allen",votes:3},
               {topic:"I love China",user:"Li",votes:0},
               {topic:"MAGA!",user:"Donald Trump",votes:10}
            ]
            //按投票结果排序
            sampleNews= sampleNews.sort(this.sortVote);
            this.setState({news: sampleNews});
            
        } catch (e) {
            Logger.Error("HackerNews onInitial", e);
        }
    }

   
    public onSubmit = async (data:INews ) => {
         try {
            
            if (!data) return
            if (!data.user) return alert('Please enter user')
            if (!data.topic) return alert('Please enter topic')
            // 此处只有API调用框架，并未实现后台API
            // var request={user:data.user,topic:data.topic}
            // let result = await HackerNewsAPI.add(request);
           
            // if (result.success){
            //     this.setState({news:result.data});
            // }
            //API接口失败则模拟处理
            let tempNews=this.state.news;
            tempNews.push(data);
            //按投票结果排序
            tempNews= tempNews.sort(this.sortVote);
            this.setState({news:tempNews});  
        } catch (e) {
            Logger.Error("HackerNews onSubmit", e); 
        }
    
    }
    public onVotes (index) {
        let tempNews=this.state.news;
        tempNews[index].votes+=1;
        //按投票结果排序
        tempNews= tempNews.sort(this.sortVote);
        this.setState({news:tempNews});
    }
    //JS对象按votes排序
    public sortVote(a, b) {
        return b.votes - a.votes
    }
       
   
   
}
export default HackerNews;
// 挂载组件
ReactDom.render(
    <HackerNews></HackerNews>,
    document.getElementById("app")
);