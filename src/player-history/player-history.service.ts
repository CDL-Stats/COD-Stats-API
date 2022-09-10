import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Player } from 'src/players/player.entity';
import { Season } from 'src/season/season.entity';
import { Team } from 'src/teams/team.entity';
import { Repository } from 'typeorm';
import { PlayerHistory } from './player-history.entity';

@Injectable()
export class PlayerHistoryService {
  constructor(
    @InjectRepository(PlayerHistory)
    private readonly playerHistoryRepo: Repository<PlayerHistory>,
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

  async postPlayerHistory(postData) {
    await this.playerHistoryRepo
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
  }
}
