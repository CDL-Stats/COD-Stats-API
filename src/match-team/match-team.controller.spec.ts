import { Test, TestingModule } from '@nestjs/testing';
import { MatchTeamController } from './match-team.controller';

describe('MatchTeamController', () => {
  let controller: MatchTeamController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MatchTeamController],
    }).compile();

    controller = module.get<MatchTeamController>(MatchTeamController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
