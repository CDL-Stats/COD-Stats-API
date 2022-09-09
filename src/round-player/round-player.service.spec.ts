import { Test, TestingModule } from '@nestjs/testing';
import { RoundPlayerService } from './round-player.service';

describe('RoundPlayerService', () => {
  let service: RoundPlayerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RoundPlayerService],
    }).compile();

    service = module.get<RoundPlayerService>(RoundPlayerService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
