import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import roundDTO from 'src/dtos/round.dto';
import RoundQueryDTO from 'src/dtos/roundQuery.dto';
import { Map } from 'src/maps/maps.entity';
import { MatchTeam } from 'src/match-team/match-team.entity';
import { RoundTeam } from 'src/round-team/round-team.entity';
import { Team } from 'src/teams/team.entity';
import { In, Repository } from 'typeorm';
import { Round } from './round.entity';

@Injectable()
export class RoundService {
  constructor(
    @InjectRepository(Round) private roundRepo: Repository<Round>,
    @InjectRepository(MatchTeam) private matchTeamRepo: Repository<MatchTeam>,
    @InjectRepository(RoundTeam) private roundTeamRepo: Repository<RoundTeam>,
  ) {}

  // GET ALL ROUNDS
  async getRounds() {
    const results = await this.roundRepo.find({
      relations: ['map', 'match'],
    });
    if (results) {
      return results;
    }

    throw new HttpException('Team not found', HttpStatus.NOT_FOUND);
  }

  // GET A SINGLE ROUND
  async getRound(id: number) {
    const results = await this.roundRepo.find({
      where: { id: id },
      relations: ['map', 'match'],
    });

    const matchID = results[0].match.id;
    let params = { ids: id, matchID: matchID };

    const teams = await this.getTeamRoundData(params);

    let allResults = { ...results };
    allResults['team'] = { ...teams };

    if (allResults) {
      return allResults;
    }

    throw new HttpException('Team not found', HttpStatus.NOT_FOUND);
  }

  // GET ROUNDS BY MATCH
  async getRoundByMatch(id: number) {
    const results = await this.roundRepo.find({
      where: { match: { id: id } },
      relations: ['map', 'match'],
    });

    // let params = { matchID: id };
    // const teams = await this.getTeamRoundData(params);
    // const allResults = await this.zipRoundAndTeams(results, teams);

    if (results) {
      return results;
    }

    throw new HttpException('Team not found', HttpStatus.NOT_FOUND);
  }

  async getTeamData(matchIDs) {
    const results = await this.matchTeamRepo
      .createQueryBuilder('q')
      .select('q.id, q.matchId')
      .leftJoinAndSelect(Team, 'team', 'q.team = team.id')
      .where('q.match IN (:matchId)', { matchId: matchIDs })
      .getRawMany();
    return results;
  }

  async zipRoundAndTeams(rounds, teams) {
    return rounds.map((round) => {
      const foundTeams = teams.filter((team) => {
        return team.round.id == round.id;
      });
      return {
        ...rounds,
        teams: foundTeams,
      };
    });
  }

  async getTeamRoundData(params) {
    const where = {
      round: params.ids ? { id: params.ids } : undefined,
      match: params.matchID ? { id: params.matchID } : undefined,
    };

    const foundTeams = await this.roundTeamRepo.find({
      where: where,
      relations: ['match', 'round', 'team'],
    });

    return foundTeams;
  }

  // POST A ROUND
  async createRound(postData: roundDTO) {
    const roundData = await this.roundRepo
      .createQueryBuilder()
      .insert()
      .into('round')
      .values({
        match: { id: postData.match },
        map: {
          id: postData.map,
        },
        game: postData.game,
      })
      .execute();

    const roundID = roundData['raw']['insertId'];

    const teamData = await this.roundTeamRepo
      .createQueryBuilder()
      .insert()
      .into('round_team')
      .values([
        {
          score: postData['teams']['teamOnePoints'],
          WL: postData['teams']['teamOneW'],
          match: { id: postData.match },
          round: {
            id: roundID,
          },
          team: {
            id: postData['teams']['teamOne'],
          },
        },
        {
          score: postData['teams']['teamTwoPoints'],
          WL: postData['teams']['teamTwoW'],
          match: { id: postData.match },
          round: {
            id: roundID,
          },
          team: {
            id: postData['teams']['teamTwo'],
          },
        },
      ])
      .execute();
    return roundID;
  }
}
