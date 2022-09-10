import { Module } from '@nestjs/common';
import { PlayerHistoryService } from './player-history.service';
import { PlayerHistoryController } from './player-history.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PlayerHistory } from './player-history.entity';

@Module({
  imports: [TypeOrmModule.forFeature([PlayerHistory])],
  providers: [PlayerHistoryService],
  controllers: [PlayerHistoryController],
})
export class PlayerHistoryModule {}
