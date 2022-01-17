import Base from './base.js'

class User extends Base {
    instance;

    constructor() {
        super('user')
    }

    static getInstance() {
        if(!this.instance) {
            this.instance = new User();
        }
        return this.instance;
    }

}

export default User