import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import tournamentDTO from 'src/dtos/tournament.dto';
import { Repository } from 'typeorm';
import { Tournament } from './tournament.entity';

@Injectable()
export class TournamentService {
    constructor(
        @InjectRepository(Tournament) private tournamentRepository: Repository<Tournament>,
      ) {}
    
    // find all
    getAllTournaments() {
        return this.tournamentRepository.find({relations: ["season"], loadRelationIds: true});
  }

    // Find one team by slug
    async getTournamentbyID(id: number) {
    const tournament = await this.tournamentRepository.findOne({where: {id: id}, relations: ["season"], loadRelationIds: true});
    if (tournament) {
        return tournament;
    }

    throw new HttpException('Tournament not found', HttpStatus.NOT_FOUND);
    }

    // Patch Team
    async updateTournament(id: number, postData: tournamentDTO) {
        await this.tournamentRepository.update(id, postData);
        const updatedTournament = await this.tournamentRepository.findOneBy({id: id});
        if(updatedTournament) {
            return updatedTournament;
        }
        throw new HttpException('Todo not found', HttpStatus.NOT_FOUND);
    }

        // Create Team
        async createTournament(postData: tournamentDTO) {
        const newTournament = this.tournamentRepository.create(postData);
        await this.tournamentRepository.save(newTournament)
        if(newTournament) {
            return newTournament;
        }
        throw new HttpException('Todo not found', HttpStatus.NOT_FOUND);
    }

        // delete
        async deleteTournament(id: number) {
            const deletedTodo = await this.tournamentRepository.delete(id);
            if (!deletedTodo.affected) {
                throw new HttpException('Todo not found', HttpStatus.NOT_FOUND);
            }
        }
}

