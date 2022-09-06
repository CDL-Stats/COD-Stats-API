import { Test, TestingModule } from '@nestjs/testing';
import { MatchTeamService } from './match-team.service';

describe('MatchTeamService', () => {
  let service: MatchTeamService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MatchTeamService],
    }).compile();

    service = module.get<MatchTeamService>(MatchTeamService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
