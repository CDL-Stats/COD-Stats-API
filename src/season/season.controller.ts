import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import seasonDTO from 'src/dtos/season.dto';
import { Season } from './season.entity';
import { SeasonService } from './season.service';

@Controller('season')
export class SeasonController {
    constructor(private readonly seasonService: SeasonService) {}
    // Get All Seasons
    @Get()
    getSeasons() {
        return this.seasonService.getAllSeasons();
    }
    
    // Get Single Season
    @Get(':id')
    getTeamBySlug(@Param('id') id: number) {
        return this.seasonService.getSeasonByID(Number(id));
    }
    
    // Create Season
    @Post()
    createSeason(@Body() season: seasonDTO) {
        return this.seasonService.createSeason(season);
    }
    
    // Update Season
    @Patch(':id')
    async updateTeam(@Param('id') id: number, @Body() season: seasonDTO) {
        return this.seasonService.updateSeason(Number(id), season);
    }
    
    @Delete(':slug')
    async deleteSeason(@Param('id') id: number) {
        return this.seasonService.deleteSeason(Number(id));
    }
}
