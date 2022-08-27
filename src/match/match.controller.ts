import { Body, Controller, DefaultValuePipe, Delete, Get, Param, ParseIntPipe, Patch, Post, Query } from '@nestjs/common';
import { ApiQuery } from '@nestjs/swagger';
import matchDTO from 'src/dtos/match.dto';
import { MatchService } from './match.service';

@Controller('match')
export class MatchController {
    constructor(private readonly matchService: MatchService) {}

    // Get All Seasons
    @Get()
    @ApiQuery({
        name: "tournament",
        type: Number,
        description: "ID of the tournament",
        required: false
      })
    async getMatches(@Query('tournament') tournaments?: number) {
        return this.matchService.getAllMatches(Number(tournaments));
    }

    // Get Single Match
    @Get(':id')
    getMatchByID(@Param('id') id: number) {
        return this.matchService.getMatchByID(Number(id));
    }

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
