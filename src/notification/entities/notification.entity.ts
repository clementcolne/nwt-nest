import { Exclude, Expose, Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { IsMongoId, IsNotEmpty, IsNumber, IsString } from 'class-validator';

@Exclude()
export class NotificationEntity {
  @ApiProperty({
    name: 'recipient',
    description: 'id of the recipient of the notification',
    example: '61a1fadd9090ec0c64b7c917',
  })
  @IsMongoId()
  @IsNotEmpty()
  recipient: string;

  @ApiProperty({
    name: 'author',
    description: 'username of the author of the notification',
    example: '61a1fadd9090ec0c64b7c917',
  })
  @Expose()
  @IsString()
  @IsNotEmpty()
  author: string;

  @ApiProperty({
    name: 'content',
    description:
      'Id of the user who followed or id of the post liked/commented',
    example: '61a1fadd9090ec0c64b7c917',
  })
  @Expose()
  @IsMongoId()
  @Type(() => String)
  content: string;

  @ApiProperty({
    name: 'type',
    description: 'type of the notification',
    example: 'follow|likecomment',
  })
  @Expose()
  @IsString()
  @Type(() => String)
  type: string;

  @ApiProperty({
    name: 'date',
    description:
      'date when the notifications was generated in timestamp format',
    example: '101343600000',
  })
  @Expose()
  @IsNumber()
  @Type(() => Number)
  date: number;

  @ApiProperty({
    name: 'isRead',
    description: 'Flag to know if has been read or not',
    example: false,
  })
  @Expose()
  @Type(() => Boolean)
  isRead: boolean;

  /**
   * Class constructor
   *
   * @param partial data to insert in object instance
   */
  constructor(partial: Partial<NotificationEntity>) {
    Object.assign(this, partial);
  }
}
