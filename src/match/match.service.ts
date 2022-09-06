import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { match } from 'assert';
import { matches } from 'class-validator';
import matchDTO from 'src/dtos/match.dto';
import MatchQueryDTO from 'src/dtos/matchQuery.dto';
import { MatchTeam } from 'src/match-team/match-team.entity';
import { Team } from 'src/teams/team.entity';
import { In, Repository } from 'typeorm';
import { Match } from './match.entity';

@Injectable()
export class MatchService {
  constructor(
    @InjectRepository(Team) private readonly teamRepistory: Repository<Team>,
    @InjectRepository(Match) private matchRepository: Repository<Match>,
    @InjectRepository(MatchTeam) private matchTeamRepo: Repository<MatchTeam>,
  ) {}

  async getMatches(params: MatchQueryDTO) {
    const where = {
      id: params.ids ? In(params.ids) : undefined,
      tournament: params.tournamentID ? { id: params.tournamentID } : undefined,
    };

    const foundMatches = await this.matchRepository.find({
      where: where,
      relations: ['tournament'],
    });

    const matches = foundMatches.map((match) => match.id);

    const teams = await this.getTeamData(matches);

    const results = await this.zipTeamandMatch(foundMatches, teams);

    return results;
  }

  // FUNCTION TO FIND TEAM DATA
  async getTeamData(matchIDs) {
    const results = await this.matchTeamRepo
      .createQueryBuilder('q')
      .select('q.id, q.matchId')
      .leftJoinAndSelect(Team, 'team', 'q.team = team.id')
      .where('q.match IN (:matchId)', { matchId: matchIDs })
      .getRawMany();
    return results;
  }

  // FUNCTION TO ZIP TEAMS AND MATCHES
  async zipTeamandMatch(matches, teams) {
    return matches.map((match) => {
      const foundTeams = teams.filter((team) => {
        return team.matchId == match.id;
      });
      return {
        ...match,
        teams: foundTeams,
      };
    });
  }

  // Patch Match
  async updateMatch(id: number, postData: matchDTO) {
    const teamList = postData.teams;
    postData.teams = teamList;
    delete postData.teams;
    teamList.map(async (team) => {
      await this.matchTeamRepo
        .createQueryBuilder()
        .update()
        .set({
          team: team['teamId'],
        })
        .where('id = :id', { id: team['id'] })
        .execute();
    });
    await this.matchRepository.save(postData);
    const updatedMatch = await this.matchRepository.findOneBy({ id: id });

    if (updatedMatch) {
      return updatedMatch;
    }
    throw new HttpException('Match not found', HttpStatus.NOT_FOUND);
  }

  // Create Match
  async createMatch(postData: matchDTO) {
    const teamList = postData.teams;
    postData.teams = teamList;
    delete postData.teams;

    let newMatch = this.matchRepository.create(postData);
    await this.matchRepository.save(newMatch);

    await this.matchTeamRepo
      .createQueryBuilder()
      .insert()
      .into('match_team')
      .values({ matchId: 4 })
      .execute();

    if (newMatch) {
      return newMatch;
    }

    throw new HttpException('Match not found', HttpStatus.NOT_FOUND);
  }

  // Delete Match (Deletes match & match_team)
  async deleteMatch(id: number) {
    const deletedMatch = await this.matchRepository.delete(id);

    if (!deletedMatch.affected) {
      throw new HttpException('Match not found', HttpStatus.NOT_FOUND);
    }
  }
}
