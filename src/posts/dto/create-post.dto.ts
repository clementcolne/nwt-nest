import { IsMongoId, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreatePostDto {
  @ApiProperty({
    name: 'idAuthor',
    description: 'id of the author of the post',
    example: '61a1fadd9090ec0c64b7c917',
  })
  @IsMongoId()
  @IsNotEmpty()
  idAuthor: string;

  @ApiProperty({
    name: 'media',
    description: 'media of the post',
  })
  @IsString()
  @IsNotEmpty()
  media: string;

  @ApiProperty({
    name: 'mediaType',
    description: 'type of media',
    example: 'image|video',
  })
  @IsString()
  @IsNotEmpty()
  mediaType: string;

  @ApiProperty({
    name: 'description',
    description: 'description of the post',
    example: 'My holidays in Poland ;)',
  })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiProperty({
    name: 'location',
    description: 'location of the post',
    example: 'Paris, FRANCE',
  })
  @IsString()
  @IsOptional()
  location?: string;
}
