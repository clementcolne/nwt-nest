import { IsBoolean, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateNotificationDto {
  @ApiProperty({
    name: 'isRead',
    description: 'Flag to know if this notification has been read',
    example: false,
  })
  @IsNotEmpty()
  @IsBoolean()
  isRead?: boolean;
}
