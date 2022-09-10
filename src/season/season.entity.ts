import { ApiProperty } from '@nestjsx/crud/lib/crud';
import { Map } from 'src/maps/maps.entity';
import { PlayerHistory } from 'src/player-history/player-history.entity';
import { Tournament } from 'src/tournament/tournament.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Season {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @ApiProperty()
  year: number;

  @Column()
  @ApiProperty()
  title: string;

  @OneToMany(() => Tournament, (tournament) => tournament.season)
  tournaments: Tournament[];

  @OneToMany(() => Map, (map) => map.season)
  map: Map[];

  @OneToMany(() => PlayerHistory, (playerHistory) => playerHistory.season)
  playerHistory: PlayerHistory[];
}
