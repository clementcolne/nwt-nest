import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { ChatDao } from './dao/chat.dao';
import {
  catchError,
  defaultIfEmpty,
  filter,
  map,
  mergeMap,
  Observable,
  of,
  throwError,
} from 'rxjs';
import { ChatEntity } from './entities/chat.entity';
import { Chat } from './schemas/chat.schema';
import { CreateChatDto } from './dto/create-chat.dto';

@Injectable()
export class ChatService {
  /**
   * Class constructor
   *
   * @param {ChatDao} _chatDao instance of the DAO
   */
  constructor(private readonly _chatDao: ChatDao) {}

  /**
   * Returns all existing chats in the list
   *
   * @returns {Observable<ChatEntity[] | void>}
   */
  findAll = (src: string, dst: string): Observable<ChatEntity[] | void> =>
    this._chatDao.find(src, dst).pipe(
      filter((_: Chat[]) => !!_),
      map((_: Chat[]) => _.map((__: Chat) => new ChatEntity(__))),
      defaultIfEmpty(undefined),
    );

  /**
   * Returns all existing in in the list for a given user
   *
   * @returns {Observable<ChatEntity[] | void>}
   */
  findConversations = (id: string): Observable<ChatEntity[] | void> =>
    this._chatDao.findConversations(id).pipe(
      filter((_: Chat[]) => !!_),
      map((_: Chat[]) => _.map((__: Chat) => new ChatEntity(__))),
      defaultIfEmpty(undefined),
    );

  /**
   * Check if chat already exists and add it in chat list
   *
   * @param chat to create
   *
   * @returns {Observable<ChatEntity>}
   */
  create(chat: CreateChatDto): Observable<ChatEntity> {
    return of(chat).pipe(
      mergeMap((_: CreateChatDto) => this._chatDao.save(_)),
      catchError((e) =>
        throwError(() => new UnprocessableEntityException(e.message)),
      ),
      map((_: Chat) => new ChatEntity(_)),
    );
  }
}
