import * as mongoose from 'mongoose';
import { Document } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type PostDocument = Post & Document;

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
export class Post {
  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    auto: true,
  })
  _id: any;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  })
  idAuthor: any;

  @Prop({
    type: String,
    required: true,
  })
  media: string;

  @Prop({
    type: String,
    required: true,
  })
  mediaType: string;

  @Prop({
    type: String,
    required: false,
    trim: true,
  })
  description?: string;

  @Prop({
    type: Number,
    required: false,
  })
  likes?: number;

  @Prop({
    type: String,
    required: false,
  })
  location?: string;

  @Prop({
    type: Number,
    required: false,
  })
  nbComments?: number;
}

export const PostSchema = SchemaFactory.createForClass(Post);
