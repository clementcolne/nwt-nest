import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { defaultIfEmpty, filter, from, map, Observable } from 'rxjs';
import { CreatePostDto } from '../dto/create-post.dto';
import { Post, PostDocument } from '../schemas/post.schema';
import { UpdatePostDto } from '../dto/update-post.dto';

@Injectable()
export class PostsDao {
  /**
   * Class constructor
   *
   * @param {Model<UserDocument>} _postModel instance of the model representing a post
   */
  constructor(
    @InjectModel(Post.name)
    private readonly _postModel: Model<PostDocument>,
  ) {}

  /**
   * Call mongoose method, call toJSON on each result and returns PostModel[] or undefined
   *
   * @return {Observable<Post[] | void>}
   */
  find = (): Observable<Post[] | void> =>
    from(this._postModel.find({})).pipe(
      filter((docs: PostDocument[]) => !!docs && docs.length > 0),
      map((docs: PostDocument[]) => docs.map((_: PostDocument) => _.toJSON())),
      defaultIfEmpty(undefined),
    );

  /**
   * Call mongoose method, call toJSON on each result and returns PostModel[] or undefined
   *
   * @return {Observable<Post[] | void>}
   */
  findByUserId = (id: string): Observable<Post[] | void> =>
    from(this._postModel.find({ idAuthor: id })).pipe(
      filter((docs: PostDocument[]) => !!docs && docs.length > 0),
      map((docs: PostDocument[]) => docs.map((_: PostDocument) => _.toJSON())),
      defaultIfEmpty(undefined),
    );

  /**
   * Returns one post of the list matching id in parameter
   *
   * @param {string} id of the post in the db
   *
   * @return {Observable<Post | void>}
   */
  findById = (id: string): Observable<Post | void> =>
    from(this._postModel.findById(id)).pipe(
      filter((doc: PostDocument) => !!doc),
      map((doc: PostDocument) => doc.toJSON()),
      defaultIfEmpty(undefined),
    );

  /**
   * Update a post in post list
   *
   * @param {string} id
   * @param {UpdatePostDto} post
   *
   * @return {Observable<Post | void>}
   */
  findByIdAndUpdate = (
    id: string,
    post: UpdatePostDto,
  ): Observable<Post | void> =>
    from(
      this._postModel.findByIdAndUpdate(id, post, {
        new: true,
        runValidators: true,
      }),
    ).pipe(
      filter((doc: PostDocument) => !!doc),
      map((doc: PostDocument) => doc.toJSON()),
      defaultIfEmpty(undefined),
    );

  /**
   * Add post in db
   *
   * @param {CreatePostDto} post to create
   *
   * @return {Observable<Post>}
   */
  save = (post: CreatePostDto): Observable<Post> =>
    from(new this._postModel(post).save()).pipe(
      map((doc: PostDocument) => doc.toJSON()),
    );

  /**
   * Delete a post in the db
   *
   * @param {string} id
   *
   * @return {Observable<Post | void>}
   */
  findByIdAndRemove = (id: string): Observable<Post | void> =>
    from(this._postModel.findByIdAndRemove({ _id: id })).pipe(
      filter((doc: PostDocument) => !!doc),
      map((doc: PostDocument) => doc.toJSON()),
      defaultIfEmpty(undefined),
    );
}
