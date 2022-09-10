import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { PlayerHistoryService } from './player-history.service';

@Controller('player-history')
export class PlayerHistoryController {
  constructor(private readonly playerHistoryService: PlayerHistoryService) {}

  @Get('/team/:team/:season')
  getRoundPlayer(@Param('team') team: Number, @Param('season') season: Number) {
    return this.playerHistoryService.getPlayerHistoryByTeamSeason(
      Number(team),
      Number(season),
    );
  }

  @Post()
  createPlayerHistory(@Body() playerHistory) {
    return this.playerHistoryService.postPlayerHistory(playerHistory);
  }

  @Get('/round/:id')
  getByRoundTeam(@Param('id') id: Number) {
    return this.playerHistoryService.getPlayersByRoundTeam(Number(id));
  }
}
