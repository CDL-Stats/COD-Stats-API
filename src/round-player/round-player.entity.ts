import { ApiProperty } from '@nestjsx/crud/lib/crud';
import { Player } from 'src/players/player.entity';
import { Round } from 'src/round/round.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class RoundPlayer {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Round, (round) => round.playerRound, { onDelete: 'CASCADE' })
  @ApiProperty()
  round: Round;

  @ManyToOne(() => Player, (player) => player.playerRound)
  @ApiProperty()
  player: Player;

  @Column()
  kills: number;

  @Column()
  deaths: number;

  @Column()
  assists: number;

  @Column()
  nonTradedKills: number;

  @Column()
  highestStreak: number;

  @Column()
  damage: number;
}
