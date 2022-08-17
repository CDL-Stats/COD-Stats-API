import { ApiProperty } from "@nestjs/swagger";
import { Team } from "src/teams/team.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

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

    @Column(({nullable: true}))
    @ApiProperty()
    active: boolean;

    @Column(({nullable: true}))
    @ApiProperty({enum: primaryWeapons})
    primaryWeapon: primaryWeapons;

    @Column(({nullable: true}))
    @ApiProperty()
    birthDate: Date;

    @Column(({nullable: true}))
    @ApiProperty()
    twitchURL: string;

    @Column(({nullable: true}))
    @ApiProperty()
    youtubeURL: string;

    @Column(({nullable: true}))
    @ApiProperty()
    instagramURL: string;

    @Column(({nullable: true}))
    @ApiProperty()
    twitterURL: string;

    @Column(({nullable: true}))
    @ApiProperty()
    country: string;
}