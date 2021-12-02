import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { defaultIfEmpty, filter, from, map, Observable } from 'rxjs';
import { CreateChatDto } from '../dto/create-chat.dto';
import { Chat, ChatDocument } from '../schemas/chat.schema';

@Injectable()
export class ChatDao {
  /**
   * Class constructor
   *
   * @param {Model<ChatDocument>} _chatModel instance of the model representing a chat
   */
  constructor(
    @InjectModel(Chat.name)
    private readonly _chatModel: Model<ChatDocument>,
  ) {}

  /**
   * Call mongoose method, call toJSON on each result and returns ChatModel[] or undefined
   *
   * @return {Observable<Like[] | void>}
   */
  find = (src: string, dst: string): Observable<Chat[] | void> =>
    from(
      this._chatModel.find({
        $or: [
          { $and: [{ src: src }, { dst: dst }] },
          { $and: [{ src: dst }, { dst: src }] },
        ],
      }),
    ).pipe(
      filter((docs: ChatDocument[]) => !!docs && docs.length > 0),
      map((docs: ChatDocument[]) => docs.map((_: ChatDocument) => _.toJSON())),
      defaultIfEmpty(undefined),
    );

  /**
   * Call mongoose method, call toJSON on each result and returns ChatModel[] or undefined
   *
   * @return {Observable<Chat[] | void>}
   */
  findConversations = (src: string): Observable<Chat[] | void> =>
    from(
      this._chatModel.find({
        $or: [{ src: src }, { dst: src }],
      }),
    ).pipe(
      filter((docs: ChatDocument[]) => !!docs && docs.length > 0),
      map((docs: ChatDocument[]) => docs.map((_: ChatDocument) => _.toJSON())),
      defaultIfEmpty(undefined),
    );

  /**
   * Add chat in db
   *
   * @param {CreateChatDto} chat to create
   *
   * @return {Observable<Chat>}
   */
  save = (chat: CreateChatDto): Observable<Chat> =>
    from(new this._chatModel(chat).save()).pipe(
      map((doc: ChatDocument) => doc.toJSON()),
    );
}
