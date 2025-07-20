const players = [
    { name: "Mario", velocity: 4, agility: 3, power: 3, points: 0 },
    { name: "Luigi", velocity: 3, agility: 4, power: 4, points: 0 },
    { name: "Peach", velocity: 3, agility: 4, power: 2, points: 0 },
    { name: "Bowser", velocity: 5, agility: 2, power: 5, points: 0 },
    { name: "Yoshi", velocity: 2, agility: 4, power: 3, points: 0 },
    { name: "DK", velocity: 2, agility: 2, power: 5, points: 0 },
];

const tracks = [
    { name: "Mushroom Kingdom Raceway" },
    { name: "Bowser's Castle Lava" },
    { name: "Rainbow Road" },
];

const blockTypes = ["Reta", "Curva", "Confronto"];

const rounds = 5;

async function rollDice() {
    return Math.floor(Math.random() * 6) + 1;
}

async function randomizePlayers() {
    const randomIndex = Math.floor(Math.random() * players.length);
    const player = players[randomIndex];
    return {
        NOME: player.name,
        VELOCIDADE: player.velocity,
        MANOBRABILIDADE: player.agility,
        PODER: player.power,
        PONTOS: player.points
    };
}

async function randomizeTrack() {
    const randomIndex = Math.floor(Math.random() * tracks.length);
    const track = tracks[randomIndex];
    return {
        NOME: track.name,
        DISTANCIA: track.distancy,
        PONTOS_POR_VITORIA: track.pointsForVictory,
        PONTOS_POR_SEGUNDO_LUGAR: track.pointsForSecondPlace,
        PONTOS_POR_TERCEIRO_LUGAR: track.pointsForThirdPlace
    };
}

async function randomizeTypeBlock() {
    const randomIndex = Math.floor(Math.random() * blockTypes.length);
    return blockTypes[randomIndex];
}

function playRound(player1, player2, typeblock) {
    let resultplayer1;
    let resultplayer2;
    let rolldice = rollDice();

    if (typeblock === "Reta") {
        resultplayer1 = rolldice + player1.VELOCIDADE;
        resultplayer2 = rolldice + player2.VELOCIDADE;
        if (resultplayer1 > resultplayer2) {
            player1.PONTOS+=1;
        } else if (resultplayer2 > resultplayer1) {
            player2.PONTOS+=1;
        }
    } else if (typeblock === "Curva") {
        resultplayer1 = rolldice + player1.MANOBRABILIDADE;
        resultplayer2 = rolldice + player2.MANOBRABILIDADE;
        if (resultplayer1 > resultplayer2) {
            player1.PONTOS+=1; 
        } else if (resultplayer2 > resultplayer1) {
            player2.PONTOS+=1;
        }
    } else if (typeblock === "Confronto") {
        resultplayer1 = rolldice + player1.PODER;
        resultplayer2 = rolldice + player2.PODER;
        if (resultplayer1 < resultplayer2) {
            player1.PONTOS-=1;
        } else if (resultplayer2 < resultplayer1) {
            player2.PONTOS-=1;
        }
    }

    return [player1, player2];
}

(async function main() {
    let player1 = await randomizePlayers();
    let player2 = await randomizePlayers();
    while (player1.NOME === player2.NOME) {
        player2 = await randomizePlayers();
    }

    let track = await randomizeTrack();

    console.log("🚨 Iniciando a corrida entre os jogadores: ");

    console.log(`🏎️  Jogador 1: ${player1.NOME} (Velocidade: ${player1.VELOCIDADE}, Manobrabilidade: ${player1.MANOBRABILIDADE}, Poder: ${player1.PODER})`)

    console.log(`🏎️  Jogador 2: ${player2.NOME} (Velocidade: ${player2.VELOCIDADE}, Manobrabilidade: ${player2.MANOBRABILIDADE}, Poder: ${player2.PODER})`)
    console.log(" ")
    console.log("🏁 Na seguinte pista: ");
    console.log(`- Pista ${track.NOME}`);
    console.log(" ");

    for (let i = 0; i < rounds; i++) {
        console.log(`🏁 Rodada ${i + 1}: `);

        let typeblock = await randomizeTypeBlock();
        console.log(`Tipo de bloco: ${typeblock}`);

        let rollplayer1 = await rollDice();
        let rollplayer2 = await rollDice();

        [player1, player2] = playRound(player1, player2, typeblock);

        console.log(" ");

        console.log(`🎲 Jogador 1 (${player1.NOME}) rolou: ${rollplayer1}`);
        console.log(`🎲 Jogador 2 (${player2.NOME}) rolou: ${rollplayer2}`);
        console.log(" ");

        if (player1.PONTOS > player2.PONTOS) {
            console.log(`🏆 Vencedor: Jogador 1 (${player1.NOME}) com ${player1.PONTOS} pontos!`);
        } else if (player2.PONTOS > player1.PONTOS) {
            console.log(`🏆 Vencedor: Jogador 2 (${player2.NOME}) com ${player2.PONTOS} pontos!`);
        } else {
            console.log("🤝 Empate! Ambos os jogadores terminaram com a mesma pontuação.");
        }

        console.log(" ");
    }

    console.log("🏁 Corrida finalizada!");
    if (player1.PONTOS > player2.PONTOS) {
        console.log(`🏆 Vencedor: Jogador 1 (${player1.NOME}) com ${player1.PONTOS} pontos!`);
    } else if (player2.PONTOS > player1.PONTOS) {
        console.log(`🏆 Vencedor: Jogador 2 (${player2.NOME}) com ${player2.PONTOS} pontos!`);
    } else {
        console.log("🤝 Empate! Ambos os jogadores terminaram com a mesma pontuação.");
    }
    console.log(`- Pontos finais: Jogador 1 (${player1.NOME}): ${player1.PONTOS}, Jogador 2 (${player2.NOME}): ${player2.PONTOS}`);

})();