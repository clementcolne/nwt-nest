import { Logger, Module } from '@nestjs/common';
import { FollowsController } from './follows.controller';
import { FollowsService } from './follows.service';
import { FollowDao } from './dao/follow.dao';
import { MongooseModule } from '@nestjs/mongoose';
import { Follow, FollowSchema } from './schemas/follow.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Follow.name, schema: FollowSchema }]),
  ],
  controllers: [FollowsController],
  providers: [FollowsService, Logger, FollowDao],
  exports: [FollowsService],
})
export class FollowsModule {}
