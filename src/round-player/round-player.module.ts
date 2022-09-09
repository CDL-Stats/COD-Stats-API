import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RoundPlayerController } from './round-player.controller';
import { RoundPlayer } from './round-player.entity';
import { RoundPlayerService } from './round-player.service';

@Module({
  imports: [TypeOrmModule.forFeature([RoundPlayer])],
  controllers: [RoundPlayerController],
  providers: [RoundPlayerService],
})
export class RoundPlayerModule {}
