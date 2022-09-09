import { Test, TestingModule } from '@nestjs/testing';
import { RoundTeamService } from './round-team.service';

describe('RoundTeamService', () => {
  let service: RoundTeamService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RoundTeamService],
    }).compile();

    service = module.get<RoundTeamService>(RoundTeamService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
