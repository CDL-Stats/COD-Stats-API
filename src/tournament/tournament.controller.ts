import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import tournamentDTO from 'src/dtos/tournament.dto';
import { Tournament } from './tournament.entity';
import { TournamentService } from './tournament.service';

@Controller('tournament')
export class TournamentController {
    constructor(private readonly tournamentService: TournamentService) {}


    // Get All Teams
    @Get()
    getTeams() {
    return this.tournamentService.getAllTournaments();
    }

    // Get Single Team
    @Get(':id')
    getTournamentbyID(@Param('id') id: number) {
    return this.tournamentService.getTournamentbyID(Number(id));
    }

    // Create Team
    @Post()
    createTeam(@Body() tournament: tournamentDTO) {
    return this.tournamentService.createTournament(tournament);
    }

    // Update Team
    @Patch(':slug')
    async updateTournament(@Param('id') id: number, @Body() tournament: tournamentDTO) {
        return this.tournamentService.updateTournament(Number(id), tournament);
        }

    @Delete(':id')
    async deleteTournament(@Param('id') id: number) {
    return this.tournamentService.deleteTournament(Number(id));
}

}
