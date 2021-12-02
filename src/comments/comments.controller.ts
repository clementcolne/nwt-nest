import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { HandlerParams } from './validators/handler-params';
import { CreateCommentDto } from './dto/create-comment.dto';
import { CommentsService } from './comments.service';
import { Observable } from 'rxjs';
import { CommentEntity } from './entities/comment.entity';
import {
  ApiBadRequestResponse, ApiBearerAuth,
  ApiBody,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiParam,
  ApiUnprocessableEntityResponse,
} from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt-auth.guards';
import { HttpInterceptor } from '../interceptors/http.interceptor';

@Controller('comments')
@UseInterceptors(HttpInterceptor)
export class CommentsController {
  constructor(private _commentService: CommentsService) {}

  /**
   * Handler to answer to GET /comments/:id route
   *
   * @param {HandlerParams} params list of route params to take comment id
   *
   * @returns Observable<CommentEntity>
   */
  @ApiOkResponse({
    description: 'Returns the comment for the given "id"',
    type: CommentEntity,
  })
  @ApiNotFoundResponse({
    description: 'Comment with the given "id" doesn\'t exist in the database',
  })
  @ApiBadRequestResponse({ description: 'Parameter provided is not good' })
  @ApiUnprocessableEntityResponse({
    description: "The request can't be performed in the database",
  })
  @ApiParam({
    name: 'id',
    description: 'Unique identifier of the comment in the database',
    type: String,
    allowEmptyValue: false,
  })
  @UseGuards(JwtAuthGuard)
  @Get(':id')
  findOne(@Param() params: HandlerParams): Observable<CommentEntity> {
    return this._commentService.findOne(params.id);
  }

  /**
   * Handler to answer to GET /comments/:id route
   *
   * @param {HandlerParams} params list of route params to take comment id
   *
   * @returns Observable<CommentEntity>
   */
  @ApiOkResponse({
    description: 'Returns the comments for the given "idPost"',
    type: CommentEntity,
  })
  @ApiNotFoundResponse({
    description: 'Post with the given "idPost" doesn\'t exist in the database',
  })
  @ApiBadRequestResponse({ description: 'Parameter provided is not good' })
  @ApiUnprocessableEntityResponse({
    description: "The request can't be performed in the database",
  })
  @ApiParam({
    name: 'idPost',
    description: 'Unique identifier of the post in the database',
    type: String,
    allowEmptyValue: false,
  })
  @UseGuards(JwtAuthGuard)
  @Get('/post/:id')
  findAll(@Param() params: HandlerParams): Observable<CommentEntity[] | void> {
    return this._commentService.findAll(params.id);
  }

  /**
   * Handler to answer to POST /comments route
   *
   * @returns Observable<CommentEntity>
   *
   * @param createCommentDto
   */
  @ApiCreatedResponse({
    description: 'The comment has been successfully created',
    type: CommentEntity,
  })
  @ApiBadRequestResponse({ description: 'Payload provided is not good' })
  @ApiUnprocessableEntityResponse({
    description: "The request can't be performed in the database",
  })
  @ApiBody({
    description: 'Payload to create a new comment',
    type: CreateCommentDto,
  })
  @ApiBearerAuth('jwt-auth')
  @UseGuards(JwtAuthGuard)
  @Post()
  create(
    @Body() createCommentDto: CreateCommentDto,
  ): Observable<CommentEntity> {
    return this._commentService.create(createCommentDto);
  }
}
