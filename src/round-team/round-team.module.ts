import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MatchTeam } from 'src/match-team/match-team.entity';
import { RoundTeamController } from './round-team.controller';
import { RoundTeam } from './round-team.entity';
import { RoundTeamService } from './round-team.service';

@Module({
  imports: [TypeOrmModule.forFeature([RoundTeam, MatchTeam])],
  controllers: [RoundTeamController],
  providers: [RoundTeamService],
})
export class RoundTeamModule {}
