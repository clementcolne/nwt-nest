import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { HandlerParams } from './validators/handler-params';
import { CreateLikeDto } from './dto/create-like.dto';
import { LikesService } from './likes.service';
import { Observable } from 'rxjs';
import { LikeEntity } from './entities/like.entity';
import {
  ApiBadRequestResponse,
  ApiBody,
  ApiCreatedResponse,
  ApiNoContentResponse,
  ApiOkResponse, ApiParam,
  ApiUnprocessableEntityResponse,
} from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt-auth.guards';
import { DeleteLikeDto } from './dto/delete-like.dto';
import { HttpInterceptor } from '../interceptors/http.interceptor';

@Controller('likes')
@UseInterceptors(HttpInterceptor)
export class LikesController {
  constructor(private _likesService: LikesService) {}

  /**
   * Handler to answer to GET /likes/:id route
   *
   * @returns Observable<NotificationEntity[] | void>
   */
  @ApiOkResponse({
    description: 'Returns an array of liked posts for a given user',
    type: LikeEntity,
    isArray: true,
  })
  @ApiParam({
    name: 'id',
    description: 'Unique identifier of the user in the database',
    type: String,
    allowEmptyValue: false,
  })
  @ApiNoContentResponse({ description: 'No liked posts exists in database' })
  @UseGuards(JwtAuthGuard)
  @Get(':id')
  findAll(@Param() params: HandlerParams): Observable<LikeEntity[] | void> {
    return this._likesService.findAll(params.id);
  }

  /**
   * Handler to answer to POST /likes route
   *
   * @returns Observable<LikeEntity>
   *
   * @param createLikeDto
   */
  @ApiCreatedResponse({
    description: 'The like has been successfully created',
    type: LikeEntity,
  })
  @ApiBadRequestResponse({ description: 'Payload provided is not good' })
  @ApiUnprocessableEntityResponse({
    description: "The request can't be performed in the database",
  })
  @ApiBody({
    description: 'Payload to create a new like',
    type: CreateLikeDto,
  })
  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() createLikeDto: CreateLikeDto): Observable<LikeEntity> {
    return this._likesService.create(createLikeDto);
  }

  /**
   * Handler to answer to POST /likes route
   *
   * @returns Observable<LikeEntity>
   *
   * @param deleteLikeDto
   */
  @ApiCreatedResponse({
    description: 'The like has been successfully deleted',
    type: LikeEntity,
  })
  @ApiBadRequestResponse({ description: 'Payload provided is not good' })
  @ApiUnprocessableEntityResponse({
    description: "The request can't be performed in the database",
  })
  @ApiBody({
    description: 'Payload to delete a like',
    type: DeleteLikeDto,
  })
  @UseGuards(JwtAuthGuard)
  @Delete()
  delete(@Body() deleteLikeDto: DeleteLikeDto): Observable<void> {
    return this._likesService.delete(deleteLikeDto);
  }
}
