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
import { CreateFollowDto } from './dto/create-follow.dto';
import { FollowsService } from './follows.service';
import { Observable } from 'rxjs';
import { FollowEntity } from './entities/follow.entity';
import {
  ApiBadRequestResponse,
  ApiBody,
  ApiCreatedResponse,
  ApiNoContentResponse,
  ApiOkResponse,
  ApiUnprocessableEntityResponse,
} from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt-auth.guards';
import { DeleteFollowDto } from './dto/delete-follow.dto';
import { HttpInterceptor } from '../interceptors/http.interceptor';

@Controller('follows')
@UseInterceptors(HttpInterceptor)
export class FollowsController {
  constructor(private _followsService: FollowsService) {}

  /**
   * Handler to answer to GET /follows/:id route
   *
   * @returns Observable<FollowEntity[] | void>
   */
  @ApiOkResponse({
    description: 'Returns an array of followed users for a given user',
    type: FollowEntity,
    isArray: true,
  })
  @ApiNoContentResponse({ description: 'No followed users exists in database' })
  @UseGuards(JwtAuthGuard)
  @Get(':id')
  findAll(@Param() params: HandlerParams): Observable<FollowEntity[] | void> {
    return this._followsService.findAll(params.id);
  }

  /**
   * Handler to answer to POST /follows route
   *
   * @returns Observable<FollowEntity>
   *
   * @param createFollowDto
   */
  @ApiCreatedResponse({
    description: 'The follow has been successfully created',
    type: FollowEntity,
  })
  @ApiBadRequestResponse({ description: 'Payload provided is not good' })
  @ApiUnprocessableEntityResponse({
    description: "The request can't be performed in the database",
  })
  @ApiBody({
    description: 'Payload to create a new follow',
    type: CreateFollowDto,
  })
  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() createFollowDto: CreateFollowDto): Observable<FollowEntity> {
    return this._followsService.create(createFollowDto);
  }

  /**
   * Handler to answer to DELETE /follows route
   *
   * @returns Observable<FollowEntity>
   *
   * @param deleteFollowDto
   */
  @ApiCreatedResponse({
    description: 'The follow has been successfully deleted',
    type: FollowEntity,
  })
  @ApiBadRequestResponse({ description: 'Payload provided is not good' })
  @ApiUnprocessableEntityResponse({
    description: "The request can't be performed in the database",
  })
  @ApiBody({
    description: 'Payload to create a new follow',
    type: DeleteFollowDto,
  })
  @UseGuards(JwtAuthGuard)
  @Delete()
  delete(@Body() deleteFollowDto: DeleteFollowDto): Observable<void> {
    return this._followsService.delete(deleteFollowDto);
  }
}
