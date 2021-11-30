import { Injectable, Logger } from '@nestjs/common';
import { CreatePlayerDTO } from './dtos/createPlayer.dto';
import { Player } from './interfaces/player.interface';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class PlayersService {

    private readonly logger = new Logger(PlayersService.name);

    private players: Player[] = [];

    async createUpdatePlayer(createPlayerDTO: CreatePlayerDTO): Promise<void> {

        this.create(createPlayerDTO);

    }

    private create(createPlayerDTO: CreatePlayerDTO): void {
        const { name, phoneNumber, email } = createPlayerDTO;

        const player: Player = {
            _id: uuidv4(),
            name,
            phoneNumber,
            email,
            ranking: 'A',
            positionRanking: 1,
            urlProfilePic: 'https://i.pinimg.com/736x/6f/1e/fb/6f1efb3e2f7ddb6f6b9a3dbefabe0c67.jpg'
        };
        this.logger.log(`createPlayerDTO: ${JSON.stringify(player)}`);
        this.players.push(player);
    }
}
