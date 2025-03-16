import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { catchError, firstValueFrom } from 'rxjs';
import { AxiosError } from 'axios';

export class File {
  name: string;
}

@Injectable()
export class AppService {
  constructor(private readonly httpService: HttpService) {}

  getHello(): string {
    return 'Hello World!';
  }

  async processImage(file: Express.Multer.File): Promise<File[]> {
    const { data } = await firstValueFrom(
      this.httpService.get<File[]>('http://localhost:3000/').pipe(
        catchError((error: AxiosError) => {
          if (error && error.response) console.error(error.response.data);
          // eslint-disable-next-line @typescript-eslint/only-throw-error
          throw 'An error happened!';
        }),
      ),
    );
    console.log('result data', data);
    console.log('result file', file);
    return data;
  }
}
