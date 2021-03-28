const uuid = require('../utils/uuid')
const {Talks} = require('../db')
class Talk {
    list = Talks
        // 获取所有信息
    getAll() {
            return this.list.sort((a, b)=>{return b.number - a.number});
        }
        // 插入获取数据 @params 
    insert(params) {
            this.list.unshift({ id: uuid(), number: 0, userlist: [], ...params })
            return;
        }
        // 更新数据
    update(id, userId) {
      let target = this.list.find(talk => talk.id === id)
      if(!target){
        return 'can not find talk'
      }
      if(target.userlist.indexOf(userId) !== -1){
        return 'you already polled'
      }
      target.userlist.push(userId)
      target.number++
      return 'poll succeed'
    }
}

module.exports = new Talk;