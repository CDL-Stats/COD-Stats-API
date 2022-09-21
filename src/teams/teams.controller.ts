import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import UpdateTeamDTO from '../dtos/team.dto';
import { Team } from './team.entity';
import { TeamsService } from './teams.service';

@Controller('teams')
export class TeamsController {
  constructor(private readonly teamsService: TeamsService) {}

  // Get All Teams
  @Get()
  getTeams() {
    return this.teamsService.getAllTeams();
  }

  // Get Single Team
  @Get(':slug')
  getTeamBySlug(@Param('slug') slug: string) {
    return this.teamsService.getTeamBySlug(String(slug));
  }

  // Get Team Schedule
  @Get('/schedule/:slug')
  getScheduleBySlug(@Param('slug') slug: string) {
    return this.teamsService.getScheduleBySlug(String(slug));
  }

  // Get Team Schedule
  @Get('/stats/:slug')
  getStatsByTeam(@Param('slug') slug: string) {
    return this.teamsService.getTeamStats(String(slug));
  }

  // Create Team
  @Post()
  createTeam(@Body() team: UpdateTeamDTO) {
    return this.teamsService.createTeam(team);
  }

  // Update Team
  @Patch(':slug')
  async updateTeam(@Param('slug') slug: string, @Body() team: UpdateTeamDTO) {
    return this.teamsService.updateTeam(String(slug), team);
  }

  @Delete(':slug')
  async deleteTeam(@Param('slug') slug: string) {
    return this.teamsService.deleteTeam(String(slug));
  }
}
