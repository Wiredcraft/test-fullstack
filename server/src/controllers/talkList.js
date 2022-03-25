"use strict";
const {
  CommonService
} = require("../services/common");
const {
    TalkListService
} = require("../services/talkList");

exports.TalkListController = class TalkListController {
    static async findTalk(ctx){
        const {sortBy} = ctx.query
        console.log("-------------findTalk-----------",sortBy)
        try {
            const result = await TalkListService.findTalk(sortBy)
            ctx.body = CommonService.responseData(result);       
        } catch (error) {
            console.log(error)
        }
    }

    static async patchTalk(ctx){
        const id = ctx.params.id
        const body = ctx.request.body;
        try {
            const result = await TalkListService.patchTalk(id,body)
            ctx.body = CommonService.responseData(result);
        } catch (error) {
            console.log(error)
        }
    }

    static async getTalk(ctx){
        const id = ctx.params.id
        try {
            const result = await TalkListService.getTalk(id)
            ctx.body = CommonService.responseData(result);
        } catch (error) {
            console.log(error)
        }
    }

    static async createTalk(ctx){
        const data = ctx.request.body;
        try {
            const result = await TalkListService.createTalk(data)
            ctx.body = CommonService.responseData(result);
        } catch (error) {
            console.log(error)
        }
    }

}