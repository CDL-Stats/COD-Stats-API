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

@Module({
  imports:  [TypeOrmModule.forRoot({
    type: 'mysql',
    host: 'mysql-codstatsapi-19237.nodechef.com',
    port: 2461,
    username: 'ncuser_12648',
    password: 'E3mHf0bVYBojPlDQNm7OGNCRlbcG32',
    database: 'codstatsapi',
    entities: [Player, Team, Tournament],
    synchronize: true,
  }), PlayersModule, TeamsModule, TournamentModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
