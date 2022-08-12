import { ApiProperty } from "@nestjs/swagger";
import { Player } from "src/players/player.entity";
import { Column, Entity, ManyToOne, OneToMany, PrimaryColumn } from "typeorm";

@Entity()
export class Team {
    @PrimaryColumn()
    slug: string;

    @Column()
    @ApiProperty()
    teamLocation: string;

    @Column()
    @ApiProperty()
    teamName: string;

    @Column()
    @ApiProperty()
    teamLogo: string;

    @OneToMany(() => Player, (player) => player.team)
    players: Player[]
}