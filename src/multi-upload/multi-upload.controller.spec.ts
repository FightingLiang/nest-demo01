import { Test, TestingModule } from '@nestjs/testing';
import { MultiUploadController } from './multi-upload.controller';

describe('MultiUploadController', () => {
  let controller: MultiUploadController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MultiUploadController],
    }).compile();

    controller = module.get<MultiUploadController>(MultiUploadController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
