import {
  ConflictException,
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { UsersDao } from './dao/users.dao';
import {
  catchError,
  defaultIfEmpty,
  filter,
  from,
  map,
  mergeMap,
  Observable,
  of,
  throwError,
} from 'rxjs';
import { UserEntity } from './entities/user.entity';
import { User } from './schemas/user.schema';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  /**
   * Class constructor
   *
   * @param {UsersDao} _userDao instance of the DAO
   */
  constructor(private readonly _userDao: UsersDao) {}

  /**
   * Returns all existing users in the list
   *
   * @returns {Observable<UserEntity[] | void>}
   */
  findAll = (): Observable<UserEntity[] | void> =>
    this._userDao.find().pipe(
      filter((_: User[]) => !!_),
      map((_: User[]) => _.map((__: User) => new UserEntity(__))),
      defaultIfEmpty(undefined),
    );

  /**
   * Returns one user of the list matching id in parameter
   *
   * @param {string} username of the user
   *
   * @returns {Observable<UserEntity>}
   */
  findOne = (username: string): Observable<UserEntity> =>
    this._userDao.findByUsername(username).pipe(
      catchError((e) =>
        throwError(() => new UnprocessableEntityException(e.message)),
      ),
      mergeMap((_: User) =>
        !!_
          ? of(new UserEntity(_))
          : throwError(
              () =>
                new NotFoundException(
                  `People with username '${username}' not found`,
                ),
            ),
      ),
    );

  /**
   * Returns one user of the list matching id in parameter
   *
   * @param {string} id of the user
   *
   * @returns {Observable<UserEntity>}
   */
  findById = (id: string): Observable<UserEntity> =>
    this._userDao.findById(id).pipe(
      catchError((e) =>
        throwError(() => new UnprocessableEntityException(e.message)),
      ),
      mergeMap((_: User) =>
        !!_
          ? of(new UserEntity(_))
          : throwError(
              () => new NotFoundException(`People with id '${id}' not found`),
            ),
      ),
    );

  /**
   * Check if user already exists and add it in user list
   *
   * @param user to create
   *
   * @returns {Observable<UserEntity>}
   */
  create(user: CreateUserDto): Observable<UserEntity> {
    return this._addUser(user).pipe(
      mergeMap((_: CreateUserDto) => this._hashPassword(_)),
      mergeMap((_: CreateUserDto) => this._userDao.save(_)),
      catchError((e) =>
        e.code === 11000
          ? throwError(
              () =>
                new ConflictException(
                  `People with username '${user.username}' already exists`,
                ),
            )
          : throwError(() => new UnprocessableEntityException(e.message)),
      ),
      map((_: User) => new UserEntity(_)),
    );
  }

  /**
   * Deletes one user in users list
   *
   * @param {string} username of the user to delete
   *
   * @returns {Observable<void>}
   */
  delete = (username: string): Observable<void> =>
    this._userDao.findOneAndRemove(username).pipe(
      catchError((e) =>
        throwError(() => new UnprocessableEntityException(e.message)),
      ),
      mergeMap((_: User) =>
        !!_
          ? of(undefined)
          : throwError(
              () =>
                new NotFoundException(
                  `User with username '${username}' not found`,
                ),
            ),
      ),
    );

  /**
   * Update a user in users list
   *
   * @param {string} username of the user to update
   * @param user data to update
   *
   * @returns {Observable<UserEntity>}
   */
  update = (username: string, user: UpdateUserDto): Observable<UserEntity> =>
    of(user).pipe(
      mergeMap((user) =>
        !!user && user.password ? this._hashPasswordUpdate(user) : of(user),
      ),
      mergeMap((user) =>
        this._userDao.findByUsernameAndUpdate(username, user).pipe(
          catchError((e) =>
            e.code === 11000
              ? throwError(
                  () =>
                    new ConflictException(
                      `People with username '${user.username}' or email '${user.email}' already exists`,
                    ),
                )
              : throwError(() => new UnprocessableEntityException(e.message)),
          ),
          mergeMap((_: User) =>
            !!_
              ? of(new UserEntity(_))
              : throwError(
                  () =>
                    new NotFoundException(
                      `People with username '${user.username}' not found`,
                    ),
                ),
          ),
        ),
      ),
    );

  /**
   * Hash the password of the user
   * @param createUserDto CreateUserDto
   */
  private _hashPassword(
    createUserDto: CreateUserDto,
  ): Observable<CreateUserDto> {
    return from(
      bcrypt.hash(createUserDto.password, 10).then((value) => {
        createUserDto.password = value;
        return createUserDto;
      }),
    );
  }

  /**
   * Hash the password of the user
   * @param updateUserDto UpdateUserDto
   */
  private _hashPasswordUpdate(
    updateUserDto: UpdateUserDto,
  ): Observable<UpdateUserDto> {
    return from(
      bcrypt.hash(updateUserDto.password, 10).then((value) => {
        updateUserDto.password = value;
        return updateUserDto;
      }),
    );
  }

  /**
   * Add user with good data in user list
   *
   * @param user to add
   *
   * @returns {Observable<CreateUserDto>}
   *
   * @private
   */
  private _addUser = (user: CreateUserDto): Observable<CreateUserDto> =>
    of({
      ...user,
      profilePicture: '/default/default.png',
      description: '',
      nbFollow: 0,
      nbFollowers: 0,
      isPrivate: false,
    });
}
