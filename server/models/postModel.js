import Base from './base.js'

class Post extends Base {
    instance;

    constructor() {
        super('post')
    }

    static getInstance() {
        if(!this.instance) {
            this.instance = new Post();
        }
        return this.instance;
    }

}

export default Post