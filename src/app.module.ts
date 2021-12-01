import { Logger, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { CommentsModule } from './comments/comments.module';
import { FollowsModule } from './follows/follows.module';
import { LikesModule } from './likes/likes.module';
import { NotificationsModule } from './notification/notifications.module';
import { MediaModule } from './medias/media.module';
import { MediaController } from './medias/media.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { PostsModule } from './posts/posts.module';
import { ChatModule } from './chat/chat.module';

@Module({
  imports: [
    UsersModule,
    PostsModule,
    CommentsModule,
    FollowsModule,
    LikesModule,
    NotificationsModule,
    MediaModule,
    MongooseModule.forRoot('mongodb://localhost/amstramgram'),
    AuthModule,
    ChatModule,
  ],
  controllers: [AppController, MediaController],
  providers: [AppService, Logger],
})
export class AppModule {}
