import {
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { editFileName, mediaFilter } from './file-helper';
import { ApiConsumes, ApiOkResponse } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt-auth.guards';

@Controller('uploads')
export class MediaController {
  @ApiConsumes('multipart/form-data')
  @ApiOkResponse({
    description: 'Returns the name of the file',
    type: String,
  })
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
