import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { HandlerParams } from './validators/handler-params';
import { CreateChatDto } from './dto/create-chat.dto';
import { ChatService } from './chat.service';
import { Observable } from 'rxjs';
import { ChatEntity } from './entities/chat.entity';
import {
  ApiBadRequestResponse,
  ApiBody,
  ApiCreatedResponse,
  ApiNoContentResponse,
  ApiOkResponse,
  ApiParam,
  ApiUnprocessableEntityResponse,
} from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt-auth.guards';
import { HttpInterceptor } from '../interceptors/http.interceptor';
import { HandlerParamsGetByUser } from './validators/handler-params-get-by-user';

@Controller('chats')
@UseInterceptors(HttpInterceptor)
export class ChatController {
  constructor(private _chatService: ChatService) {}

  /**
   * Handler to answer to GET /chats/:src/:dst route
   *
   * @returns Observable<ChatEntity[] | void>
   */
  @ApiOkResponse({
    description: 'Returns an array of chats between 2 users',
    type: ChatEntity,
    isArray: true,
  })
  @ApiParam({
    name: 'src',
    description: 'Unique identifier of the user in the database',
    type: String,
    allowEmptyValue: false,
  })
  @ApiParam({
    name: 'dst',
    description: 'Unique identifier of the user in the database',
    type: String,
    allowEmptyValue: false,
  })
  @ApiNoContentResponse({ description: 'No chats exists in database' })
  @UseGuards(JwtAuthGuard)
  @Get(':src/:dst')
  findAll(@Param() params: HandlerParams): Observable<ChatEntity[] | void> {
    return this._chatService.findAll(params.src, params.dst);
  }

  /**
   * Handler to answer to GET /chats/:id route
   *
   * @returns Observable<ChatEntity[] | void>
   */
  @ApiOkResponse({
    description: 'Returns an array of chats of the user in parameter',
    type: ChatEntity,
    isArray: true,
  })
  @ApiParam({
    name: 'src',
    description: 'Unique identifier of the user in the database',
    type: String,
    allowEmptyValue: false,
  })
  @ApiParam({
    name: 'id',
    description: 'Unique identifier of the user in the database',
    type: String,
    allowEmptyValue: false,
  })
  @ApiNoContentResponse({ description: 'No chats exists in database' })
  @UseGuards(JwtAuthGuard)
  @Get(':id')
  findConversations(
    @Param() params: HandlerParamsGetByUser,
  ): Observable<ChatEntity[] | void> {
    return this._chatService.findConversations(params.id);
  }

  /**
   * Handler to answer to POST /chats route
   *
   * @returns Observable<ChatEntity>
   *
   * @param createChatDto
   */
  @ApiCreatedResponse({
    description: 'The chat has been successfully created',
    type: ChatEntity,
  })
  @ApiBadRequestResponse({ description: 'Payload provided is not good' })
  @ApiUnprocessableEntityResponse({
    description: "The request can't be performed in the database",
  })
  @ApiBody({
    description: 'Payload to create a new chat',
    type: CreateChatDto,
  })
  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() createChatDto: CreateChatDto): Observable<ChatEntity> {
    return this._chatService.create(createChatDto);
  }
}
