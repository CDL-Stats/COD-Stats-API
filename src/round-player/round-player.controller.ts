import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { RoundPlayerService } from './round-player.service';

@Controller('round-player')
export class RoundPlayerController {
  constructor(private readonly roundPlayerService: RoundPlayerService) {}

  @Get(':id')
  getRoundPlayer(@Param('id') id: Number) {
    return this.roundPlayerService.getPlayerRoundByID(Number(id));
  }

  @Get('/round/:id')
  getRoundPlayerByRound(@Param('id') id: Number) {
    return this.roundPlayerService.getPlayerRoundByRound(Number(id));
  }

  @Post()
  createRoundPlayer(@Body() roundPlayer) {
    return this.roundPlayerService.postPlayerRound(roundPlayer);
  }

  @Patch(':id')
  updatePlayerRound(@Param('id') id: Number, @Body() roundPlayer) {
    return this.roundPlayerService.patchPlayerRound(roundPlayer);
  }
}
