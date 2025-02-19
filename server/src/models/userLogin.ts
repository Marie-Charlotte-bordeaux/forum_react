import  { Document} from "mongoose";

export interface IUserLogin extends Document {
  _id: string;
  email: string;
  password: string;
}