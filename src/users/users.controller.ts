import {
  Body, ClassSerializerInterceptor,
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
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UsersService } from './users.service';
import { Observable } from 'rxjs';
import { UserEntity } from './entities/user.entity';
import {
  ApiBadRequestResponse,
  ApiBody,
  ApiConflictResponse,
  ApiCreatedResponse,
  ApiNoContentResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiParam,
  ApiUnprocessableEntityResponse,
} from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt-auth.guards';
import { HttpInterceptor } from '../interceptors/http.interceptor';
import { HandlerParamsId } from './validators/handler-params-id';

@Controller('users')
@UseInterceptors(HttpInterceptor)
@UseInterceptors(ClassSerializerInterceptor)
export class UsersController {
  constructor(private _userService: UsersService) {}
  /**
   * Handler to answer to GET /users route
   *
   * @returns Observable<UserEntity[] | void>
   */
  @ApiOkResponse({
    description: 'Returns an array of users',
    type: UserEntity,
    isArray: true,
  })
  @ApiNoContentResponse({ description: 'No user exists in database' })
  @Get()
  findAll(): Observable<UserEntity[] | void> {
    return this._userService.findAll();
  }

  /**
   * Handler to answer to GET /users/:username route
   *
   * @param {HandlerParams} params list of route params to take user id
   *
   * @returns Observable<UserEntity>
   */
  @ApiOkResponse({
    description: 'Returns the user for the given "username"',
    type: UserEntity,
  })
  @ApiNotFoundResponse({
    description:
      'User with the given "username" doesn\'t exist in the database',
  })
  @ApiBadRequestResponse({ description: 'Parameter provided is not good' })
  @ApiUnprocessableEntityResponse({
    description: "The request can't be performed in the database",
  })
  @ApiParam({
    name: 'username',
    description: 'Unique identifier of the user in the database',
    type: String,
    allowEmptyValue: false,
  })
  @UseGuards(JwtAuthGuard)
  @Get(':username')
  findOne(@Param() params: HandlerParams): Observable<UserEntity> {
    return this._userService.findOne(params.username);
  }

  /**
   * Handler to answer to GET /users/:id route
   *
   * @param {HandlerParams} params list of route params to take user id
   *
   * @returns Observable<UserEntity>
   */
  @ApiOkResponse({
    description: 'Returns the user for the given "id"',
    type: UserEntity,
  })
  @ApiNotFoundResponse({
    description: 'User with the given "id" doesn\'t exist in the database',
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
  @Get('id/:id')
  findById(@Param() params: HandlerParamsId): Observable<UserEntity> {
    return this._userService.findById(params.id);
  }

  /**
   * Handler to answer to POST /users route
   *
   * @param createUserDto data to create
   *
   * @returns Observable<UserEntity>
   */
  @ApiCreatedResponse({
    description: 'The user has been successfully created',
    type: UserEntity,
  })
  @ApiConflictResponse({
    description: 'The user already exists in the database',
  })
  @ApiBadRequestResponse({ description: 'Payload provided is not good' })
  @ApiUnprocessableEntityResponse({
    description: "The request can't be performed in the database",
  })
  @ApiBody({
    description: 'Payload to create a new user',
    type: CreateUserDto,
  })
  @Post()
  create(@Body() createUserDto: CreateUserDto): Observable<UserEntity> {
    return this._userService.create(createUserDto);
  }

  /**
   * Handler to answer to PUT /users/:id route
   *
   * @param {HandlerParams} params list of route params to take user id
   * @param updateUserDto data to update
   *
   * @returns Observable<UserEntity>
   */
  @ApiOkResponse({
    description: 'The user has been successfully updated',
    type: UserEntity,
  })
  @ApiNotFoundResponse({
    description:
      'User with the given "username" doesn\'t exist in the database',
  })
  @ApiConflictResponse({
    description: 'The user already exists in the database',
  })
  @ApiBadRequestResponse({
    description: 'Parameter and/or payload provided are not good',
  })
  @ApiUnprocessableEntityResponse({
    description: "The request can't be performed in the database",
  })
  @ApiParam({
    name: 'username',
    description: 'Unique identifier of the user in the database',
    type: String,
    allowEmptyValue: false,
  })
  @ApiBody({ description: 'Payload to update a user', type: UpdateUserDto })
  @Patch(':username')
  @UseGuards(JwtAuthGuard)
  update(
    @Param() params: HandlerParams,
    @Body() updateUserDto: UpdateUserDto,
  ): Observable<UserEntity> {
    return this._userService.update(params.username, updateUserDto);
  }

  /**
   * Handler to answer to DELETE /users/:id route
   *
   * @param {HandlerParams} params list of route params to take user id
   *
   * @returns Observable<void>
   */
  @ApiNoContentResponse({
    description: 'The user has been successfully deleted',
  })
  @ApiNotFoundResponse({
    description:
      'User with the given "username" doesn\'t exist in the database',
  })
  @ApiBadRequestResponse({ description: 'Parameter provided is not good' })
  @ApiUnprocessableEntityResponse({
    description: "The request can't be performed in the database",
  })
  @ApiParam({
    name: 'username',
    description: 'Unique identifier of the user  in the database',
    type: String,
    allowEmptyValue: false,
  })
  @Delete(':username')
  @UseGuards(JwtAuthGuard)
  delete(@Param() params: HandlerParams): Observable<void> {
    return this._userService.delete(params.username);
  }
}
