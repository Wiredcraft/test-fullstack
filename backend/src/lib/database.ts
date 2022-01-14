import {
  Error,
  Model,
  Query,
} from 'mongoose';

/**
 * Database event subscriber to perform database operations.
 */
class Database {
  /**
    * List the elements inside a database model.
    * @param {Object} args
    * @param {Model<any>} args.model - Database model to interact with.
    * @return {Query<any, any>} Database query.
    */
  public list(
      {model}: { model: Model<any>})
    : Query<any, any> {
    return model.find({}, (error: Error, results: any): any => {
      if (error) {
        console.log(error);
      }
      console.log(results);
    });
  }

  /**
    * Get an element inside a database model.
    * @param {Object} args
    * @param {Model<any>} args.model - Database model to interact with.
    * @param {QueryOptions} args.params - Database query options.
    * @return {Query<any, any>} Database query.
    */
  public get(
      {model, params}: { model: Model<any>, params: any })
    : Query<any, any> {
    return model.findOne(params, (error: Error, results: any): any => {
      if (error) {
        console.log(error);
      }
      if (!results) {
        console.log('No results');
      } else {
        console.log(results);
      }
    });
  }

  /**
    * Delete an element inside a database model.
    * @param {Object} args
    * @param {Model<any>} args.model - Database model to interact with.
    * @param {QueryOptions} args.params - Database query options.
    * @return {Query<any, any>} Database query.
    */
  public delete(
      {model, params}: { model: Model<any>, params: any })
    : Query<any, any> {
    return model.findOneAndRemove({
      [params.id]: params.value}, (error: Error, results: Object,
    ) => {
      if (error) {
        console.log(error);
        return;
      }
      if (results) {
        return results;
      }
      if (!results) {
        console.log('No results');
      }
    });
  }

  /**
    * Update an element inside a database model.
    * @param {Object} args
    * @param {Model<any>} args.model - Database model to interact with.
    * @param {QueryOptions} args.params - Database query options.
    * @param {UpdateQuery} args.patch - Patch to apply inside database.
    * @return {Query<any, any>} Database query.
    */
  public update(
      {model, params, patch}: { model: Model<any>, params: any, patch: any })
    : Query<any, any> {
    return model.findOneAndUpdate(
        params, patch, (error: Error, results: Object) => {
          if (error) {
            console.log(error);
            return;
          }
          if (!results) {
            console.log('No results');
            return;
          } else {
            console.log(results);
          }
        });
  }

  /**
    * Save an element inside a database model.
    * @param {Object} args
    * @param {Model<any>} args.model - Database model to interact with.
    * @param {Object} args.data - Data to save inside database.
    * @async
    * @return {Query<any, any>} Database query.
    */
  public async save(
      {model, data}: { model: Model<any>, data: Object })
    : Promise<void> {
    try {
      // It's alright to make this linter exception here.
      // eslint-disable-next-line new-cap
      const document = new model({...data});
      await document.save();
    } catch (error) {
      console.log(error);
    }
  }
}

const db = new Database();

export default db;
