import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Match } from 'src/match/match.entity';
import { Player } from 'src/players/player.entity';
import { RoundTeam } from 'src/round-team/round-team.entity';
import { Round } from 'src/round/round.entity';
import { Season } from 'src/season/season.entity';
import { Team } from 'src/teams/team.entity';
import { Tournament } from 'src/tournament/tournament.entity';
import { Repository } from 'typeorm';
import { PlayerHistory } from './player-history.entity';

@Injectable()
export class PlayerHistoryService {
  constructor(
    @InjectRepository(PlayerHistory)
    private readonly playerHistoryRepo: Repository<PlayerHistory>,
    @InjectRepository(RoundTeam) private roundTeamRepo: Repository<RoundTeam>,
  ) {}

  async getPlayerHistoryByTeamSeason(team, season) {
    const players = await this.playerHistoryRepo
      .createQueryBuilder('q')
      .select('q.id, p.firstName, p.lastName, p.nickName, p.id as playerID')
      .leftJoin(Player, 'p', 'q.player = p.id')
      .where('q.season = :seasonID', { seasonID: season })
      .andWhere('q.team = :teamID', { teamID: team })
      .orderBy('p.nickName')
      .getRawMany();

    const summary = await this.playerHistoryRepo
      .createQueryBuilder('q')
      .select('q.id, s.title, s.id as seasonID, t.id as teamID, t.teamName')
      .leftJoin(Season, 's', 'q.season = s.id')
      .leftJoin(Team, 't', 'q.team = t.id')
      .where('q.season = :seasonID', { seasonID: season })
      .andWhere('q.team = :teamID', { teamID: team })
      .getRawMany();

    const results = { data: summary, players: players };
    return results;
  }

  async getPlayersByRoundTeam(id) {
    const results = await this.roundTeamRepo
      .createQueryBuilder('q')
      .select('q.id, p.id as playerID, p.nickName')
      .leftJoin(Match, 'm', 'm.id = q.match')
      .leftJoin(Tournament, 't', 't.id = m.tournament')
      .leftJoin(
        PlayerHistory,
        'ph',
        'ph.season = t.season and ph.team = q.team',
      )
      .leftJoin(Player, 'p', 'p.id = ph.player')
      .where('q.id = :id', { id: id })
      .orderBy('p.nickName')
      .getRawMany();

    return results;
  }

  async postPlayerHistory(postData) {
    const results = await this.playerHistoryRepo
      .createQueryBuilder()
      .insert()
      .into('player_history')
      .values({
        player: {
          id: postData.player,
        },
        team: {
          id: postData.team,
        },
        season: {
          id: postData.season,
        },
      })
      .execute();
    return results;
  }
}
