import { Exclude, Expose, Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { IsMongoId, IsString } from 'class-validator';

@Exclude()
export class CommentEntity {
  @ApiProperty({
    name: 'idAuthor',
    description: 'id of the author',
    example: '61a1fadd9090ec0c64b7c917',
  })
  @Expose()
  @IsMongoId()
  @Type(() => String)
  idAuthor: string;

  @ApiProperty({
    name: 'idPost',
    description: 'id of the post',
    example: '61a1fadd9090ec0c64b7c917',
  })
  @IsMongoId()
  @Expose()
  idPost: string;

  @ApiProperty({
    name: 'content',
    description: 'content of the comment',
  })
  @IsString()
  @Expose()
  content: string;

  /**
   * Class constructor
   *
   * @param partial data to insert in object instance
   */
  constructor(partial: Partial<CommentEntity>) {
    Object.assign(this, partial);
  }
}
