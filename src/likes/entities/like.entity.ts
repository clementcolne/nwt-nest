import { Exclude, Expose, Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { IsMongoId } from 'class-validator';

@Exclude()
export class LikeEntity {
  @ApiProperty({
    name: 'id',
    description: 'id of the like',
    example: '61a1fadd9090ec0c64b7c917',
  })
  @Expose()
  @IsMongoId()
  @Type(() => String)
  id: string;

  @ApiProperty({
    name: 'idLiker',
    description: 'id of the user',
    example: '61a1fadd9090ec0c64b7c917',
  })
  @Expose()
  @IsMongoId()
  @Type(() => String)
  idLiker: string;

  @ApiProperty({
    name: 'idLiked',
    description: 'id of the liked post',
    example: '61a1fadd9090ec0c64b7c917',
  })
  @Expose()
  @IsMongoId()
  @Type(() => String)
  idLiked: string;

  /**
   * Class constructor
   *
   * @param partial data to insert in object instance
   */
  constructor(partial: Partial<LikeEntity>) {
    Object.assign(this, partial);
  }
}
