import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { createReadStream } from 'fs';
import * as FormData from 'form-data';


import { unlink } from 'fs/promises';

@Injectable()
export class AppService {
  constructor(private readonly httpService: HttpService) {}

  async processImage(file: Express.Multer.File): Promise<string> {
    try {
      console.log('file1:', file);
      const data = {
        "imageUrl": file.path,
        "textPromt": "Change the hairstyle to a short bob",
      }

      // Call LightX API
      console.log('Response0:');
      const response = await firstValueFrom(
        this.httpService.post('https://api.lightxeditor.com/external/api/v1/hairstyle', data, {
          headers: {
            'X-API-KEY': process.env.LIGHTX_API_KEY,
            'Content-Type': 'multipart/form-data'
          }
        })
      );
      console.log('Response1:', response);

      // Clean up temporary file
      await unlink(file.path);

      // Return processed image URL
      return response.data.processed_url;
    } catch (error) {
      console.error('Error processing image:', error);
      throw new Error('Failed to process image');
    }
  }
}
