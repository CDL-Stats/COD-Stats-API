import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import seasonDTO from 'src/dtos/season.dto';
import { Repository } from 'typeorm';
import { Season } from './season.entity';

@Injectable()
export class SeasonService {
    constructor(
        @InjectRepository(Season) private seasonRepository: Repository<Season>,
      ) {}

    // find all
    getAllSeasons() {
        return this.seasonRepository.find();
  }
  // Find season by id
  async getSeasonByID(id: number) {
    const season = await this.seasonRepository.findOneBy({id: id});
    if (season) {
        return season;
    }
    
    throw new HttpException('Season not found', HttpStatus.NOT_FOUND);
}

    // Patch Season
    async updateSeason(id: number, postData: seasonDTO) {
        await this.seasonRepository.update(id, postData);
        const updatedSeason = await this.seasonRepository.findOneBy({id: id});
        if(updatedSeason) {
            return updatedSeason;
        }
        throw new HttpException('Season not found', HttpStatus.NOT_FOUND);
    }

    // Create Season
    async createSeason(postData: seasonDTO) {
        const newSeason = this.seasonRepository.create(postData);
        await this.seasonRepository.save(newSeason)
        if(newSeason) {
            return newSeason;
        }
        throw new HttpException('Season not found', HttpStatus.NOT_FOUND);
    }
    // delete
    async deleteSeason(id: number) {
        const deletedSeason = await this.seasonRepository.delete(id);
        if (!deletedSeason.affected) {
            throw new HttpException('Season not found', HttpStatus.NOT_FOUND);
        }
    }
}
