import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { defaultIfEmpty, filter, from, map, Observable } from 'rxjs';
import { CreateFollowDto } from '../dto/create-follow.dto';
import { Follow, FollowDocument } from '../schemas/follow.schema';

@Injectable()
export class FollowDao {
  /**
   * Class constructor
   *
   * @param {Model<UserDocument>} _followModel instance of the model representing a follow
   */
  constructor(
    @InjectModel(Follow.name)
    private readonly _followModel: Model<FollowDocument>,
  ) {}

  /**
   * Call mongoose method, call toJSON on each result and returns FollowModel[] or undefined
   *
   * @return {Observable<Follow[] | void>}
   */
  find = (id: string): Observable<Follow[] | void> =>
    from(this._followModel.find({ idFollower: id })).pipe(
      filter((docs: FollowDocument[]) => !!docs && docs.length > 0),
      map((docs: FollowDocument[]) =>
        docs.map((_: FollowDocument) => _.toJSON()),
      ),
      defaultIfEmpty(undefined),
    );

  /**
   * Add follow in db
   *
   * @param {CreateFollowDto} follow to create
   *
   * @return {Observable<Follow>}
   */
  save = (follow: CreateFollowDto): Observable<Follow> =>
    from(new this._followModel(follow).save()).pipe(
      map((doc: FollowDocument) => doc.toJSON()),
    );

  /**
   * Delete a follow in the db
   *
   * @param {string} idFollower
   * @param {string} idFollowed
   *
   * @return {Observable<Follow | void>}
   */
  findAndRemove = (
    idFollower: string,
    idFollowed: string,
  ): Observable<Follow | void> =>
    from(
      this._followModel.findOneAndDelete({
        $and: [{ idFollower: idFollower }, { idFollowed: idFollowed }],
      }),
    ).pipe(
      filter((doc: FollowDocument) => !!doc),
      map((doc: FollowDocument) => doc.toJSON()),
      defaultIfEmpty(undefined),
    );
}
