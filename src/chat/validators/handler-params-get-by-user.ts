import { IsMongoId, IsNotEmpty } from 'class-validator';

export class HandlerParamsGetByUser {
  @IsMongoId()
  @IsNotEmpty()
  id: string;
}
