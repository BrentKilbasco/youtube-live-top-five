import {
  Document,
  Schema,
  Model,
  model
} from 'mongoose';
import { IUser } from '../types';


export interface IUserModel extends IUser, Document {
  fullName(): string;
};

const userSchema: Schema<IUserModel> = new Schema<IUserModel>({
  googleId: String,
  tpp: String,
  credits: { type: Number, default: 0 },
});


const User: Model<IUserModel> = model<IUserModel>( 'users', userSchema );


module.exports.Schema = userSchema;
module.exports.User = User;
