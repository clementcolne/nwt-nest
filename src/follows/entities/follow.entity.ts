import { Exclude, Expose, Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { IsMongoId } from 'class-validator';

@Exclude()
export class FollowEntity {
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
    name: 'idFollower',
    description: 'id of the follower',
    example: '61a1fadd9090ec0c64b7c917',
  })
  @Expose()
  @IsMongoId()
  @Type(() => String)
  idFollower: string;

  @ApiProperty({
    name: 'idFollowed',
    description: 'id of the followed user',
    example: '61a1fadd9090ec0c64b7c917',
  })
  @Expose()
  @IsMongoId()
  @Type(() => String)
  idFollowed: string;

  /**
   * Class constructor
   *
   * @param partial data to insert in object instance
   */
  constructor(partial: Partial<FollowEntity>) {
    Object.assign(this, partial);
  }
}
