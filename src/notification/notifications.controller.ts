import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { HandlerParams } from './validators/handler-params';
import { CreateNotificationDto } from './dto/create-notification.dto';
import { NotificationsService } from './notifications.service';
import { Observable } from 'rxjs';
import { NotificationEntity } from './entities/notification.entity';
import {
  ApiBadRequestResponse, ApiBearerAuth,
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
import { UpdateUserDto } from '../users/dto/update-user.dto';

@Controller('notifications')
@UseInterceptors(HttpInterceptor)
export class NotificationsController {
  constructor(private _notificationsService: NotificationsService) {}

  /**
   * Handler to answer to GET /notifications/:id route
   *
   * @returns Observable<NotificationEntity[] | void>
   */
  @ApiOkResponse({
    description: 'Returns an array of notifications for a given user',
    type: NotificationEntity,
    isArray: true,
  })
  @ApiNoContentResponse({ description: 'No notifications exists in database' })
  @UseGuards(JwtAuthGuard)
  @Get(':id')
  findAll(
    @Param() params: HandlerParams,
  ): Observable<NotificationEntity[] | void> {
    return this._notificationsService.findAll(params.id);
  }

  /**
   * Handler to answer to POST /notifications route
   *
   * @returns Observable<NotificationEntity>
   *
   * @param createNotificationDto
   */
  @ApiCreatedResponse({
    description: 'The notification has been successfully created',
    type: NotificationEntity,
  })
  @ApiBadRequestResponse({ description: 'Payload provided is not good' })
  @ApiUnprocessableEntityResponse({
    description: "The request can't be performed in the database",
  })
  @ApiBody({
    description: 'Payload to create a new notification',
    type: CreateNotificationDto,
  })
  @ApiBearerAuth('jwt-auth')
  @UseGuards(JwtAuthGuard)
  @Post()
  create(
    @Body() createNotificationDto: CreateNotificationDto,
  ): Observable<NotificationEntity> {
    return this._notificationsService.create(createNotificationDto);
  }

  /**
   * Handler to answer to PATCH /notifications/:id route
   *
   * @param {HandlerParams} params list of route params to take notification id
   *
   * @returns Observable<UserEntity>
   */
  @ApiOkResponse({
    description: 'The notification has been successfully updated',
    type: NotificationEntity,
  })
  @ApiNotFoundResponse({
    description:
      'Notification with the given "id" doesn\'t exist in the database',
  })
  @ApiConflictResponse({
    description: 'The notification already exists in the database',
  })
  @ApiBadRequestResponse({
    description: 'Parameter and/or payload provided are not good',
  })
  @ApiUnprocessableEntityResponse({
    description: "The request can't be performed in the database",
  })
  @ApiParam({
    name: 'id',
    description: 'Unique identifier of the notification in the database',
    type: String,
    allowEmptyValue: false,
  })
  @ApiBody({
    description: 'Payload to update a notification',
    type: UpdateUserDto,
  })
  @Patch(':id')
  @ApiBearerAuth('jwt-auth')
  @UseGuards(JwtAuthGuard)
  update(@Param() params: HandlerParams): Observable<NotificationEntity> {
    return this._notificationsService.update(params.id);
  }
}
