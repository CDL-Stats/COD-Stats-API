import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { RoundPlayerService } from './round-player.service';

@Controller('round-player')
export class RoundPlayerController {
  constructor(private readonly roundPlayerService: RoundPlayerService) {}

  @Get(':id')
  getRoundPlayer(@Param('id') id: Number) {
    return this.roundPlayerService.getPlayerRoundByID(Number(id));
  }

  @Post()
  createRoundPlayer(@Body() roundPlayer) {
    return this.roundPlayerService.postPlayerRound(roundPlayer);
  }
}
