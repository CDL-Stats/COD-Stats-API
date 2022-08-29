import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MapsController } from './maps.controller';
import { Map } from './maps.entity';
import { MapsService } from './maps.service';

@Module({
    imports: [TypeOrmModule.forFeature([Map])],
    controllers: [MapsController],
    providers: [MapsService]
})
export class MapsModule {}
