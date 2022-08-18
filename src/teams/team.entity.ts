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

    @Column({ nullable: true })
    @ApiProperty()
    teamLogo: string;

    @OneToMany(() => Player, (player) => player.team)
    players: Player[]

    @Column({ nullable: true })
    @ApiProperty()
    primaryColor: string;

    @Column({ nullable: true })
    @ApiProperty()
    secondaryColor: string;


    @Column({ nullable: true })
    @ApiProperty()
    shortName: string;

    @Column({ nullable: true })
    @ApiProperty()
    abbreviation: string;

    @Column({ nullable: true })
    @ApiProperty()
    twitterURL: string;

    @Column({ nullable: true })
    @ApiProperty()
    youtubeURL: string;

    @Column({ nullable: true })
    @ApiProperty()
    instagramURL: string;
}