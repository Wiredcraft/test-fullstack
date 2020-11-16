import TalkSQLDataSource from "./talks";
import UserDataSource from "./users";


const dataSources = () => ({
    users: new UserDataSource(),
    talks: new TalkSQLDataSource(),
})

export default dataSources
