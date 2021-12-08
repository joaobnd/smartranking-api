import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { CreatePlayerDTO } from './dtos/createPlayer.dto';
import { Player } from './interfaces/player.interface';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class PlayersService {

    constructor(@InjectModel('Player') private readonly playerModel: Model<Player>) {};

    async createPlayer(createPlayerDTO: CreatePlayerDTO): Promise<Player> {
        const player = await new this.playerModel(createPlayerDTO).save();
        
        return player;
    };
    
    async getPlayer(email: string): Promise<Player[] | Player> {


        if(!email) {
            const players = await this.playerModel.find();
            return players;
        };

        const player = await this.playerModel.findOne({ email });

        if(!player) {
            throw new NotFoundException('Player not found');
        };

        return player;

    };

    async deletePlayer(email: string): Promise<Object> {

        const deleted = await this.playerModel.findOneAndDelete({ email });

        if(!deleted) {
            throw new NotFoundException('Player not found!')
        };

        return {
            statusCode: 200,
            message: 'Player deleted successfully',
            player: deleted.name
        };
    }; 
};
