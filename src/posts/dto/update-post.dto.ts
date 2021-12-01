import { IsNumber, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdatePostDto {
  @ApiProperty({
    name: 'likes',
    description: 'number of likes',
    example: '107',
  })
  @IsOptional()
  @IsNumber()
  likes: number;

  @ApiProperty({
    name: 'comments',
    description: 'number of comments',
    example: '107',
  })
  @IsOptional()
  @IsNumber()
  nbComments: number;
}
