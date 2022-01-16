import {TalkModel, UserModel, VoteModel} from 'types/models';
import ITalk from 'interfaces/ITalk';
import mongoose from 'mongoose';
import talkModel from '../models/talk';
import userModel from '../models/user';
import voteModel from '../models/vote';

/**
 * Talks service.
 */
class TalksService {
  talkModel: mongoose.Model<TalkModel>;
  userModel: mongoose.Model<UserModel>;
  voteModel: mongoose.Model<VoteModel>;
  aggregationQuery: Array<any>;

  /**
    * Initialize models and prepare aggregation query.
  */
  constructor() {
    this.talkModel = talkModel;
    this.userModel = userModel;
    this.voteModel = voteModel;

    // Base of aggragation query to fetch talk informations
    // in the right format and calculate the amount of vote.
    this.aggregationQuery = [
      {
        $lookup: {
          'from': 'users',
          'localField': 'user',
          'foreignField': '_id',
          'as': 'user',
        },
      },
      {
        $unwind: {
          path: '$user',
          preserveNullAndEmptyArrays: true,
          includeArrayIndex: 'userIndex',
        },
      },
      {
        $lookup: {
          from: 'votes',
          localField: 'votes',
          foreignField: '_id',
          as: 'vote',
          pipeline: [
            {$group: {_id: null, count: {$sum: '$vote'}}},
          ],
        },
      },
      {
        $unwind: {
          path: '$vote',
          preserveNullAndEmptyArrays: true,
          includeArrayIndex: 'voteIndex',
        },
      },
      {
        $project: {
          user: '$user.username',
          vote: '$vote.count',
          name: '$name',
          description: '$description',
        },
      },
    ];
  }

  /**
   * Patch a talk by its ID.
   *
   * @async
   *
   * @param {string} talkID - The talk ID.
   * @param {string} userID - The owner username.
   * @param {string} name - The new talk name.
   * @param {string} description - The new talk description.
   * @return {Promise<any>} - Patched talk.
   *
   * @throws {Error} - Throw if the talk cannot be found.
   */
  public async update(
      talkID: string,
      userID: string,
      name?: string,
      description?: string,
  ): Promise<any> {
    const data: any = {
      _id: talkID,
      user: userID,
    };
    if (name) {
      data.name = name;
    }
    if (description) {
      data.description = description;
    }

    const talkRecord = await this.talkModel.updateOne({
      ...data,
    });
    if (talkRecord.matchedCount === 0) {
      throw Error('Error while updating the talk');
    }
    return talkRecord;
  }

  /**
   * Delete a talk by its ID.
   *
   * @async
   *
   * @param {string} talkID - The talk ID.
   * @param {string} userID - The owner username.
   * @return {Promise<void>}
   *
   * @throws {Error} - Throw if the talk cannot be found.
   */
  public async remove(
      talkID: string,
      userID: string,
  ): Promise<void> {
    // Delete all votes related to the talk.
    await this.voteModel.deleteMany({talk: talkID});

    const talkRecord = await this.talkModel.deleteOne({
      _id: talkID,
      user: new mongoose.Types.ObjectId(userID),
    });

    if (talkRecord.deletedCount === 0) {
      throw Error('Error while deleting talk');
    }
  }

  /**
   * List all talks.
   *
   * @async
   *
   * @param {string} username - The talks owner username.
   * @return {Promise<ITalk>} - Found talks.
   *
   * @throws {Error} - Throw if no talk have been found.
   */
  public async list(
      username?: string,
  ): Promise<any[]> {
    const query = [...this.aggregationQuery];
    const index = query.findIndex((query) => query.$unwind);
    query.splice(
        index, 0,
        // Check if username is provided in the query.
        // If it is, find the user and get the talks.
        // Otherwise, get all talks.
        {$match: username?{'user.username': {$eq: username}}:{}},
    );

    const talks = await this.talkModel.aggregate([...query]);
    return talks;
  }


  /**
   * Get a talk by its ID.
   *
   * @async
   *
   * @param {string} talkID - The talk ID.
   * @return {Promise<ITalk>} - Found talk.
   *
   * @throws {Error} - Throw if the talk cannot be found.
   */
  public async get(talkID: string): Promise<any> {
    const id: mongoose.Types.ObjectId = new mongoose.Types.ObjectId(talkID);
    const talk = await this.talkModel.aggregate([
      {$match: {'_id': id}},
      ...this.aggregationQuery,
    ]);
    return talk;
  }

  /**
   * Create a talk.
   *
   * @async
   *
   * @param {ITalk} talkData - The talk name and description.
   * @param {string} userID - The user id of the talk author.
   * @return {Promise<ITalk>} - Created talk.
   *
   * @throws {Error} - Throw if the talk cannot be created.
   */
  public async create(
      talkData: ITalk, userID: string,
  ): Promise<ITalk> {
    const talkRecord = await this.talkModel.create({
      ...talkData,
      user: userID,
    });
    if (!talkRecord) {
      throw Error('Error while creating talk');
    }
    return talkRecord.toObject();
  }
}

export default TalksService;
