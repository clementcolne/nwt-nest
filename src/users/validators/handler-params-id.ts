import { IsMongoId, IsNotEmpty } from 'class-validator';

export class HandlerParamsId {
  @IsMongoId()
  @IsNotEmpty()
  id: any;
}
