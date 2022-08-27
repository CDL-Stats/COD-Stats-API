import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { match } from 'assert';
import matchDTO from 'src/dtos/match.dto';
import { Team } from 'src/teams/team.entity';
import { Repository } from 'typeorm';
import { Match } from './match.entity';

@Injectable()
export class MatchService {
    constructor(
    @InjectRepository(Team) private readonly teamRepistory: Repository<Team>,
    @InjectRepository(Match) private matchRepository: Repository<Match>,
    ) {}


    // find all
    async getAllMatches(tournaments?: number) {
        if(tournaments){return this.matchRepository.find({relations: {tournament: true, teams: true}, where: {tournament: {id: tournaments}}})}
        else {return this.matchRepository.find();}
    }

    // Find one match by ID
    async getMatchByID(id: number) {
        const match = await this.matchRepository.findOne({where: {id: id}, relations: ["tournament", "teams"], loadRelationIds: true});
        if (match) {
            return match;
        }
        throw new HttpException('Match not found', HttpStatus.NOT_FOUND);
    }
    
    // Patch Match
    async updateMatch(id: number, postData: matchDTO) {
        let teamList:any=[]; 
        for (const teamID of postData.teams) {
            teamList.push(await this.teamRepistory.findOneBy({ id:teamID }));
          }
        postData.teams = teamList
        // return postData
        await this.matchRepository.save(postData)
        const updatedMatch = await this.matchRepository.findOneBy({id: id});
        if(updatedMatch) {
            return updatedMatch;
        }
        throw new HttpException('Match not found', HttpStatus.NOT_FOUND);
    }

    // Create Match
    async createMatch(postData: matchDTO) {
        let teamList:any=[]; 
        for (const teamID of postData.teams) {
            let teamEntity = await this.teamRepistory.findOneBy({ id:teamID });
            teamList.push(teamEntity);
          }
        postData.teams = teamList
        let newMatch = this.matchRepository.create(postData)
        await this.matchRepository.save(newMatch)
        if(newMatch) {
            return newMatch;
        }
    throw new HttpException('Match not found', HttpStatus.NOT_FOUND);
    }
    
    // Delete Match
    async deleteMatch(id: number) {
        const deletedMatch = await this.matchRepository.delete(id);
        if (!deletedMatch.affected) {
            throw new HttpException('Match not found', HttpStatus.NOT_FOUND);
        }
    }
}
