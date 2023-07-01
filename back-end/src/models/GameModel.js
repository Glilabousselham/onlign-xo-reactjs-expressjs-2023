const mongoose = require('mongoose');

const gameSchema = new mongoose.Schema({
    ready: {
        type: {
            x: {
                type: Boolean,
                default: false,
            },
            o: {
                type: Boolean,
                default: false,
            },
        },
        default: {
            x: false,
            o: false,
        },
    },
    playerX: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    playerO: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    finished: {
        type: Boolean,
        default: false,
    },

    rounds: {
        type: [{
            positions: {
                '1': {
                    type: String,
                    enum: ['x', 'o', null],
                    default: null,
                },
                '2': {
                    type: String,
                    enum: ['x', 'o', null],
                    default: null,
                },
                // Add keys for positions 3 to 9 in a similar way
            },
            winner: {
                type: String,
                enum: ['x', 'x', 'draw', null],
                default: null,
            },
        }],
        default: [],
    },
    maxRounds: {
        type: Number,
        default: 5,
    },
    currentRound: {
        type: Number,
        default: 1,
    },
    playerXLeft: {
        type: Boolean,
        default: false,
    },
    playerOLeft: {
        type: Boolean,
        default: false,
    },
}, {
    timestamps: true
});

gameSchema.methods.getInfo = function () {

    return {
        _id: this._id,
        playerX: this.playerX,
        playerO: this.playerO,
        ready: this.ready,
        playerXLeft: this.playerXLeft,
        playerOLeft: this.playerOLeft,
        rounds: this.rounds,
        currentRound: this.currentRound,
        maxRounds: this.maxRounds,
        finished: this.finished,
        createdAt: this.createdAt,
        updatedAt: this.updatedAt,
        score: {
            x: this.rounds.reduce((totalScore, round) => round.winner === 'x' ? totalScore + 1 : totalScore, 0) ?? 0,
            o: this.rounds.reduce((totalScore, round) => round.winner === 'o' ? totalScore + 1 : totalScore, 0) ?? 0,
        }
    }
}

const GameModel = mongoose.model('Game', gameSchema);

module.exports = GameModel;
