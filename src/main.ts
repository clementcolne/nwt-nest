import { NestFactory } from '@nestjs/core';
import { Logger, ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';
import { AppConfig, SwaggerConfig } from './app.types';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as Config from 'config';
import { join } from 'path';
import * as express from 'express';
import { UsersModule } from './users/users.module';
import { PostsModule } from './posts/posts.module';
import { CommentsModule } from './comments/comments.module';
import { FollowsModule } from './follows/follows.module';
import { LikesModule } from './likes/likes.module';
import { NotificationsModule } from './notification/notifications.module';
import { MediaModule } from './medias/media.module';
import { ChatModule } from './chat/chat.module';

async function bootstrap(
  config: AppConfig,
  swaggerConfigUsers: SwaggerConfig,
  swaggerConfigPosts: SwaggerConfig,
  swaggerConfigComments: SwaggerConfig,
  swaggerConfigFollowers: SwaggerConfig,
  swaggerConfigLikes: SwaggerConfig,
  swaggerConfigNotifications: SwaggerConfig,
  swaggerConfigMedias: SwaggerConfig,
  swaggerConfigChat: SwaggerConfig,
) {
  const app = await NestFactory.create(AppModule);

  await app.enableCors({ origin: config.cors });

  app.use('/public', express.static(join(__dirname, '..', 'public')));

  // use global pipe validation
  await app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );

  _buildDocumentation(app, UsersModule, swaggerConfigUsers);
  _buildDocumentation(app, PostsModule, swaggerConfigPosts);
  _buildDocumentation(app, CommentsModule, swaggerConfigComments);
  _buildDocumentation(app, FollowsModule, swaggerConfigFollowers);
  _buildDocumentation(app, LikesModule, swaggerConfigLikes);
  _buildDocumentation(app, NotificationsModule, swaggerConfigNotifications);
  _buildDocumentation(app, MediaModule, swaggerConfigMedias);
  _buildDocumentation(app, ChatModule, swaggerConfigChat);

  await app.listen(config.port, config.host);
  Logger.log(
    `Application served at http://${config.host}:${config.port}`,
    'bootstrap',
  );
}

const _buildDocumentation = (
  app: any,
  module: any,
  swaggerConfig: SwaggerConfig,
) => {
  // create swagger options
  const options = new DocumentBuilder()
    .setTitle(swaggerConfig.title)
    .setDescription(swaggerConfig.description)
    .setVersion(swaggerConfig.version)
    .addTag(swaggerConfig.tag)
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        name: 'JWT',
        description: 'Enter a JWT token',
        in: 'header',
      },
      'jwt-auth',
    )
    .build();

  // create swagger document
  const document = SwaggerModule.createDocument(app, options, {
    include: [module],
  });

  // setup swagger module
  SwaggerModule.setup(swaggerConfig.path, app, document);
};

bootstrap(
  Config.get<AppConfig>('server'),
  Config.get<SwaggerConfig>('users'),
  Config.get<SwaggerConfig>('posts'),
  Config.get<SwaggerConfig>('comments'),
  Config.get<SwaggerConfig>('follows'),
  Config.get<SwaggerConfig>('likes'),
  Config.get<SwaggerConfig>('notifications'),
  Config.get<SwaggerConfig>('medias'),
  Config.get<SwaggerConfig>('chats'),
);

