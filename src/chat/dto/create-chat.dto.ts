import { IsMongoId, IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateChatDto {
  @ApiProperty({
    name: 'src',
    description: 'id of the author of the message',
    example: '61a1fadd9090ec0c64b7c917',
  })
  @IsMongoId()
  @IsNotEmpty()
  src: string;

  @ApiProperty({
    name: 'dst',
    description: 'id of the destinator of the message',
    example: '61a1fadd9090ec0c64b7c917',
  })
  @IsMongoId()
  @IsNotEmpty()
  dst: string;

  @ApiProperty({
    name: 'author',
    description: 'Username of the author of the message',
    example: 'Pedro',
  })
  @IsString()
  @IsNotEmpty()
  author: string;

  @ApiProperty({
    name: 'message',
    description: 'Content of the message',
    example: 'Hey friend ;) !',
  })
  @IsString()
  @IsNotEmpty()
  message: string;
}
