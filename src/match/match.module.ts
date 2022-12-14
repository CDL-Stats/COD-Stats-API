import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MatchTeam } from 'src/match-team/match-team.entity';
import { Round } from 'src/round/round.entity';
import { Team } from 'src/teams/team.entity';
import { MatchController } from './match.controller';
import { Match } from './match.entity';
import { MatchService } from './match.service';

@Module({
  imports: [TypeOrmModule.forFeature([Match, Team, MatchTeam, Round])],
  controllers: [MatchController],
  providers: [MatchService],
})
export class MatchModule {}
