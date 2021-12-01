import { Exclude, Expose, Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { IsMongoId } from 'class-validator';

@Exclude()
export class UserEntity {
  @ApiProperty({
    name: 'id',
    description: 'id of the user',
    example: '61a7b09037bf4a575773d299',
  })
  @Expose()
  @IsMongoId()
  @Type(() => String)
  id: string;

  @ApiProperty({
    name: 'username',
    description: 'username',
    example: 'clement.colne',
  })
  @Expose()
  @Type(() => String)
  username: string;

  @ApiProperty({
    name: 'email',
    description: 'Email',
    example: 'clement.colne@outlook.com',
  })
  @Expose()
  @Type(() => String)
  email: string;

  @Exclude()
  @Type(() => String)
  password: string;

  @ApiProperty({
    name: 'description',
    description: 'Description of the user',
    example: 'SDE living the dream in USA.',
  })
  @Expose()
  @Type(() => String)
  description: string;

  @ApiProperty({
    name: 'profilePicture',
    description: 'Profile picture of the user',
  })
  @Expose()
  @Type(() => String)
  profilePicture: string;

  @ApiProperty({
    name: 'nbFollow',
    description: 'Number of accounts the user follows',
    example: '10',
  })
  @Expose()
  @Type(() => Number)
  nbFollow: number;

  @ApiProperty({
    name: 'nbFollowers',
    description: 'Number of followers the account has',
    example: '107',
  })
  @Expose()
  @Type(() => Number)
  nbFollowers: number;

  @ApiProperty({
    name: 'isPrivate',
    description: 'Flag to know if this user is in private visibility',
    example: false,
  })
  @Expose()
  @Type(() => Boolean)
  isPrivate: boolean;

  /**
   * Class constructor
   *
   * @param partial data to insert in object instance
   */
  constructor(partial: Partial<UserEntity>) {
    Object.assign(this, partial);
  }
}
