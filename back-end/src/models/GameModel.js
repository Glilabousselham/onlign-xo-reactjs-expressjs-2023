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
    // currentRound: {
    //     type: Number,
    //     default: 1,
    // },
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


    const scoreX = this.rounds.reduce((totalScore, round) => getWinner(round.positions) === 'x' ? totalScore + 1 : totalScore, 0) ?? 0
    const scoreO = this.rounds.reduce((totalScore, round) => getWinner(round.positions) === 'o' ? totalScore + 1 : totalScore, 0) ?? 0

    let currentRound = this.rounds.findIndex(r => getWinner(r.positions) === null) + 1

    if (currentRound === 0) {
        currentRound = this.maxRounds
    }

    return {
        _id: this._id,
        playerX: {
            _id: this.playerX._id,
            username: this.playerX.username,
            image: this.playerX.image,
            score: scoreX,
            type: "x",
            ready: this.ready.x,
        },
        playerO: {
            _id: this.playerO._id,
            username: this.playerO.username,
            image: this.playerO.image,
            score: scoreO,
            type: "o",
            ready: this.ready.o,
        },
        ready: this.ready,
        playerXLeft: this.playerXLeft,
        playerOLeft: this.playerOLeft,
        rounds: this.rounds.map(round => {
            return {
                winner: getWinner(round.positions),
                winnerUser: (getWinner(round.positions) === null || getWinner(round.positions) === "draw") ? null : (getWinner(round.positions) === 'x' ? this.playerX : this.playerO),
                positions: round.positions,
                turn: round.turn,
            }
        }),
        currentRound: currentRound,
        currentRoundInfo: {
            positions: this.rounds[currentRound - 1].positions,
            winner: getWinner(this.rounds[currentRound - 1].positions),
            winnerUser: (getWinner(this.rounds[currentRound - 1].positions) === null || getWinner(this.rounds[currentRound - 1].positions) === "draw") ? null : (getWinner(this.rounds[currentRound - 1].positions) === 'x' ? this.playerX : this.playerO),
            turn: this.rounds[currentRound - 1].turn,
            userTurn: this.rounds[currentRound - 1].turn === "x" ? this.playerX : this.playerO,
        },
        maxRounds: this.maxRounds,
        finished: this.finished,
        createdAt: this.createdAt,
        updatedAt: this.updatedAt,

    }
}

function getWinner(positions) {

    const cases = [
        [1, 2, 3],
        [4, 5, 6],
        [7, 8, 9],
        // 
        [1, 4, 7],
        [2, 5, 8],
        [3, 6, 9],
        // 
        [1, 5, 9],
        [3, 5, 7],
    ]

    // check user
    for (const cas of cases) {
        if (positions[cas[0]] === positions[cas[1]] && positions[cas[0]] === positions[cas[2]] && positions[cas[0]] !== null) {
            return positions[cas[0]];
        }
    }

    // check for draw 
    for (const i of [1, 2, 3, 4, 5, 6, 7, 8, 9]) {
        if (positions[i] === null) {
            return null;
        }
    }

    return "draw";
}
const GameModel = mongoose.model('Game', gameSchema);

module.exports = GameModel;
