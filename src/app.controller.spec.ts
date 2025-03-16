import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';

describe('AppController', () => {
  let appController: AppController;
  let appService: AppService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [
        {
          provide: AppService,
          useValue: {
            processImage: jest.fn().mockResolvedValue('processed-image-url')
          }
        }
      ],
    }).compile();

    appController = module.get<AppController>(AppController);
    appService = module.get<AppService>(AppService);
  });

  describe('uploadFile', () => {
    it('should return processed image URL', async () => {
      const mockFile = { path: 'test.jpg' } as Express.Multer.File;
      const result = await appController.uploadFile(mockFile);
      expect(result).toEqual({
        status: 'success',
        processedImageUrl: 'processed-image-url'
      });
    });
  });
});
