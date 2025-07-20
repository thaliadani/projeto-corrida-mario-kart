const players = [
    { name: "Mario", speed: 4, agility: 3, power: 3, points: 0 },
    { name: "Luigi", speed: 3, agility: 4, power: 4, points: 0 },
    { name: "Peach", speed: 3, agility: 4, power: 2, points: 0 },
    { name: "Bowser", speed: 5, agility: 2, power: 5, points: 0 },
    { name: "Yoshi", speed: 2, agility: 4, power: 3, points: 0 },
    { name: "DK", speed: 2, agility: 2, power: 5, points: 0 },
];

const tracks = [
    { name: "Mushroom Kingdom Raceway" },
    { name: "Bowsers Castle Lava" },
    { name: "Rainbow Road" },
];

const rounds = 5;

const blockTypes = ["Straight", "Curve", "Battle"];

async function rollDice() {
    return Math.floor(Math.random() * 6) + 1;
}

async function randomizePlayers() {
    const randomIndex = Math.floor(Math.random() * players.length);
    const player = players[randomIndex];
    return {
        NAME: player.name,
        SPEED: player.speed,
        AGILITY: player.agility,
        POWER: player.power,
        POINTS: player.points
    };
}

async function randomizeTrack() {
    const randomIndex = Math.floor(Math.random() * tracks.length);
    const track = tracks[randomIndex];
    return {
        NAME: track.name
    };
}

async function randomizeBlockType() {
    const randomIndex = Math.floor(Math.random() * blockTypes.length);
    return blockTypes[randomIndex];
}

async function playRound(player1, player2, blockType) {
    const rollPlayer1 = await rollDice();
    const rollPlayer2 = await rollDice();

    console.log(`🎲 ${player1.NAME} rolled ${rollPlayer1} on the dice.`);
    console.log(`🎲 ${player2.NAME} rolled ${rollPlayer2} on the dice.`);

    let resultPlayer1;
    let resultPlayer2;

    if (blockType === "Straight") {
        resultPlayer1 = rollPlayer1 + player1.SPEED;
        resultPlayer2 = rollPlayer2 + player2.SPEED;
        console.log(`Result ${player1.NAME}: ${resultPlayer1} (Dice: ${rollPlayer1} + Speed: ${player1.SPEED})`);
        console.log(`Result ${player2.NAME}: ${resultPlayer2} (Dice: ${rollPlayer2} + Speed: ${player2.SPEED})`);
        if (resultPlayer1 > resultPlayer2) {
            player1.POINTS += 1; 
        } else if (resultPlayer2 > resultPlayer1) {
            player2.POINTS += 1;
        }
    } else if (blockType === "Curve") {
        // For "Curve", consider Agility
        resultPlayer1 = rollPlayer1 + player1.AGILITY;
        resultPlayer2 = rollPlayer2 + player2.AGILITY;
        console.log(`Result ${player1.NAME}: ${resultPlayer1} (Dice: ${rollPlayer1} + Agility: ${player1.AGILITY})`);
        console.log(`Result ${player2.NAME}: ${resultPlayer2} (Dice: ${rollPlayer2} + Agility: ${player2.AGILITY})`);
        if (resultPlayer1 > resultPlayer2) {
            player1.POINTS += 1;
        } else if (resultPlayer2 > resultPlayer1) {
            player2.POINTS += 1;
        }
    } else if (blockType === "Battle") {
        // For "Battle", consider Power
        resultPlayer1 = rollPlayer1 + player1.POWER;
        resultPlayer2 = rollPlayer2 + player2.POWER;
        console.log(`Result ${player1.NAME}: ${resultPlayer1} (Dice: ${rollPlayer1} + Power: ${player1.POWER})`);
        console.log(`Result ${player2.NAME}: ${resultPlayer2} (Dice: ${rollPlayer2} + Power: ${player2.POWER})`);
        if (resultPlayer1 < resultPlayer2) {
            player1.POINTS = Math.max(0, player1.POINTS - 1);
        } else if (resultPlayer2 < resultPlayer1) {
            player2.POINTS = Math.max(0, player2.POINTS - 1);
        }
    }
    return [player1, player2];
}

(async function main() {
    let player1 = await randomizePlayers();
    let player2 = await randomizePlayers();
    while (player1.NAME === player2.NAME) {
        player2 = await randomizePlayers();
    }

    let track = await randomizeTrack();

    console.log("🚨 Starting the race between the players: ");

    console.log(`🏎️  Player 1: ${player1.NAME} (Speed: ${player1.SPEED}, Agility: ${player1.AGILITY}, Power: ${player1.POWER})`)

    console.log(`🏎️  Player 2: ${player2.NAME} (Speed: ${player2.SPEED}, Agility: ${player2.AGILITY}, Power: ${player2.POWER})`)
    console.log(" ")
    console.log("🏁 On the following track: ");
    console.log(`- Track ${track.NAME}`);
    console.log(" ");

    for (let i = 0; i < rounds; i++) {
        console.log(`---`);
        console.log(`🏁 Round ${i + 1}: `);

        let blockType = await randomizeBlockType();
        console.log(`Block type: ${blockType}`);

        [player1, player2] = await playRound(player1, player2, blockType);

        console.log(" ");
        console.log(`🎲 Player 1 (${player1.NAME}) points: ${player1.POINTS}`);
        console.log(`🎲 Player 2 (${player2.NAME}) points: ${player2.POINTS}`);
        console.log(" ");

        if (player1.POINTS > player2.POINTS) {
            console.log(`🏆 Winner of the round: Player 1 (${player1.NAME})!`);
        } else if (player2.POINTS > player1.POINTS) {
            console.log(`🏆 Winner of the round: Player 2 (${player2.NAME})!`);
        } else {
            console.log("🤝 Tie in the round!");
        }

        console.log(" ");
    }
    console.log("---");
    console.log("🏁 Race finished!");
    if (player1.POINTS > player2.POINTS) {
        console.log(`🏆 Winner: Player 1 (${player1.NAME}) with ${player1.POINTS} points!`);
    } else if (player2.POINTS > player1.POINTS) {
        console.log(`🏆 Winner: Player 2 (${player2.NAME}) with ${player2.POINTS} points!`);
    } else {
        console.log("🤝 Tie! Both players finished with the same score.");
    }
    console.log(`- Final points: Player 1 (${player1.NAME}): ${player1.POINTS}, Player 2 (${player2.NAME}): ${player2.POINTS}`);

})();