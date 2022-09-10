import { ApiProperty } from '@nestjsx/crud/lib/crud';
import { Player } from 'src/players/player.entity';
import { Season } from 'src/season/season.entity';
import { Team } from 'src/teams/team.entity';
import { Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class PlayerHistory {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Player, (player) => player.playerHistory)
  @ApiProperty()
  player: Player;

  @ManyToOne(() => Team, (team) => team.playerHistory)
  @ApiProperty()
  team: Team;

  @ManyToOne(() => Season, (season) => season.playerHistory)
  @ApiProperty()
  season: Season;
}
