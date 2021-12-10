import { Body, Controller, Delete, Get, Post, Patch, Query, Logger } from '@nestjs/common';
import { CreatePlayerDTO } from './dtos/createPlayer.dto';
import { PlayersService } from './players.service';
import { Player } from './interfaces/player.interface';

@Controller('api/v1/players')
export class PlayersController {

    constructor(private readonly playersService: PlayersService) {};

    @Post()
    async createPlayer(
        @Body() createPlayerDTO: CreatePlayerDTO): Promise<Player> {
            
            return await this.playersService.createPlayer(createPlayerDTO);
    };

    @Get()
    async getPlayers(
        @Query('email') email: string): Promise<Player[] | Player> {
            
            return await this.playersService.getPlayers(email)
    };

    
    @Delete()
    async deletePlayer(
        @Query('email') email: string): Promise<Object> {
            return await this.playersService.deletePlayer(email)
    };
};
