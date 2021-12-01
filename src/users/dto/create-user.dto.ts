import {
  IsBoolean,
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({
    name: 'username',
    description: 'username',
    example: 'clement.colne',
  })
  @IsString()
  @IsNotEmpty()
  username: string;

  @ApiProperty({
    name: 'email',
    description: 'Email',
    example: 'clement.colne@outlook.com',
  })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}
