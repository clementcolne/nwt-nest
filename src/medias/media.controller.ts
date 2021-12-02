import {
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { editFileName, mediaFilter } from './file-helper';
import {
  ApiBadRequestResponse,
  ApiConsumes,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiUnprocessableEntityResponse,
} from '@nestjs/swagger';

@Controller('uploads')
export class MediaController {
  @ApiConsumes('multipart/form-data')
  @ApiOkResponse({
    description: 'Returns the unique name of the file',
    type: String,
  })
  @ApiCreatedResponse({
    description: 'The media has been successfully added to server',
  })
  @ApiUnprocessableEntityResponse({
    description: "The request can't be performed in the server",
  })
  @ApiBadRequestResponse({ description: 'Media provided is not good' })
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './public',
        filename: editFileName,
      }),
      fileFilter: mediaFilter,
    }),
  )
  @Post('media')
  upload(@UploadedFile() file: Express.Multer.File) {
    return file.filename;
  }
}
