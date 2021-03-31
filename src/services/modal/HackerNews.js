import { PostRequest } from '@services/http';
import { dateFormat, hasArrayData } from '@services/common/helper';
import Config from '@config';
import { Logger } from "@services/logger";
class HackerNews {
    constructor(data) { 
        this.user=data.user,
        this.topic = data.topic,
        this.votes= data.votes
    }
}

HackerNews.query = async function (data) {
    try {
        let queryResult = await PostRequest(`${Config.Api.Base}${Config.Api.GetHackerNews}`, {
        })
        return {
            allCount: queryResult.total,
            data: hasArrayData(queryResult.data) ? queryResult.data.map(item => (new HackerNews(item,data.listName))) : [],
            success:queryResult.success,
        };
    } catch (e) {
    
        Logger.Error("HackerNews query", e)
        throw (e);
    }
}
HackerNews.add = async function (data) {
    try {
        let queryResult = await PostRequest(`${Config.Api.Base}${Config.Api.AddHackerNews}`, {
            user:data.user,
            topic:data.topic,
        })
        return {
            allCount: queryResult.total,
            data: hasArrayData(queryResult.data) ? queryResult.data.map(item => (new HackerNews(item,data.listName))) : [],
            success:queryResult.success,
        };
    } catch (e) {
    
        Logger.Error("HackerNews query", e)
        throw (e);
    }
}

export default HackerNews;