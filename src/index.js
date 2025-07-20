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
        NOME: track.name
    };
}

async function randomizeTypeBlock() {
    const randomIndex = Math.floor(Math.random() * blockTypes.length);
    return blockTypes[randomIndex];
}

async function playRound(player1, player2, typeblock) {
    const rollplayer1 = await rollDice();
    const rollplayer2 = await rollDice();

    console.log(`🎲 ${player1.NOME} tirou ${rollplayer1} no dado.`);
    console.log(`🎲 ${player2.NOME} tirou ${rollplayer2} no dado.`);

    let resultplayer1;
    let resultplayer2;

    if (typeblock === "Reta") {
        // Para "Reta", considera a Velocidade
        resultplayer1 = rollplayer1 + player1.VELOCIDADE;
        resultplayer2 = rollplayer2 + player2.VELOCIDADE;
        console.log(`Resultado ${player1.NOME}: ${resultplayer1} (Dado: ${rollplayer1} + Velocidade: ${player1.VELOCIDADE})`);
        console.log(`Resultado ${player2.NOME}: ${resultplayer2} (Dado: ${rollplayer2} + Velocidade: ${player2.VELOCIDADE})`);
        if (resultplayer1 > resultplayer2) {
            player1.PONTOS += 1; // Adiciona ponto se vencer
        } else if (resultplayer2 > resultplayer1) {
            player2.PONTOS += 1; // Adiciona ponto se vencer
        }
    } else if (typeblock === "Curva") {
        // Para "Curva", considera a Manobrabilidade
        resultplayer1 = rollplayer1 + player1.MANOBRABILIDADE;
        resultplayer2 = rollplayer2 + player2.MANOBRABILIDADE;
        console.log(`Resultado ${player1.NOME}: ${resultplayer1} (Dado: ${rollplayer1} + Manobrabilidade: ${player1.MANOBRABILIDADE})`);
        console.log(`Resultado ${player2.NOME}: ${resultplayer2} (Dado: ${rollplayer2} + Manobrabilidade: ${player2.MANOBRABILIDADE})`);
        if (resultplayer1 > resultplayer2) {
            player1.PONTOS += 1; // Adiciona ponto se vencer
        } else if (resultplayer2 > resultplayer1) {
            player2.PONTOS += 1; // Adiciona ponto se vencer
        }
    } else if (typeblock === "Confronto") {
        // Para "Confronto", considera o Poder
        resultplayer1 = rollplayer1 + player1.PODER;
        resultplayer2 = rollplayer2 + player2.PODER;
        console.log(`Resultado ${player1.NOME}: ${resultplayer1} (Dado: ${rollplayer1} + Poder: ${player1.PODER})`);
        console.log(`Resultado ${player2.NOME}: ${resultplayer2} (Dado: ${rollplayer2} + Poder: ${player2.PODER})`);
        if (resultplayer1 < resultplayer2) {
            // Garante que a pontuação não seja negativa ao subtrair
            player1.PONTOS = Math.max(0, player1.PONTOS - 1);
        } else if (resultplayer2 < resultplayer1) {
            // Garante que a pontuação não seja negativa ao subtrair
            player2.PONTOS = Math.max(0, player2.PONTOS - 1);
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
        console.log(`---`);
        console.log(`🏁 Rodada ${i + 1}: `);

        let typeblock = await randomizeTypeBlock();
        console.log(`Tipo de bloco: ${typeblock}`);

        [player1, player2] = await playRound(player1, player2, typeblock);

        console.log(" ");
        console.log(`🎲 Jogador 1 (${player1.NOME}) pontos: ${player1.PONTOS}`);
        console.log(`🎲 Jogador 2 (${player2.NOME}) pontos: ${player2.PONTOS}`);
        console.log(" ");

        if (player1.PONTOS > player2.PONTOS) {
            console.log(`🏆 Vencedor da rodada: Jogador 1 (${player1.NOME})!`);
        } else if (player2.PONTOS > player1.PONTOS) {
            console.log(`🏆 Vencedor da rodada: Jogador 2 (${player2.NOME})!`);
        } else {
            console.log("🤝 Empate na rodada!");
        }

        console.log(" ");
    }
    console.log("---");
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