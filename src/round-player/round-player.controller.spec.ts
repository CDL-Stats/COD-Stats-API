import { Test, TestingModule } from '@nestjs/testing';
import { RoundPlayerController } from './round-player.controller';

describe('RoundPlayerController', () => {
  let controller: RoundPlayerController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RoundPlayerController],
    }).compile();

    controller = module.get<RoundPlayerController>(RoundPlayerController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
