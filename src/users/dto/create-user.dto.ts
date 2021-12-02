import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
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

  @ApiProperty({
    name: 'password',
    description: 'Password',
    example: 'An_amazingP@$$w0rd',
  })
  @IsString()
  @IsNotEmpty()
  password: string;
}
