import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { Repository } from 'typeorm';
import UpdateTeamDTO from '../dtos/team.dto';
import { Team } from './team.entity';

@Injectable()
export class TeamsService {
    constructor(
        @InjectRepository(Team) private teamRepoitory: Repository<Team>,
      ) {}

    // find all
    getAllTeams() {
        return this.teamRepoitory.find();
  }
    // Find one team by slug
    async getTeamBySlug(slug: string) {
        const team = await this.teamRepoitory.findOneBy({slug: slug});
        if (team) {
            return team;
        }

        throw new HttpException('Player not found', HttpStatus.NOT_FOUND);
        }

    // Patch Team
    async updateTeam(slug: string, postData: UpdateTeamDTO) {
        await this.teamRepoitory.update(slug, postData);
        const updatedTeam = await this.teamRepoitory.findOneBy({slug: slug});
        if(updatedTeam) {
            return updatedTeam;
        }
        throw new HttpException('Todo not found', HttpStatus.NOT_FOUND);
    }
    
      // Create Team
      async createTeam(postData: UpdateTeamDTO) {
        const newTeam = await this.teamRepoitory.create(postData);
        await this.teamRepoitory.save(newTeam)
        if(newTeam) {
            return newTeam;
        }
        throw new HttpException('Todo not found', HttpStatus.NOT_FOUND);
    }

        // delete
        async deleteTeam(slug: string) {
        const deletedTodo = await this.teamRepoitory.delete(slug);
        if (!deletedTodo.affected) {
            throw new HttpException('Todo not found', HttpStatus.NOT_FOUND);
        }
        }
}

