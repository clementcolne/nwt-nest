import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { defaultIfEmpty, filter, from, map, Observable } from 'rxjs';
import { CreateLikeDto } from '../dto/create-like.dto';
import { Like, LikeDocument } from '../schemas/like.schema';

@Injectable()
export class LikeDao {
  /**
   * Class constructor
   *
   * @param {Model<UserDocument>} _likeModel instance of the model representing a like
   */
  constructor(
    @InjectModel(Like.name)
    private readonly _likeModel: Model<LikeDocument>,
  ) {}

  /**
   * Call mongoose method, call toJSON on each result and returns LikeModel[] or undefined
   *
   * @return {Observable<Like[] | void>}
   */
  find = (id: string): Observable<Like[] | void> =>
    from(this._likeModel.find({ idLiker: id })).pipe(
      filter((docs: LikeDocument[]) => !!docs && docs.length > 0),
      map((docs: LikeDocument[]) => docs.map((_: LikeDocument) => _.toJSON())),
      defaultIfEmpty(undefined),
    );

  /**
   * Add like in db
   *
   * @param {CreateLikeDto} like to create
   *
   * @return {Observable<Like>}
   */
  save = (like: CreateLikeDto): Observable<Like> =>
    from(new this._likeModel(like).save()).pipe(
      map((doc: LikeDocument) => doc.toJSON()),
    );

  /**
   * Delete a like in the db
   *
   * @param {string} idLiker
   * @param {string} idLiked
   *
   * @return {Observable<Like | void>}
   */
  findAndRemove = (idLiker: string, idLiked: string): Observable<Like | void> =>
    from(
      this._likeModel.findOneAndDelete({
        $and: [{ idLiker: idLiker }, { idLiked: idLiked }],
      }),
    ).pipe(
      filter((doc: LikeDocument) => !!doc),
      map((doc: LikeDocument) => doc.toJSON()),
      defaultIfEmpty(undefined),
    );
}
