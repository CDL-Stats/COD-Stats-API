import { Test, TestingModule } from '@nestjs/testing';
import { PlayerHistoryController } from './player-history.controller';

describe('PlayerHistoryController', () => {
  let controller: PlayerHistoryController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PlayerHistoryController],
    }).compile();

    controller = module.get<PlayerHistoryController>(PlayerHistoryController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
