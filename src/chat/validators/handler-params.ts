import { IsMongoId, IsNotEmpty } from 'class-validator';

export class HandlerParams {
  @IsMongoId()
  @IsNotEmpty()
  src: string;

  @IsMongoId()
  @IsNotEmpty()
  dst: string;
}
