import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TeamsController } from './teams.controller';
import { TeamsService } from './teams.service';
import { Team } from './team.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Team])],
  exports: [TypeOrmModule],
  controllers: [TeamsController],
  providers: [TeamsService]
})
export class TeamsModule {}
