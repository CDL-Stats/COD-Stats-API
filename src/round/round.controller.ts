import {
  Body,
  Controller,
  Get,
  Param,
  ParseArrayPipe,
  Post,
  Query,
} from '@nestjs/common';
import { ApiQuery } from '@nestjs/swagger';
import roundDTO from 'src/dtos/round.dto';
import { RoundService } from './round.service';

@Controller('rounds')
export class RoundController {
  constructor(private readonly roundService: RoundService) {}

  @Get()
  getRounds() {
    return this.roundService.getRounds();
  }

  // Get a single round by round ID
  @Get(':id')
  getRound(@Param('id') id: Number) {
    return this.roundService.getRound(Number(id));
  }
  // Get rounds by match ID
  @Get('/match/:id')
  getRoundByMatch(@Param('id') id: Number) {
    return this.roundService.getRoundByMatch(Number(id));
  }

  // Create Team
  @Post()
  createRound(@Body() round: roundDTO) {
    return this.roundService.createRound(round);
  }
}
