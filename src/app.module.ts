import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PlayersModule } from './players/players.module';
import { Player } from './players/player.entity';
import { TeamsModule } from './teams/teams.module';
import { TeamsController } from './teams/teams.controller';
import { TeamsService } from './teams/teams.service';
import { Team } from './teams/team.entity';
import { Tournament } from './tournament/tournament.entity';
import { TournamentModule } from './tournament/tournament.module';
import { SeasonModule } from './season/season.module';
import { Season } from './season/season.entity';
import { MatchModule } from './match/match.module';
import { Match } from './match/match.entity';

@Module({
  imports:  [TypeOrmModule.forRoot({
    type: 'mysql',
    host: 'mysql-codstatsapi-19237.nodechef.com',
    port: 2461,
    username: 'ncuser_12648',
    password: 'E3mHf0bVYBojPlDQNm7OGNCRlbcG32',
    database: 'codstatsapi',
    entities: [Player, Team, Tournament, Season, Match],
    synchronize: true,
  }), PlayersModule, TeamsModule, TournamentModule, SeasonModule, MatchModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
