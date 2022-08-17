import { ApiProperty } from "@nestjs/swagger";
import { Player } from "src/players/player.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Team {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        unique: true
      })
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

    @Column()
    @ApiProperty()
    primaryColor: string;

    @Column()
    @ApiProperty()
    secondaryColor: string;


    @Column()
    @ApiProperty()
    shortName: string;

    @Column()
    @ApiProperty()
    abbreviation: string;

    @Column()
    @ApiProperty()
    twitterURL: string;

    @Column()
    @ApiProperty()
    youtubeURL: string;

    @Column()
    @ApiProperty()
    instagramURL: string;
}