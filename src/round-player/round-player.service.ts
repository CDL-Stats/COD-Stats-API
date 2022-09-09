import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Map } from 'src/maps/maps.entity';
import { Player } from 'src/players/player.entity';
import { RoundTeam } from 'src/round-team/round-team.entity';
import { Round } from 'src/round/round.entity';
import { Team } from 'src/teams/team.entity';
import { Repository } from 'typeorm';
import { RoundPlayer } from './round-player.entity';

@Injectable()
export class RoundPlayerService {
  constructor(
    @InjectRepository(RoundPlayer)
    private readonly roundPlayerRepo: Repository<RoundPlayer>,
  ) {}
  async getPlayerRoundByID(id) {
    const results = await this.roundPlayerRepo
      .createQueryBuilder('q')
      .select(
        'q.id, q.kills, q.deaths, q.assists, q.nonTradedKills, q.highestStreak, q.damage, p.firstName, p.lastName, q.player, q.round, t.slug, r.game as gameMode, m.name as map',
      )
      .leftJoin(Player, 'p', 'q.player = p.id')
      .leftJoin(Round, 'r', 'q.round = r.id')
      .leftJoin(RoundTeam, 'rt', 'q.roundTeam = rt.id')
      .leftJoin(Team, 't', 'rt.team = t.id')
      .leftJoin(Map, 'm', 'r.map = m.id')
      .where('q.id = :id', { id: id })
      .getRawMany();
    return results;
  }

  async postPlayerRound(postData) {
    await this.roundPlayerRepo
      .createQueryBuilder()
      .insert()
      .into('round_player')
      .values({
        kills: postData.kills,
        deaths: postData.deaths,
        assists: postData.assists,
        nonTradedKills: postData.nonTradedKills,
        highestStreak: postData.highestStreak,
        damage: postData.damage,
        player: {
          id: postData.player,
        },
        roundTeam: {
          id: postData.roundTeam,
        },
      })
      .execute();
  }
}
