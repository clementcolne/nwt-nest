import { IsMongoId, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateNotificationDto {
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
    example: 'clement.colne',
  })
  @IsString()
  @IsNotEmpty()
  author: string;

  @ApiProperty({
    name: 'content',
    description:
      'Id of the user who followed or id of the post liked/commented',
    example: '61a1fadd9090ec0c64b7c917',
  })
  @IsMongoId()
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

  @ApiProperty({
    name: 'date',
    description:
      'date when the notifications was generated in timestamp format',
    example: '101343600000',
  })
  @IsNumber()
  @IsNotEmpty()
  date: number;
}
