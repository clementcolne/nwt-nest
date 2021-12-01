import { IsMongoId, IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateCommentDto {
  @ApiProperty({
    name: 'idPost',
    description: 'id of the post',
    example: '61a1fadd9090ec0c64b7c917',
  })
  @IsMongoId()
  @IsNotEmpty()
  idPost: string;

  @ApiProperty({
    name: 'idAuthor',
    description: 'id of the author of the comment',
    example: '61a1fadd9090ec0c64b7c917',
  })
  @IsMongoId()
  @IsNotEmpty()
  idAuthor: string;

  @ApiProperty({
    name: 'content',
    description: 'content of the comment',
  })
  @IsString()
  @IsNotEmpty()
  content: string;
}
