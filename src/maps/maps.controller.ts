import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { ApiQuery } from '@nestjs/swagger';
import mapDTO from 'src/dtos/map.dto';
import { Season } from 'src/season/season.entity';
import { MapsService } from './maps.service';

@Controller('maps')
export class MapsController {
    constructor(private readonly mapService: MapsService) {}

    // Get all maps
    @Get()
    @ApiQuery({
        name: "season",
        type: Season,
        description: "ID of the season",
        required: false
    })
    async getMaps(@Query('season') seasons?: number) {
        return this.mapService.getAllMaps(Number(seasons));
    }

    // Get Single Map
    @Get(':id')
    getMatchByID(@Param('id') id: number) {
        return this.mapService.getMapByID(Number(id));
    }

    // Create Map
    @Post()
    createMap(@Body() match: mapDTO) {
        return this.mapService.createMap(match);
    }

    // Update Match
    @Patch(':id')
    async updateMap(@Param('id') id: number, @Body() map: mapDTO) {
        return this.mapService.updateMap(Number(id), map);
    }

    @Delete(':id')
    async deleteMap(@Param('id') id: number) {
        return this.mapService.deleteMap(Number(id));
    }
}
