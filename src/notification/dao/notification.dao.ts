import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { defaultIfEmpty, filter, from, map, Observable } from 'rxjs';
import { CreateNotificationDto } from '../dto/create-notification.dto';
import {
  Notification,
  NotificationDocument,
} from '../schemas/notification.schema';
import { UpdateNotificationDto } from '../dto/update-notification.dto';

@Injectable()
export class NotificationDao {
  /**
   * Class constructor
   *
   * @param {Model<NotificationDocument>} _notificationModel instance of the model representing a notification
   */
  constructor(
    @InjectModel(Notification.name)
    private readonly _notificationModel: Model<NotificationDocument>,
  ) {}

  /**
   * Call mongoose method, call toJSON on each result and returns NotificationModel[] or undefined
   *
   * @return {Observable<Notification[] | void>}
   */
  find = (id: string): Observable<Notification[] | void> =>
    from(this._notificationModel.find({ recipient: id })).pipe(
      filter((docs: NotificationDocument[]) => !!docs && docs.length > 0),
      map((docs: NotificationDocument[]) =>
        docs.map((_: NotificationDocument) => _.toJSON()),
      ),
      defaultIfEmpty(undefined),
    );

  /**
   * Call mongoose method, call toJSON on each result and returns NotificationModel[] or undefined
   *
   * @return {Observable<Notification[] | void>}
   */
  findByIdAndUpdate = (id: string): Observable<Notification | void> =>
    from(
      this._notificationModel.findByIdAndUpdate(
        id,
        {
          isRead: true,
        },
        {
          runValidators: true,
        },
      ),
    ).pipe(
      filter((doc: NotificationDocument) => !!doc),
      map((doc: NotificationDocument) => doc.toJSON()),
      defaultIfEmpty(undefined),
    );

  /**
   * Add notification in db
   *
   * @param {CreateNotificationDto} notification to create
   *
   * @return {Observable<Notification>}
   */
  save = (notification: CreateNotificationDto): Observable<Notification> =>
    from(new this._notificationModel(notification).save()).pipe(
      map((doc: NotificationDocument) => doc.toJSON()),
    );
}
