import * as mongoose from 'mongoose';
import { Document } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type NotificationDocument = Notification & Document;

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
export class Notification {
  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    auto: true,
  })
  _id: any;

  @Prop({
    type: String,
    required: true,
  })
  author: string;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  })
  recipient: any;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  })
  content: string;

  @Prop({
    type: String,
    required: true,
  })
  type: string;

  @Prop({
    type: Number,
    required: true,
  })
  date: number;

  @Prop({
    type: Boolean,
    required: true,
  })
  isRead: boolean;
}

export const NotificationSchema = SchemaFactory.createForClass(Notification);
