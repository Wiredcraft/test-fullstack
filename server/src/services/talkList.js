"user strict";
const {
    LightningTalk
} = require("../models/LightningTalk");

exports.TalkListService = class TalkListService {
    static async findTalk(sortBy){
        let talkLists
        try {
            if(sortBy){
                talkLists = await LightningTalk.findAll({
                    order: [[sortBy, 'DESC']]
                })          
            }else{
                talkLists = await LightningTalk.findAll({
                    order: [['createdAt', 'DESC']]
                })    
            }
        } catch (error) {
            console.log(error)
        }
        console.log("-----------talkLists--------------",talkLists)
        return talkLists
    
    }
    
    static async patchTalk(id,data){
        console.log("patchTalk",id,data)
        let talk
        try {
            await LightningTalk.update(data,{
                where:{
                    id  
                }
            })
            talk = await this.getTalk(id)
        } catch (error) {
            console.log(error)
        }
        return talk
    }
    
    static async getTalk(id){
        let talk
        try {
            talk = await LightningTalk.findOne({
                id
            })
        } catch (error) {
            console.log(error)
        }
        return talk
    }
    
    static async createTalk(data){
        console.log("createTalk(data)",data)
        let talk
        try {
            talk = await LightningTalk.create(
                data
            )
        } catch (error) {
            console.log(error)
        }
        return talk
    }
}