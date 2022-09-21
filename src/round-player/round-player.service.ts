import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
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
        'q.id, q.kills, q.deaths, q.assists, q.nonTradedKills, q.highestStreak, q.damage, q.firstBloods, q.hillTime, q.plants, q.defuses, q.zoneCaptures, q.zoneTiersCaptured, q.p1Time, q.p2Time, q.p3Time, q.p4Time, q.p5Time, p.firstName, p.lastName, q.player, t.slug, r.game as gameMode, m.name as map',
      )
      .leftJoin(Player, 'p', 'q.player = p.id')
      .leftJoin(RoundTeam, 'rt', 'q.roundTeam = rt.id')
      .leftJoin(Team, 't', 'rt.team = t.id')
      .leftJoin(Round, 'r', 'rt.round = r.id')
      .leftJoin(Map, 'm', 'r.map = m.id')
      .where('q.id = :id', { id: id })
      .getRawMany();
    return results;
  }

  async getPlayerRoundByRound(id) {
    const results = await this.roundPlayerRepo
      .createQueryBuilder('q')
      .select('q.id, q.kills, q.deaths, p.nickName, rt.id as teamID')
      .leftJoin(Player, 'p', 'q.player = p.id')
      .leftJoin(RoundTeam, 'rt', 'q.roundTeam = rt.id')
      .where('rt.round = :id', { id: id })
      .getRawMany();

    const teamList = results.map((a: []) => a['teamID']);
    let teamOne = [];
    let teamTwo = [];
    results.map((a: []) =>
      a['teamID'] === teamList[0] ? teamOne.push(a) : teamTwo.push(a),
    );
    console.log(teamOne);
    const teamResults = { one: [...teamOne], two: [...teamTwo] };
    return teamResults;
  }

  async postPlayerRound(postData) {
    const result = await this.roundPlayerRepo
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
        firstBloods: postData.roundSpecific.firstBloods,
        plants: postData.roundSpecific.plants,
        defuses: postData.roundSpecific.defuses,
        hillTime: postData.roundSpecific.hillTime,
        p1Time: postData.roundSpecific.p1Time,
        p2Time: postData.roundSpecific.p2Time,
        p3Time: postData.roundSpecific.p3Time,
        p4Time: postData.roundSpecific.p4Time,
        p5Time: postData.roundSpecific.p5Time,
        player: {
          id: postData.player,
        },
        roundTeam: {
          id: postData.roundTeam,
        },
      })
      .execute();
    return result;
  }

  async patchPlayerRound(postData) {
    const result = await this.roundPlayerRepo
      .createQueryBuilder()
      .update()
      .set({
        kills: postData.kills,
        deaths: postData.deaths,
        assists: postData.assists,
        nonTradedKills: postData.nonTradedKills,
        highestStreak: postData.highestStreak,
        damage: postData.damage,
        firstBloods: postData.roundSpecific.firstBloods,
        plants: postData.roundSpecific.plants,
        defuses: postData.roundSpecific.defuses,
        hillTime: postData.roundSpecific.hillTime,
        p1Time: postData.roundSpecific.p1Time,
        p2Time: postData.roundSpecific.p2Time,
        p3Time: postData.roundSpecific.p3Time,
        p4Time: postData.roundSpecific.p4Time,
        p5Time: postData.roundSpecific.p5Time,
        zoneCaptures: postData.roundSpecific.zoneCapture,
        zoneTiersCaptured: postData.roundSpecific.zoneTiers,
        player: {
          id: postData.player,
        },
        roundTeam: {
          id: postData.roundTeam,
        },
      })
      .where('id = :id', { id: postData.id })
      .execute();
    return result;
  }

  // delete
  async deleteRoundPlayer(id: number) {
    const result = await this.roundPlayerRepo
      .createQueryBuilder()
      .delete()
      .from(RoundPlayer)
      .where('id = :id', { id: id })
      .execute();
  }
}
