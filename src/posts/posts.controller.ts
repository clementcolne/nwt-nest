import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { HandlerParams } from './validators/handler-params';
import { CreatePostDto } from './dto/create-post.dto';
import { PostsService } from './posts.service';
import { Observable } from 'rxjs';
import { PostEntity } from './entities/post.entity';
import {
  ApiBadRequestResponse,
  ApiBody,
  ApiCreatedResponse,
  ApiNoContentResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiParam,
  ApiUnprocessableEntityResponse,
} from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt-auth.guards';
import { HttpInterceptor } from '../interceptors/http.interceptor';
import { UpdatePostDto } from './dto/update-post.dto';

@Controller('posts')
@UseInterceptors(HttpInterceptor)
export class PostsController {
  constructor(private _postService: PostsService) {}
  /**
   * Handler to answer to GET /posts route
   *
   * @returns Observable<CommentEntity[] | void>
   */
  @ApiOkResponse({
    description: 'Returns an array of posts',
    type: PostEntity,
    isArray: true,
  })
  @ApiNoContentResponse({ description: 'No post exists in database' })
  @UseGuards(JwtAuthGuard)
  @Get()
  findAll(): Observable<PostEntity[] | void> {
    return this._postService.findAll();
  }

  /**
   * Handler to answer to GET /posts/user/:id route
   *
   * @param {HandlerParams} params list of route params to take post id
   *
   * @returns Observable<PostEntity>
   */
  @ApiOkResponse({
    description: 'Returns the posts for the given id user "id"',
    type: PostEntity,
  })
  @ApiNotFoundResponse({
    description:
      'Post with the given author "id" doesn\'t exist in the database',
  })
  @ApiBadRequestResponse({ description: 'Parameter provided is not good' })
  @ApiUnprocessableEntityResponse({
    description: "The request can't be performed in the database",
  })
  @ApiParam({
    name: 'id',
    description: 'Unique identifier of the user in the database',
    type: String,
    allowEmptyValue: false,
  })
  @UseGuards(JwtAuthGuard)
  @Get('/user/:id')
  findByUser(@Param() params: HandlerParams): Observable<PostEntity[] | void> {
    return this._postService.findByUserId(params.id);
  }

  /**
   * Handler to answer to GET /posts/user/:id route
   *
   * @param {HandlerParams} params list of route params to take post id
   *
   * @returns Observable<PostEntity>
   */
  @ApiOkResponse({
    description: 'Returns the post for the given "id"',
    type: PostEntity,
  })
  @ApiNotFoundResponse({
    description: 'Post with the given "id" doesn\'t exist in the database',
  })
  @ApiBadRequestResponse({ description: 'Parameter provided is not good' })
  @ApiUnprocessableEntityResponse({
    description: "The request can't be performed in the database",
  })
  @ApiParam({
    name: 'id',
    description: 'Unique identifier of the post in the database',
    type: String,
    allowEmptyValue: false,
  })
  @UseGuards(JwtAuthGuard)
  @Get(':id')
  findOne(@Param() params: HandlerParams): Observable<PostEntity> {
    return this._postService.findOne(params.id);
  }

  /**
   * Handler to answer to POST /posts route
   *
   * @param createPostDto data to create
   *
   * @returns Observable<PostEntity>
   */
  @ApiCreatedResponse({
    description: 'The post has been successfully created',
    type: PostEntity,
  })
  @ApiBadRequestResponse({ description: 'Payload provided is not good' })
  @ApiUnprocessableEntityResponse({
    description: "The request can't be performed in the database",
  })
  @ApiBody({
    description: 'Payload to create a new post',
    type: CreatePostDto,
  })
  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() createPostDto: CreatePostDto): Observable<PostEntity> {
    return this._postService.create(createPostDto);
  }

  /**
   * Handler to answer to PUT /post/:id route
   *
   * @param {HandlerParams} params list of route params to take post id
   * @param updatePostDto data to update
   *
   * @returns Observable<PostEntity>
   */
  @ApiOkResponse({
    description: 'The post has been successfully updated',
    type: PostEntity,
  })
  @ApiNotFoundResponse({
    description: 'Post with the given "id" doesn\'t exist in the database',
  })
  @ApiBadRequestResponse({
    description: 'Parameter and/or payload provided are not good',
  })
  @ApiUnprocessableEntityResponse({
    description: "The request can't be performed in the database",
  })
  @ApiParam({
    name: 'id',
    description: 'Unique identifier of the post in the database',
    type: String,
    allowEmptyValue: false,
  })
  @ApiBody({ description: 'Payload to update a post', type: UpdatePostDto })
  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  update(
    @Param() params: HandlerParams,
    @Body() updatePostDto: UpdatePostDto,
  ): Observable<PostEntity> {
    return this._postService.update(params.id, updatePostDto);
  }

  /**
   * Handler to answer to DELETE /posts/:id route
   *
   * @param {HandlerParams} params list of route params to take post id
   *
   * @returns Observable<void>
   */
  @ApiNoContentResponse({
    description: 'The post has been successfully deleted',
  })
  @ApiNotFoundResponse({
    description: 'Post with the given "id" doesn\'t exist in the database',
  })
  @ApiBadRequestResponse({ description: 'Parameter provided is not good' })
  @ApiUnprocessableEntityResponse({
    description: "The request can't be performed in the database",
  })
  @ApiParam({
    name: 'id',
    description: 'Unique identifier of the post  in the database',
    type: String,
    allowEmptyValue: false,
  })
  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  delete(@Param() params: HandlerParams): Observable<void> {
    return this._postService.delete(params.id);
  }
}
