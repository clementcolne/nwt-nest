import { Exclude, Expose, Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { IsMongoId, IsNumber, IsOptional, IsString } from 'class-validator';

@Exclude()
export class PostEntity {
  @ApiProperty({
    name: 'id',
    description: 'id of the post',
    example: '61a1fadd9090ec0c64b7c917',
  })
  @Expose()
  @IsMongoId()
  @Type(() => String)
  id: string;

  @ApiProperty({
    name: 'idAuthor',
    description: 'id of the author of the post',
    example: '61a1fadd9090ec0c64b7c917',
  })
  @IsMongoId()
  @Expose()
  idAuthor: string;

  @ApiProperty({
    name: 'media',
    description: 'media of the post',
  })
  @IsString()
  @Expose()
  media: string;

  @ApiProperty({
    name: 'mediaType',
    description: 'type of media',
    example: 'image|video',
  })
  @IsString()
  @Expose()
  mediaType: string;

  @ApiProperty({
    name: 'description',
    description: 'description of the post',
    example: 'My holidays in Poland ;)',
  })
  @IsString()
  @IsOptional()
  @Expose()
  description?: string;

  @ApiProperty({
    name: 'likes',
    description: 'number of likes',
    example: '107',
  })
  @IsNumber()
  @Expose()
  likes: number;

  @ApiProperty({
    name: 'location',
    description: 'location of the post',
    example: 'Paris, FRANCE',
  })
  @IsString()
  @IsOptional()
  @Expose()
  location?: string;

  @ApiProperty({
    name: 'nbComments',
    description: 'number of comments',
    example: '107',
  })
  @IsNumber()
  @Expose()
  nbComments: number;

  /**
   * Class constructor
   *
   * @param partial data to insert in object instance
   */
  constructor(partial: Partial<PostEntity>) {
    Object.assign(this, partial);
  }
}
