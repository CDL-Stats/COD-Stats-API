import {
  Body,
  Controller,
  DefaultValuePipe,
  Delete,
  Get,
  Param,
  ParseArrayPipe,
  ParseIntPipe,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { ApiQuery } from '@nestjs/swagger';
import matchDTO from 'src/dtos/match.dto';
import MatchQueryDTO from 'src/dtos/matchQuery.dto';
import { MatchService } from './match.service';

@Controller('matches')
export class MatchController {
  constructor(private readonly matchService: MatchService) {}

  // Get All Matches
  @Get()
  @ApiQuery({
    name: 'tournamentID',
    // type: MatchQueryDTO,
    description: 'ID of the tournament',
    required: false,
  })
  @ApiQuery({
    name: 'ids',
    // type: MatchQueryDTO,
    description: 'ID or IDs of matches',
    required: false,
  })
  async getMatches(
    @Query('tournamentID') tournamentID?: number,
    @Query(
      'ids',
      new ParseArrayPipe({ items: Number, separator: ',', optional: true }),
    )
    ids?: number[],
  ) {
    const params = {
      ids,
      tournamentID,
    };
    return this.matchService.getMatches(params);
  }

  // Get Single Match
  // @Get(':id')
  // getMatchByID(@Param('id') id: number) {
  //   return this.matchService.getMatches(id);
  // }

  // Create Match
  @Post()
  createMatch(@Body() match: matchDTO) {
    return this.matchService.createMatch(match);
  }
  // Update Match
  @Patch(':id')
  async updateMatch(@Param('id') id: number, @Body() match: matchDTO) {
    return this.matchService.updateMatch(Number(id), match);
  }

  @Delete(':id')
  async deleteMatch(@Param('id') id: number) {
    return this.matchService.deleteMatch(Number(id));
  }
}
