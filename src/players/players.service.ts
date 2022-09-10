import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import UpdatePlayerDTO from 'src/dtos/putPlayer.dto';
import { Repository } from 'typeorm';
import { Player } from './player.entity';

@Injectable()
export class PlayersService {
  constructor(
    @InjectRepository(Player) private playerRepository: Repository<Player>,
  ) {}

  // find all
  getAllPlayers() {
    return this.playerRepository.find({
      order: {
        nickName: 'ASC',
      },
    });
  }

  // Find one player by ID
  async getPlayerByID(id: number) {
    const player = await this.playerRepository.findOneBy({ id: id });
    if (player) {
      return player;
    }

    throw new HttpException('Player not found', HttpStatus.NOT_FOUND);
  }

  // Find one player by slug
  async getPlayerbySlug(nickname: string) {
    const player = await this.playerRepository.findOneBy({
      nickName: nickname,
    });
    if (player) {
      return player;
    }

    throw new HttpException('Player not found', HttpStatus.NOT_FOUND);
  }

  // Find player by team
  async getPlayerByTeam(findSlug: string) {
    const player = await this.playerRepository.find({
      relations: {
        team: true,
      },
      where: {
        team: {
          slug: findSlug,
        },
      },
      order: {
        nickName: 'asc',
      },
    });
    if (player) {
      return player;
    }

    throw new HttpException('Player not found', HttpStatus.NOT_FOUND);
  }

  // Patch Player
  async updatePlayer(id: number, postData: UpdatePlayerDTO) {
    await this.playerRepository.update(id, postData);
    const updatedPlayer = await this.playerRepository.findOneBy({ id: id });
    if (updatedPlayer) {
      return updatedPlayer;
    }
    throw new HttpException('Todo not found', HttpStatus.NOT_FOUND);
  }

  // Create Player
  async createPlayer(postData: UpdatePlayerDTO) {
    const results = await this.playerRepository
      .createQueryBuilder()
      .insert()
      .into('player')
      .values({
        firstName: postData.firstName,
        lastName: postData.lastName,
        nickName: postData.lastName,
        active: postData.active,
        primaryWeapon: postData.primaryWeapon,
        birthDate: postData.birthDate,
        twitchURL: postData.twitchURL,
        instagramURL: postData.instagramURL,
        twitterURL: postData.twitterURL,
        country: postData.country,
        team: { id: postData.team },
      })
      .execute();
    return results;
  }

  // delete
  async deltePlayer(id: number) {
    const deletedTodo = await this.playerRepository.delete(id);
    if (!deletedTodo.affected) {
      throw new HttpException('Todo not found', HttpStatus.NOT_FOUND);
    }
  }
}
