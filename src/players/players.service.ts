import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { CreatePlayerDTO } from './dtos/createPlayer.dto';
import { Player } from './interfaces/player.interface';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class PlayersService {

    private readonly logger = new Logger(PlayersService.name);

    private players: Player[] = [];

    async createUpdatePlayer(createPlayerDTO: CreatePlayerDTO): Promise<Player> {

        const { email } = createPlayerDTO;

        const alreadyExists = this.players.find(player => player.email === email);

        if (!alreadyExists) {
            return this.create(createPlayerDTO);
        }

        return this.update(createPlayerDTO, alreadyExists);

    };

    async findAllPlayers(): Promise<Player[]> {
        return this.players;
    };

    async findPlayerByEmail(email: string): Promise<Player> {
        const player = this.players.find(player => player.email === email);

        if(!player) {
            throw new NotFoundException('Usuário não encontrado!')
        }
        return player;
    };

    async deletePlayer(email: string): Promise<String> {

        const findPlayer = this.players.find(player => player.email === email);
        
        if(!findPlayer) {
            throw new NotFoundException('Usuário não encontrado!');
        };

        this.players = this.players.filter(player => player.email !== findPlayer.email);
        return "Usuario deletado com sucesso!"
    };

    private create(createPlayerDTO: CreatePlayerDTO): Player {
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

        this.players.push(player);

        return player;
    };

    private update(createPlayerDTO: CreatePlayerDTO, player: Player): Player {
        const { name } = createPlayerDTO;

        player.name = name;

        return player;
    }
}
