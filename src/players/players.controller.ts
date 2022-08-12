import { Body, Controller, Delete, Get, Param, Patch, Post, Put } from '@nestjs/common';
import { PlayersService } from './players.service';
import { Player } from './player.entity';
import UpdatePlayerDTO from 'src/dtos/putPlayer.dto';

@Controller('players')
export class PlayersController {
  constructor(private readonly playersService: PlayersService) {}
  @Get()
  getPlayers() {
    return this.playersService.getAllPlayers();
  }

    // get todo by id
    @Get(':id')
    getPlayerByID(@Param('id') id: string) {
      return this.playersService.getPlayerByID(Number(id));
    }

    @Get('/nickname/:slug')
    getPlayerbySlug(@Param('slug') slug: string) {
      return this.playersService.getPlayerbySlug(String(slug));
    }

    @Get('/team/:slug')
    getPlayerByTeam(@Param('slug') slug: string) {
      return this.playersService.getPlayerByTeam(String(slug));
    }

    @Patch(':id')
    async updatePlayer(@Param('id') id: string, @Body() player: UpdatePlayerDTO) {
      return this.playersService.updatePlayer(Number(id), player);
    }

    @Post(':id')
    async createPlayer(@Body() player: UpdatePlayerDTO) {
      return this.playersService.createPlayer(player);
    }

    @Delete(':id')
    async deletePlayer(@Param('id') id: string) {
      return this.playersService.deltePlayer(Number(id));
    }

}