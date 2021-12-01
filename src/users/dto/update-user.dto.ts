import {
  IsBoolean,
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateUserDto {
  @ApiProperty({
    name: 'username',
    description: 'username',
    example: 'clement.colne',
  })
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  username?: string;

  @ApiProperty({
    name: 'email',
    description: 'Email',
    example: 'clement.colne@outlook.com',
  })
  @IsOptional()
  @IsEmail()
  email?: string;

  @ApiProperty({
    name: 'password',
    description: 'Password',
    example: 'An_amazingP@$$w0rd',
  })
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  password?: string;

  @ApiProperty({
    name: 'description',
    description: 'Description of the user',
    example: 'SDE living the dream in USA.',
  })
  @IsOptional()
  @IsString()
  @IsOptional()
  description?: string;

  @ApiProperty({
    name: 'profilePicture',
    description: 'Profile picture of the user',
  })
  @IsOptional()
  @IsOptional()
  @IsString()
  profilePicture?: string;

  @ApiProperty({
    name: 'nbFollow',
    description: 'Number of accounts the user follows',
    example: '10',
  })
  @IsOptional()
  @IsNumber()
  nbFollow?: number;

  @ApiProperty({
    name: 'nbFollowers',
    description: 'Number of followers the account has',
    example: '107',
  })
  @IsOptional()
  @IsNumber()
  nbFollowers?: number;

  @ApiProperty({
    name: 'isPrivate',
    description: 'Flag to know if this user is in private visibility',
    example: false,
  })
  @IsOptional()
  @IsBoolean()
  isPrivate?: boolean;
}
