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
import { MapsController } from './maps/maps.controller';
import { MapsService } from './maps/maps.service';
import { MapsModule } from './maps/maps.module';
import { Map } from './maps/maps.entity';
import { MatchTeamModule } from './match-team/match-team.module';
import { MatchTeam } from './match-team/match-team.entity';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DATABASE_HOST,
      port: Number(process.env.DATABASE_PORT),
      username: process.env.DATABASE_USERNAME,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_NAME,
      entities: [Player, Team, Tournament, Season, Match, Map, MatchTeam],
      synchronize: true,
    }),
    PlayersModule,
    TeamsModule,
    TournamentModule,
    SeasonModule,
    MatchModule,
    MapsModule,
    MatchTeamModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
