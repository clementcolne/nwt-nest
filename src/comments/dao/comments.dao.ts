import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { defaultIfEmpty, filter, from, map, Observable } from 'rxjs';
import { CreateCommentDto } from '../dto/create-comment.dto';
import { Comment, CommentDocument } from '../schemas/comment.schema';

@Injectable()
export class CommentsDao {
  /**
   * Class constructor
   *
   * @param {Model<CommentDocument>} _commentModel instance of the model representing a comment
   */
  constructor(
    @InjectModel(Comment.name)
    private readonly _commentModel: Model<CommentDocument>,
  ) {}

  /**
   * Call mongoose method, call toJSON on each result and returns CommentModel[] or undefined
   *
   * @return {Observable<Comment[] | void>}
   */
  find = (): Observable<Comment[] | void> =>
    from(this._commentModel.find({})).pipe(
      filter((docs: CommentDocument[]) => !!docs && docs.length > 0),
      map((docs: CommentDocument[]) =>
        docs.map((_: CommentDocument) => _.toJSON()),
      ),
      defaultIfEmpty(undefined),
    );

  /**
   * Returns one comment of the list matching id in parameter
   *
   * @param {string} id of the comment in the db
   *
   * @return {Observable<Comment | void>}
   */
  findById = (id: string): Observable<Comment | void> =>
    from(this._commentModel.findById(id)).pipe(
      filter((doc: CommentDocument) => !!doc),
      map((doc: CommentDocument) => doc.toJSON()),
      defaultIfEmpty(undefined),
    );

  /**
   * Call mongoose method, call toJSON on each result and returns CommentModel[] or undefined
   *
   * @return {Observable<Comment[] | void>}
   */
  findByPostId = (id: string): Observable<Comment[] | void> =>
    from(this._commentModel.find({ idPost: id })).pipe(
      filter((docs: CommentDocument[]) => !!docs && docs.length > 0),
      map((docs: CommentDocument[]) =>
        docs.map((_: CommentDocument) => _.toJSON()),
      ),
      defaultIfEmpty(undefined),
    );

  /**
   * Add comment in db
   *
   * @param {CreateCommentDto} comment to create
   *
   * @return {Observable<Comment>}
   */
  save = (comment: CreateCommentDto): Observable<Comment> =>
    from(new this._commentModel(comment).save()).pipe(
      map((doc: CommentDocument) => doc.toJSON()),
    );
}
