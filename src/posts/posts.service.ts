import {
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { PostsDao } from './dao/posts.dao';
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
import { PostEntity } from './entities/post.entity';
import { Post } from './schemas/post.schema';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';

@Injectable()
export class PostsService {
  /**
   * Class constructor
   *
   * @param {PostsDao} _postDao instance of the DAO
   */
  constructor(private readonly _postDao: PostsDao) {}

  /**
   * Returns all existing posts in the list
   *
   * @returns {Observable<PostEntity[] | void>}
   */
  findAll = (): Observable<PostEntity[] | void> =>
    this._postDao.find().pipe(
      filter((_: Post[]) => !!_),
      map((_: Post[]) => _.map((__: Post) => new PostEntity(__))),
      defaultIfEmpty(undefined),
    );

  /**
   * Returns all existing posts in the list for a given user
   *
   * @returns {Observable<PostEntity[] | void>}
   */
  findByUserId = (id: string): Observable<PostEntity[] | void> =>
    this._postDao.findByUserId(id).pipe(
      filter((_: Post[]) => !!_),
      map((_: Post[]) => _.map((__: Post) => new PostEntity(__))),
      defaultIfEmpty(undefined),
    );

  /**
   * Update a post in posts list
   *
   * @param {string} id of the post to update
   * @param post data to update
   *
   * @returns {Observable<PostEntity>}
   */
  update = (id: string, post: UpdatePostDto): Observable<PostEntity> =>
    this._postDao.findByIdAndUpdate(id, post).pipe(
      catchError((e) =>
        throwError(() => new UnprocessableEntityException(e.message)),
      ),
      mergeMap((_: Post) =>
        !!_
          ? of(new PostEntity(_))
          : throwError(
              () => new NotFoundException(`Post with id '${id}' not found`),
            ),
      ),
    );

  /**
   * Returns one post of the list matching id in parameter
   *
   * @param {string} id of the post
   *
   * @returns {Observable<PostEntity>}
   */
  findOne = (id: string): Observable<PostEntity> =>
    this._postDao.findById(id).pipe(
      catchError((e) =>
        throwError(() => new UnprocessableEntityException(e.message)),
      ),
      mergeMap((_: Post) =>
        !!_
          ? of(new PostEntity(_))
          : throwError(
              () => new NotFoundException(`Post with id '${id}' not found`),
            ),
      ),
    );

  /**
   * Check if post already exists and add it in post list
   *
   * @param post to create
   *
   * @returns {Observable<PostEntity>}
   */
  create(post: CreatePostDto): Observable<PostEntity> {
    return this._addPost(post).pipe(
      mergeMap((_: CreatePostDto) => this._postDao.save(_)),
      catchError((e) =>
        throwError(() => new UnprocessableEntityException(e.message)),
      ),
      map((_: Post) => new PostEntity(_)),
    );
  }

  /**
   * Deletes one post in people list
   *
   * @param {string} id of the post to delete
   *
   * @returns {Observable<void>}
   */
  delete = (id: string): Observable<void> =>
    this._postDao.findByIdAndRemove(id).pipe(
      catchError((e) =>
        throwError(() => new UnprocessableEntityException(e.message)),
      ),
      mergeMap((_: Post) =>
        !!_
          ? of(undefined)
          : throwError(
              () => new NotFoundException(`Post with id '${id}' not found`),
            ),
      ),
    );

  /**
   * Add post with good data in post list
   *
   * @param post to add
   *
   * @returns {Observable<CreatePostDto>}
   *
   * @private
   */
  private _addPost = (post: CreatePostDto): Observable<CreatePostDto> =>
    of({
      ...post,
      nbComments: 0,
      likes: 0,
    });
}
