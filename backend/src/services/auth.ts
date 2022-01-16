import IUser, {IUserInputDTO} from '../interfaces/IUser';
import {UserModel} from '../types/models';
import argon2 from 'argon2';
import environment from '../lib/environment';
import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';
import {randomBytes} from 'crypto';
import userModel from '../models/user';

/**
 * Authentication service.
 */
class AuthService {
  userModel: mongoose.Model<UserModel>;
  jwtSecret: string;

  /**
    * Initialize User model.
  */
  constructor() {
    const {
      JWT_SECRET,
    } = environment.getEnvironment();

    this.userModel = userModel;
    this.jwtSecret = JWT_SECRET;
  }

  /**
   * Signup and retrieve the user interface and it's JSON web token.
   *
   * @async
   *
   * @param {IUserInputDTO} userInputDTO - The User input DTO.
   * @return {Promise<IUser, string>} - User and JWT.
   *
   * @throws {Error} - Throw if the user cannot be created.
   */
  public async register(userInputDTO: IUserInputDTO): Promise<
  { user: IUser; token: string }
  > {
    try {
      const salt: Buffer = randomBytes(32);
      const hashedPassword: string =
        await argon2.hash(userInputDTO.password, {salt});

      const userRecord = await this.userModel.create({
        ...userInputDTO,
        role: userInputDTO.username === 'admin' &&
         process.env.NODE_ENV !== 'production' ? 'admin' : 'user',
        salt: salt.toString('hex'),
        password: hashedPassword,
      });
      const token: string = this.generateToken(userRecord);
      if (!userRecord) {
        throw Error('User cannot be created');
      }
      const user = userRecord.toObject();
      return {user, token};
    } catch (error: any) {
      throw Error(error);
    }
  }

  /**
   * Login and retrieve the user interface and it's JSON web token.
   *
   * @async
   *
   * @param {string} username - The User username.
   * @param {string} password - The User password (hashed).
   * @return {Promise<IUser, string>} - User and JWT.
   *
   * @throws {Error} - Throw if the user credentials are invalid.
   */
  public async login(
      username: string, password: string,
  ): Promise<{ user: IUser; token: string }> {
    const userRecord = await this.userModel.findOne({username});

    if (!userRecord) {
      throw Error('User cannot be found');
    }
    const validPassword: boolean =
      await argon2.verify(userRecord.password, password);
    if (validPassword) {
      const token: string = this.generateToken(userRecord);
      const user = userRecord.toObject();
      return {user, token};
    } else {
      throw Error('Invalid user credentials');
    }
  }

  /**
   * Generate a JSON web token.
   *
   * @param {IUser} user User interface.
   * @return {string} JSON Web Token.
   */
  private generateToken(user: IUser): string {
    const today: Date = new Date();
    const exp: Date = new Date(today);
    exp.setDate(today.getDate() + 60);

    return jwt.sign(
        {
          _id: user._id.toString(),
          role: user.role,
          username: user.username,
          exp: exp.getTime() / 1000,
        },
        this.jwtSecret,
    );
  }
}

export default AuthService;
