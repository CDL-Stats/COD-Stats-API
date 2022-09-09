import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PlayersModule } from './players/players.module';
import { Player } from './players/player.entity';
import { TeamsModule } from './teams/teams.module';
import { Team } from './teams/team.entity';
import { Tournament } from './tournament/tournament.entity';
import { TournamentModule } from './tournament/tournament.module';
import { SeasonModule } from './season/season.module';
import { Season } from './season/season.entity';
import { MatchModule } from './match/match.module';
import { Match } from './match/match.entity';
import { MapsModule } from './maps/maps.module';
import { Map } from './maps/maps.entity';
import { MatchTeamModule } from './match-team/match-team.module';
import { MatchTeam } from './match-team/match-team.entity';
import { ConfigModule } from '@nestjs/config';
import { RoundModule } from './round/round.module';
import { Round } from './round/round.entity';
import { RoundTeamController } from './round-team/round-team.controller';
import { RoundTeamService } from './round-team/round-team.service';
import { RoundTeamModule } from './round-team/round-team.module';
import { RoundTeam } from './round-team/round-team.entity';
import { RoundPlayerController } from './round-player/round-player.controller';
import { RoundPlayerService } from './round-player/round-player.service';
import { RoundPlayerModule } from './round-player/round-player.module';
import { RoundPlayer } from './round-player/round-player.entity';

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
      entities: [
        Player,
        Team,
        Tournament,
        Season,
        Match,
        Map,
        MatchTeam,
        Round,
        RoundTeam,
        RoundPlayer,
      ],
      synchronize: true,
      logging: true,
    }),
    PlayersModule,
    TeamsModule,
    TournamentModule,
    SeasonModule,
    MatchModule,
    MapsModule,
    MatchTeamModule,
    RoundModule,
    RoundTeamModule,
    RoundPlayerModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
