import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import mapDTO from 'src/dtos/map.dto';
import { Repository } from 'typeorm';
import { Map } from './maps.entity';

@Injectable()
export class MapsService {
  constructor(@InjectRepository(Map) private mapRepoitory: Repository<Map>) {}

  // find all
  async getAllMaps(seasons?: number) {
    if (seasons) {
      return this.mapRepoitory.find({
        relations: { season: true },
        where: { season: { id: seasons } },
        order: { name: 'ASC' },
      });
    } else {
      return this.mapRepoitory.find();
    }
  }

  // Find one match by ID
  async getMapByID(id: number) {
    const map = await this.mapRepoitory.findOne({
      where: { id: id },
      relations: ['season'],
      loadRelationIds: true,
    });
    if (map) {
      return map;
    }
    throw new HttpException('Match not found', HttpStatus.NOT_FOUND);
  }

  // Patch Map
  async updateMap(id: number, postData: mapDTO) {
    await this.mapRepoitory.update(id, postData);
    const updatedMap = await this.mapRepoitory.findOneBy({ id: id });
    if (updatedMap) {
      return updatedMap;
    }
    throw new HttpException('Todo not found', HttpStatus.NOT_FOUND);
  }

  // Create Map
  async createMap(postData: mapDTO) {
    const newMap = this.mapRepoitory.create(postData);
    await this.mapRepoitory.save(newMap);
    if (newMap) {
      return newMap;
    }
    throw new HttpException('Todo not found', HttpStatus.NOT_FOUND);
  }

  // delete
  async deleteMap(id: number) {
    const deletedMap = await this.mapRepoitory.delete(id);
    if (!deletedMap.affected) {
      throw new HttpException('Todo not found', HttpStatus.NOT_FOUND);
    }
  }
}
