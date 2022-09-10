import { Module } from '@nestjs/common';
import { PlayerHistoryService } from './player-history.service';
import { PlayerHistoryController } from './player-history.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PlayerHistory } from './player-history.entity';
import { RoundTeam } from 'src/round-team/round-team.entity';

@Module({
  imports: [TypeOrmModule.forFeature([PlayerHistory, RoundTeam])],
  providers: [PlayerHistoryService],
  controllers: [PlayerHistoryController],
})
export class PlayerHistoryModule {}
