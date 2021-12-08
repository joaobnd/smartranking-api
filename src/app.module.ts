import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PlayersModule } from './players/players.module';
require('dotenv').config();

@Module({
  imports: [MongooseModule.forRoot(process.env.DB_URL,   
  {useUnifiedTopology: true, useNewUrlParser: true}),
     PlayersModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
