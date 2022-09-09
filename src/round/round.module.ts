import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MatchTeam } from 'src/match-team/match-team.entity';
import { RoundTeam } from 'src/round-team/round-team.entity';
import { RoundController } from './round.controller';
import { Round } from './round.entity';
import { RoundService } from './round.service';

@Module({
  imports: [TypeOrmModule.forFeature([Round, MatchTeam, RoundTeam])],
  controllers: [RoundController],
  providers: [RoundService],
})
export class RoundModule {}
