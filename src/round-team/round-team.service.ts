import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Map } from 'src/maps/maps.entity';
import { Match } from 'src/match/match.entity';
import { Round } from 'src/round/round.entity';
import { Team } from 'src/teams/team.entity';
import { Tournament } from 'src/tournament/tournament.entity';
import { Repository } from 'typeorm';
import { RoundTeam } from './round-team.entity';

@Injectable()
export class RoundTeamService {
  constructor(
    @InjectRepository(RoundTeam)
    private readonly roundTeamRepo: Repository<RoundTeam>,
  ) {}

  async getTeamRoundByID(id) {
    const results = await this.roundTeamRepo
      .createQueryBuilder('q')
      .select(
        'q.id, t.teamName, q.round, r.game as gameMode, m.id as map, ma.id as matchID, tm.id as tournamentID, tm.name as tournamentName',
      )
      .leftJoin(Team, 't', 'q.team = t.id')
      .leftJoin(Round, 'r', 'q.round = r.id')
      .leftJoin(Map, 'm', 'r.map = m.id')
      .leftJoin(Match, 'ma', 'r.match = ma.id')
      .leftJoin(Tournament, 'tm', 'ma.tournament = tm.id')
      .where('q.id = :id', { id: id })
      .getRawMany();
    return results;
  }
}
