import { ApiProperty } from "@nestjs/swagger";
import { Team } from "src/teams/team.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

export enum primaryWeapons {
    AR = 'AR',
    Sub = 'Sub',
  }

@Entity()
export class Player {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    @ApiProperty()
    firstName: string;

    @Column()
    @ApiProperty()
    lastName: string;

    @Column()
    @ApiProperty()
    nickName: string;
    
    @ManyToOne(() => Team, team => team.players, { eager: true })
    @ApiProperty()
    @JoinColumn()
    team: Team;

    @Column()
    @ApiProperty()
    active: boolean;

    @Column()
    @ApiProperty({enum: primaryWeapons})
    primaryWeapon: primaryWeapons;

    @Column()
    @ApiProperty()
    birthDate: Date;

    @Column()
    @ApiProperty()
    twitchURL: string;

    @Column()
    @ApiProperty()
    youtubeURL: string;

    @Column()
    @ApiProperty()
    instagramURL: string;

    @Column()
    @ApiProperty()
    twitterURL: string;

    @Column()
    @ApiProperty()
    country: string;
}