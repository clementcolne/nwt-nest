import { IsMongoId, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateLikeDto {
  @ApiProperty({
    name: 'idLiker',
    description: 'id of the user',
    example: '61a1fadd9090ec0c64b7c917',
  })
  @IsMongoId()
  @IsNotEmpty()
  idLiker: string;

  @ApiProperty({
    name: 'idLiked',
    description: 'id of the liked post',
    example: '61a1fadd9090ec0c64b7c917',
  })
  @IsMongoId()
  @IsNotEmpty()
  idLiked: string;
}
