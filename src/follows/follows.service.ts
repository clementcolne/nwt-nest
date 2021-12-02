import {
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { FollowDao } from './dao/follow.dao';
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
import { FollowEntity } from './entities/follow.entity';
import { Follow } from './schemas/follow.schema';
import { CreateFollowDto } from './dto/create-follow.dto';

@Injectable()
export class FollowsService {
  /**
   * Class constructor
   *
   * @param {FollowDao} _followDao instance of the DAO
   */
  constructor(private readonly _followDao: FollowDao) {}

  /**
   * Returns all existing follows in the list
   *
   * @returns {Observable<FollowEntity[] | void>}
   */
  findAll = (id: string): Observable<FollowEntity[] | void> =>
    this._followDao.find(id).pipe(
      filter((_: Follow[]) => !!_),
      map((_: Follow[]) => _.map((__: Follow) => new FollowEntity(__))),
      defaultIfEmpty(undefined),
    );

  /**
   * Check if follow already exists and add it in follow list
   *
   * @param follow to create
   *
   * @returns {Observable<FollowEntity>}
   */
  create(follow: CreateFollowDto): Observable<FollowEntity> {
    return of(follow).pipe(
      mergeMap((_: CreateFollowDto) => this._followDao.save(_)),
      catchError((e) =>
        throwError(() => new UnprocessableEntityException(e.message)),
      ),
      map((_: Follow) => new FollowEntity(_)),
    );
  }

  /**
   * Deletes one follow in follows list
   *
   * @param {string} follow to delete
   *
   * @returns {Observable<void>}
   */
  delete = (follow: CreateFollowDto): Observable<void> =>
    this._followDao.findAndRemove(follow.idFollower, follow.idFollowed).pipe(
      catchError((e) =>
        throwError(() => new UnprocessableEntityException(e.message)),
      ),
      mergeMap((_: Follow) =>
        !!_
          ? of(undefined)
          : throwError(
              () =>
                new NotFoundException(
                  `Follow with idFollower '${follow.idFollower}' and idFollowed '${follow.idFollowed}' not found`,
                ),
            ),
      ),
    );
}
