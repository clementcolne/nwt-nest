import * as mongoose from 'mongoose';
import { Document } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type ChatDocument = Chat & Document;

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
export class Chat {
  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    auto: true,
  })
  _id: any;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
  })
  src: any;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
  })
  dst: any;

  @Prop({
    type: String,
    required: true,
  })
  author: any;

  @Prop({
    type: String,
    required: true,
  })
  message: any;
}

export const ChatSchema = SchemaFactory.createForClass(Chat);
