import { Test, TestingModule } from '@nestjs/testing';
import { RoundTeamController } from './round-team.controller';

describe('RoundTeamController', () => {
  let controller: RoundTeamController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RoundTeamController],
    }).compile();

    controller = module.get<RoundTeamController>(RoundTeamController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
