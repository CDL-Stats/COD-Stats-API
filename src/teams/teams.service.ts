import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { Repository } from 'typeorm';
import UpdateTeamDTO from '../dtos/team.dto';
import { Team } from './team.entity';
var AWS = require('aws-sdk');
AWS.config = {
  accessKeyId: process.env.AWS_ACCESS,
  secretAccessKey: process.env.AWS_SECRET,
  region: process.env.AWS_REGION,
};
var s3Bucket = new AWS.S3({ params: { Bucket: 'codstattracker' } });

@Injectable()
export class TeamsService {
  constructor(
    @InjectRepository(Team) private teamRepoitory: Repository<Team>,
  ) {}

  // find all
  getAllTeams() {
    return this.teamRepoitory.find({
      order: {
        teamName: 'ASC',
      },
    });
  }
  // Find one team by slug
  async getTeamBySlug(slug: string) {
    const team = await this.teamRepoitory.findOneBy({ slug: slug });
    if (team) {
      return team;
    }

    throw new HttpException('Team not found', HttpStatus.NOT_FOUND);
  }

  // Patch Team
  async updateTeam(slug: string, postData: UpdateTeamDTO) {
    if (postData.picture) {
      console.log(postData.picture);
      console.log('HERE');
      const url = await this.handlePicture(postData);
      this.updatePictureURL(url, slug);
      delete postData.picture;
    }
    await this.teamRepoitory.update({ slug: slug }, postData);
    const updatedTeam = await this.teamRepoitory.findOneBy({ slug: slug });
    if (updatedTeam) {
      return updatedTeam;
    }
    throw new HttpException('Team not found', HttpStatus.NOT_FOUND);
  }

  async updatePictureURL(pictureURL, slug) {
    return this.teamRepoitory
      .createQueryBuilder()
      .update()
      .set({
        pictureURL: pictureURL,
      })
      .where('slug = :slug', { slug: slug })
      .execute();
  }

  async handlePicture(postData: UpdateTeamDTO) {
    const picture = postData.picture;
    var buf = Buffer.from(
      picture['file'].replace(/^data:image\/\w+;base64,/, ''),
      'base64',
    );

    var data = {
      Key: `teams/${picture['fileName']}`,
      Body: buf,
      ContentEncoding: 'base64',
      ContentType: 'image/jpeg',
    };
    const pictureData = await s3Bucket.putObject(
      data,
      await function (err, data) {
        if (err) {
          console.log(err);
        }
      },
    );
    if (pictureData['httpRequest']['stream']['finished']) {
      return `https://codstattracker.s3.amazonaws.com/teams/${picture['fileName']}`;
    }
  }

  // Create Team
  async createTeam(postData: UpdateTeamDTO) {
    const newTeam = this.teamRepoitory.create(postData);
    await this.teamRepoitory.save(newTeam);
    if (newTeam) {
      return newTeam;
    }
    throw new HttpException('Team not found', HttpStatus.NOT_FOUND);
  }

  // delete
  async deleteTeam(slug: string) {
    const deletedTeam = await this.teamRepoitory.delete(slug);
    if (!deletedTeam.affected) {
      throw new HttpException('Team not found', HttpStatus.NOT_FOUND);
    }
  }
}
