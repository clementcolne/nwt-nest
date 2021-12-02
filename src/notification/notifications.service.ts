import {
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { NotificationDao } from './dao/notification.dao';
import {
  catchError,
  defaultIfEmpty,
  filter,
  map,
  mergeMap,
  Observable,
  of,
  throwError,
} from 'rxjs';
import { NotificationEntity } from './entities/notification.entity';
import { CreateNotificationDto } from './dto/create-notification.dto';
import { Notification } from './schemas/notification.schema';
import { UpdateNotificationDto } from './dto/update-notification.dto';

@Injectable()
export class NotificationsService {
  /**
   * Class constructor
   *
   * @param {NotificationDao} _notificationDao instance of the DAO
   */
  constructor(private readonly _notificationDao: NotificationDao) {}

  /**
   * Returns all existing notifications in the list
   *
   * @returns {Observable<NotificationEntity[] | void>}
   */
  findAll = (id: string): Observable<NotificationEntity[] | void> =>
    this._notificationDao.find(id).pipe(
      filter((_: Notification[]) => !!_),
      map((_: Notification[]) =>
        _.map((__: Notification) => new NotificationEntity(__)),
      ),
      defaultIfEmpty(undefined),
    );

  /**
   * Check if notification already exists and add it in notification list
   *
   * @param notification to create
   *
   * @returns {Observable<NotificationEntity>}
   */
  create(notification: CreateNotificationDto): Observable<NotificationEntity> {
    return this._addNotif(notification).pipe(
      mergeMap((_: CreateNotificationDto) => this._notificationDao.save(_)),
      catchError((e) =>
        throwError(() => new UnprocessableEntityException(e.message)),
      ),
      map((_: Notification) => new NotificationEntity(_)),
    );
  }

  /**
   * Add notification with good data in notifications list
   *
   * @param notif to add
   *
   * @returns {Observable<CreateNotificationDto>}
   *
   * @private
   */
  private _addNotif = (
    notif: CreateNotificationDto,
  ): Observable<CreateNotificationDto> =>
    of({
      ...notif,
      isRead: false,
    });

  /**
   * Update a notification in notifications list
   *
   * @param {string} id of the notification to update
   * @param notif data to update
   *
   * @returns {Observable<UpdateNotificationDto>}
   */
  update = (
    id: string,
    notif: UpdateNotificationDto,
  ): Observable<NotificationEntity> =>
    this._notificationDao.findByIdAndUpdate(id, notif).pipe(
      catchError((e) =>
        throwError(() => new UnprocessableEntityException(e.message)),
      ),
      mergeMap((_: Notification) =>
        !!_
          ? of(new NotificationEntity(_))
          : throwError(
              () =>
                new NotFoundException(`Notification with id '${id}' not found`),
            ),
      ),
    );
}
