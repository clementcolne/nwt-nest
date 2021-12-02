import {
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { LikeDao } from './dao/like.dao';
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
import { LikeEntity } from './entities/like.entity';
import { Like } from './schemas/like.schema';
import { CreateLikeDto } from './dto/create-like.dto';

@Injectable()
export class LikesService {
  /**
   * Class constructor
   *
   * @param {LikeDao} _likeDao instance of the DAO
   */
  constructor(private readonly _likeDao: LikeDao) {}

  /**
   * Returns all existing likes in the list
   *
   * @returns {Observable<LikeEntity[] | void>}
   */
  findAll = (id: string): Observable<LikeEntity[] | void> =>
    this._likeDao.find(id).pipe(
      filter((_: Like[]) => !!_),
      map((_: Like[]) => _.map((__: Like) => new LikeEntity(__))),
      defaultIfEmpty(undefined),
    );

  /**
   * Check if like already exists and add it in like list
   *
   * @param like to create
   *
   * @returns {Observable<LikeEntity>}
   */
  create(like: CreateLikeDto): Observable<LikeEntity> {
    return of(like).pipe(
      mergeMap((_: CreateLikeDto) => this._likeDao.save(_)),
      catchError((e) =>
        throwError(() => new UnprocessableEntityException(e.message)),
      ),
      map((_: Like) => new LikeEntity(_)),
    );
  }

  /**
   * Deletes one like in likes list
   *
   * @param {string} like to delete
   *
   * @returns {Observable<void>}
   */
  delete = (like: CreateLikeDto): Observable<void> =>
    this._likeDao.findAndRemove(like.idLiker, like.idLiked).pipe(
      catchError((e) =>
        throwError(() => new UnprocessableEntityException(e.message)),
      ),
      mergeMap((_: Like) =>
        !!_
          ? of(undefined)
          : throwError(
              () =>
                new NotFoundException(
                  `Like with idLiker '${like.idLiked}' and idLiked '${like.idLiked}' not found`,
                ),
            ),
      ),
    );
}
