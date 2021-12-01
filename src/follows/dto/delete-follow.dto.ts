import { IsMongoId, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class DeleteFollowDto {
  @ApiProperty({
    name: 'idFollower',
    description: 'id of the follower',
    example: '61a1fadd9090ec0c64b7c917',
  })
  @IsMongoId()
  @IsNotEmpty()
  idFollower: string;

  @ApiProperty({
    name: 'idFollowed',
    description: 'id of the followed user',
    example: '61a1fadd9090ec0c64b7c917',
  })
  @IsMongoId()
  @IsNotEmpty()
  idFollowed: string;
}
