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
                '3': {
                    type: String,
                    enum: ['x', 'o', null],
                    default: null,
                },
                '4': {
                    type: String,
                    enum: ['x', 'o', null],
                    default: null,
                },
                '5': {
                    type: String,
                    enum: ['x', 'o', null],
                    default: null,
                },
                '6': {
                    type: String,
                    enum: ['x', 'o', null],
                    default: null,
                },
                '7': {
                    type: String,
                    enum: ['x', 'o', null],
                    default: null,
                },
                '8': {
                    type: String,
                    enum: ['x', 'o', null],
                    default: null,
                },
                '9': {
                    type: String,
                    enum: ['x', 'o', null],
                    default: null,
                },
                // Add keys for positions 3 to 9 in a similar way
            },
            turn: {
                type: String,
                enum: ['x', 'o'],
                default: "x",
            },
            winner: {
                type: String,
                enum: ['x', 'o', 'draw', null],
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


    const scoreX = this.rounds.reduce((totalScore, round) => round.winner === 'x' ? totalScore + 1 : totalScore, 0) ?? 0
    const scoreO = this.rounds.reduce((totalScore, round) => round.winner === 'o' ? totalScore + 1 : totalScore, 0) ?? 0


    return {
        _id: this._id,
        playerX: {
            _id: this.playerX._id,
            username: this.playerX.username,
            image: this.playerX.image,
            score: scoreX,
            type: "x",
        },
        playerO: {
            _id: this.playerO._id,
            username: this.playerO.username,
            image: this.playerO.image,
            score: scoreO,
            type: "o",
        },
        ready: this.ready,
        playerXLeft: this.playerXLeft,
        playerOLeft: this.playerOLeft,
        rounds: this.rounds,
        currentRound: this.currentRound,
        currentRoundInfo: {
            turn: this.rounds[this.currentRound - 1].turn,
            positions: this.rounds[this.currentRound - 1].positions,
            winner: this.rounds[this.currentRound - 1].winner,
            winnerUser: this.rounds[this.currentRound - 1].winner === null ? null : (this.rounds[this.currentRound - 1].winner === 'x' ? this.playerX : this.playerO),
            userTurn: this.rounds[this.currentRound - 1].turn === "x" ? this.playerX : this.playerO,
        },
        maxRounds: this.maxRounds,
        finished: this.finished,
        createdAt: this.createdAt,
        updatedAt: this.updatedAt,

    }
}

const GameModel = mongoose.model('Game', gameSchema);

module.exports = GameModel;
