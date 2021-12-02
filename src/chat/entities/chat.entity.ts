import { Exclude, Expose, Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { IsMongoId, IsString } from 'class-validator';

@Exclude()
export class ChatEntity {
  @ApiProperty({
    name: 'src',
    description: 'id of the author of the message',
    example: '61a1fadd9090ec0c64b7c917',
  })
  @Expose()
  @IsMongoId()
  @Type(() => String)
  src: string;

  @ApiProperty({
    name: 'dst',
    description: 'id of the destinator of the message',
    example: '61a1fadd9090ec0c64b7c917',
  })
  @Expose()
  @IsMongoId()
  @Type(() => String)
  dst: string;

  @ApiProperty({
    name: 'author',
    description: 'Username of the author of the message',
    example: 'Pedro',
  })
  @Expose()
  @IsString()
  @Type(() => String)
  author: string;

  @ApiProperty({
    name: 'message',
    description: 'messageContent of the message',
    example: 'Hey friend ;) !',
  })
  @Expose()
  @IsString()
  @Type(() => String)
  message: string;

  /**
   * Class constructor
   *
   * @param partial data to insert in object instance
   */
  constructor(partial: Partial<ChatEntity>) {
    Object.assign(this, partial);
  }
}
