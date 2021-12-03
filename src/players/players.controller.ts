import { Body, Controller, Delete, Get, Post, Query } from '@nestjs/common';
import { CreatePlayerDTO } from './dtos/createPlayer.dto';
import { PlayersService } from './players.service';
import { Player } from './interfaces/player.interface';

@Controller('api/v1/players')
export class PlayersController {

    constructor(private readonly playersService: PlayersService) {};

    @Post()
    async createUpdatePlayer(
        @Body() createPlayerDTO: CreatePlayerDTO): Promise<Player> {
            
            return await this.playersService.createUpdatePlayer(createPlayerDTO);
    };

    @Get()
    async getPlayers(@Query('email') email: string): Promise<Player[] | Player> {

        if(email) {
            return await this.playersService.findPlayerByEmail(email);
        } else {
            return await this.playersService.findAllPlayers();
        };
    };

    @Delete()
    async deletePlayer(@Query('email') email: string): Promise<String> {

        return await this.playersService.deletePlayer(email);
    }

};
