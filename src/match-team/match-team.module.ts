import { Module } from '@nestjs/common';
import { MatchTeamService } from './match-team.service';
import { MatchTeamController } from './match-team.controller';

@Module({
  providers: [MatchTeamService],
  controllers: [MatchTeamController]
})
export class MatchTeamModule {}
