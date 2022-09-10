import { Test, TestingModule } from '@nestjs/testing';
import { PlayerHistoryService } from './player-history.service';

describe('PlayerHistoryService', () => {
  let service: PlayerHistoryService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PlayerHistoryService],
    }).compile();

    service = module.get<PlayerHistoryService>(PlayerHistoryService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
