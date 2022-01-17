
import PouchDB from 'pouchdb';
import _ from 'lodash';

const MyPrefixedPouch = PouchDB.defaults({
    prefix: '__db_'
});

export class Base {
    db;

    constructor(dbName) {
        if(!dbName) {
            throw new Error('Invalid dbName')
        }
        // this.db = new PouchDB('http://127.0.0.1:5984/'+dbName);
        this.db = new MyPrefixedPouch(dbName);
    }

    create(entity) {
        return this.db.post({
            ...entity,
            createdAt: Date.now()
        });
    }

    async get(obj) {
        const rows = await this.getAll();
        return rows.find(item=>{
            return _.isMatch(item, obj);
        });
    }

    async getAll(obj) {
        const docs = await this.db.allDocs({include_docs: true});
        const rows = docs.rows.map(item=>item.doc);
        if(!obj) {
            return rows;
        }

        return rows.filter(item=> {
            return _.isMatch(item, obj);
        });
    }

    delete(id) {
        return this.db.remove(id);
    }

}

export default Base;