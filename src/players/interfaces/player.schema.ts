import * as mongoose from 'mongoose';

export const PlayerSchema = new mongoose.Schema({
    
    email: {
        type: String,
        unique: true
    },
    phoneNumber: {
        type: String,
        unique: true
    },
    name: String,

    ranking: String,

    positionRaking: Number,

    urlProfilePic: String
    },
    {timestamps: true, collection: 'players'}
);







