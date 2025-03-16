import {
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post('upload')
  @UseInterceptors(FileInterceptor('photo'))
  async uploadFile(@UploadedFile() file: Express.Multer.File) {
    if (!file) {
      throw new Error('No file uploaded');
    }
    // console.log(file); // Debug uploaded file
    const result = await this.appService.processImage(file);
    console.log('orderId:', result);
    return { orderId: result };
  }
}
