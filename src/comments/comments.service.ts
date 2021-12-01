import {
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { CommentsDao } from './dao/comments.dao';
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
import { CommentEntity } from './entities/comment.entity';
import { Comment } from './schemas/comment.schema';
import { CreateCommentDto } from './dto/create-comment.dto';

@Injectable()
export class CommentsService {
  /**
   * Class constructor
   *
   * @param {CommentsDao} _commentDao instance of the DAO
   */
  constructor(private readonly _commentDao: CommentsDao) {}

  /**
   * Returns one comment of the list matching id in parameter
   *
   * @param {string} id of the comment
   *
   * @returns {Observable<CommentEntity>}
   */
  findOne = (id: string): Observable<CommentEntity> =>
    this._commentDao.findById(id).pipe(
      catchError((e) =>
        throwError(() => new UnprocessableEntityException(e.message)),
      ),
      mergeMap((_: Comment) =>
        !!_
          ? of(new CommentEntity(_))
          : throwError(
              () => new NotFoundException(`Comment with id '${id}' not found`),
            ),
      ),
    );

  /**
   * Returns all existing comments for a given post id
   *
   * @returns {Observable<CommentEntity[] | void>}
   */
  findAll = (id: string): Observable<CommentEntity[] | void> =>
    this._commentDao.findByPostId(id).pipe(
      filter((_: Comment[]) => !!_),
      map((_: Comment[]) => _.map((__: Comment) => new CommentEntity(__))),
      defaultIfEmpty(undefined),
    );

  /**
   * Check if comment already exists and add it in comment list
   *
   * @param comment to create
   *
   * @returns {Observable<CommentEntity>}
   */
  create(comment: CreateCommentDto): Observable<CommentEntity> {
    return of(comment).pipe(
      mergeMap((_: CreateCommentDto) => this._commentDao.save(_)),
      catchError((e) =>
        throwError(() => new UnprocessableEntityException(e.message)),
      ),
      map((_: Comment) => new CommentEntity(_)),
    );
  }
}
