import * as mongoose from 'mongoose';
import { Document } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type CommentDocument = Comment & Document;

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
export class Comment {
  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    auto: true,
  })
  _id: any;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  })
  idPost: any;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  })
  idAuthor: any;

  @Prop({
    type: String,
    required: true,
  })
  content: string;
}

export const CommentSchema = SchemaFactory.createForClass(Comment);
