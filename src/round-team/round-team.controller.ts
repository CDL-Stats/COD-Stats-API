import { Controller, Get, Param } from '@nestjs/common';
import { RoundTeamService } from './round-team.service';

@Controller('round-team')
export class RoundTeamController {
  constructor(private readonly roundTeamService: RoundTeamService) {}

  @Get(':id')
  getRoundTeam(@Param('id') id: Number) {
    return this.roundTeamService.getTeamRoundByID(Number(id));
  }
}
