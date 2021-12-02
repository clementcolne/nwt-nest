import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from '../schemas/user.schema';
import { Model } from 'mongoose';
import { defaultIfEmpty, filter, from, map, Observable } from 'rxjs';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';

@Injectable()
export class UsersDao {
  /**
   * Class constructor
   *
   * @param {Model<UserDocument>} _userModel instance of the model representing a User
   */
  constructor(
    @InjectModel(User.name)
    private readonly _userModel: Model<UserDocument>,
  ) {}

  /**
   * Call mongoose method, call toJSON on each result and returns UserModel[] or undefined
   *
   * @return {Observable<User[] | void>}
   */
  find = (): Observable<User[] | void> =>
    from(this._userModel.find({})).pipe(
      filter((docs: UserDocument[]) => !!docs && docs.length > 0),
      map((docs: UserDocument[]) => docs.map((_: UserDocument) => _.toJSON())),
      defaultIfEmpty(undefined),
    );

  /**
   * Returns one user of the list matching username in parameter
   *
   * @param {string} username of the user in the db
   *
   * @return {Observable<User | void>}
   */
  findByUsername = (username: string): Observable<User | void> =>
    from(this._userModel.findOne({ username: username })).pipe(
      filter((doc: UserDocument) => !!doc),
      map((doc: UserDocument) => doc.toJSON()),
      defaultIfEmpty(undefined),
    );

  /**
   * Returns one user of the list matching id in parameter
   *
   * @param {string} id of the user in the db
   *
   * @return {Observable<User | void>}
   */
  findById = (id: string): Observable<User | void> =>
    from(this._userModel.findById(id)).pipe(
      filter((doc: UserDocument) => !!doc),
      map((doc: UserDocument) => doc.toJSON()),
      defaultIfEmpty(undefined),
    );

  /**
   * Check if user already exists with index and add it in users list
   *
   * @param {CreateUserDto} user to create
   *
   * @return {Observable<User>}
   */
  save = (user: CreateUserDto): Observable<User> =>
    from(new this._userModel(user).save()).pipe(
      map((doc: UserDocument) => doc.toJSON()),
    );

  /**
   * Delete a user in users list
   *
   * @param {string} username
   *
   * @return {Observable<User | void>}
   */
  findOneAndRemove = (username: string): Observable<User | void> =>
    from(this._userModel.findOneAndRemove({ username: username })).pipe(
      filter((doc: UserDocument) => !!doc),
      map((doc: UserDocument) => doc.toJSON()),
      defaultIfEmpty(undefined),
    );

  /**
   * Update a user in users list
   *
   * @param {string} username
   * @param {UpdateUserDto} user
   *
   * @return {Observable<User | void>}
   */
  findByUsernameAndUpdate = (
    username: string,
    user: UpdateUserDto,
  ): Observable<User | void> =>
    from(
      this._userModel.findOneAndUpdate({ username: username }, user, {
        new: true,
        runValidators: true,
      }),
    ).pipe(
      filter((doc: UserDocument) => !!doc),
      map((doc: UserDocument) => doc.toJSON()),
      defaultIfEmpty(undefined),
    );
}
