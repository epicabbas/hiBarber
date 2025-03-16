import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class AppService {
  constructor(private readonly httpService: HttpService) {}

  async processImage(file: Express.Multer.File) {
    try {
      console.log('file1:', file);
      const data = {
        imageUrl: 'https://hi-barber.s3.us-east-2.amazonaws.com/test2.png',
        textPrompt: 'Change the hairstyle to a short bob',
      };

      // Call LightX API
      console.log('Response0:');
      const response = await firstValueFrom(
        this.httpService.post(
          'https://api.lightxeditor.com/external/api/v1/hairstyle',
          data,
          {
            headers: {
              'X-API-KEY':
                'b5f636ffe8514963acf32178fc8fac89_99b111a6dd774cf496c24eb03819299a_andoraitools',
              'Content-Type': 'application/json',
            },
          },
        ),
      );
      console.log('Response1:', response.data);

      // if (response.data?.body?.orderId) {
      //   console.log('Response2:', response.data?.body?.orderId);
      //   const orderId = response.data?.body?.orderId;
      //   const responseOrder = await firstValueFrom(
      //     this.httpService.post(
      //       'https://api.lightxeditor.com/external/api/v1/order-status',
      //       {
      //         orderId: orderId,
      //       },
      //       {
      //         headers: {
      //           'X-API-KEY':
      //             'b5f636ffe8514963acf32178fc8fac89_99b111a6dd774cf496c24eb03819299a_andoraitools',
      //           'Content-Type': 'application/json',
      //         },
      //       },
      //     ),
      //   );
      //   console.log('Response3:', responseOrder.data);
      //   return responseOrder.data.orderId;
      // }

      // Return processed image URL
      return response.data?.body?.orderId;
    } catch (error) {
      console.error('Error processing image:', error);
      throw new Error('Failed to process image');
    }
  }
}
