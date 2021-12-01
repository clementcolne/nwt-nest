import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class DeleteNotificationDto {
  @ApiProperty({
    name: 'content',
    description: 'username of user or id of post',
    example: '61a1fadd9090ec0c64b7c917',
  })
  @IsString()
  @IsNotEmpty()
  content: string;

  @ApiProperty({
    name: 'type',
    description: 'type of the notification',
    example: 'follow|like|comment',
  })
  @IsString()
  @IsNotEmpty()
  type: string;
}
