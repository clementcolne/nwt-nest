import * as mongoose from 'mongoose';
import { Document } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type UserDocument = User & Document;

@Schema({
  toJSON: {
    virtuals: true,
    transform: (doc: any, ret: any) => {
      // delete obsolete data
      delete ret._id;
    },
  },
  versionKey: false,
})
export class User {
  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    auto: true,
  })
  _id: any;

  @Prop({
    type: String,
    required: true,
  })
  username: string;

  @Prop({
    type: String,
    required: true,
    trim: true,
  })
  email: string;

  @Prop({
    type: String,
    required: true,
  })
  password: string;

  @Prop({
    type: String,
    required: true,
    trim: true,
  })
  profilePicture: string;

  @Prop({
    type: String,
    required: false,
    trim: true,
  })
  description: string;

  @Prop({
    type: Number,
    required: true,
  })
  nbFollow: number;

  @Prop({
    type: Number,
    required: true,
  })
  nbFollowers: number;

  @Prop({
    type: Boolean,
    required: true,
  })
  isPrivate: boolean;
}

export const UserSchema = SchemaFactory.createForClass(User);
