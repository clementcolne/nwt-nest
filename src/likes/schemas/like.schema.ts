import * as mongoose from 'mongoose';
import { Document } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type LikeDocument = Like & Document;

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
export class Like {
  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    auto: true,
  })
  _id: any;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
  })
  idLiker: any;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
  })
  idLiked: any;
}

export const LikeSchema = SchemaFactory.createForClass(Like);
