const player1 = {
    NOME: "Mario",
    VELOCIDADE: 4,
    MANOBRABILIDADE: 3,
    PODER: 3,
    PONTOS: 0,
};

const player2 = {
    NOME: "Luigi",
    VELOCIDADE: 3,
    MANOBRABILIDADE: 4,
    PODER: 4,
    PONTOS: 0,
};

const player3 = {
    NOME: "Peach",
    VELOCIDADE: 3,
    MANOBRABILIDADE: 4,
    PODER: 2,
    PONTOS: 0,
};

const player4 = {
    NOME: "Bowser",
    VELOCIDADE: 5,
    MANOBRABILIDADE: 2,
    PODER: 5,
    PONTOS: 0,
};

const player5 = {
    NOME: "Yoshi",
    VELOCIDADE: 2,
    MANOBRABILIDADE: 4,
    PODER: 3,
    PONTOS: 0,
};

const player6 = {
    NOME: "DK",
    VELOCIDADE: 2,
    MANOBRABILIDADE: 2,
    PODER: 5,
    PONTOS: 0,
};

const players = [player1, player2, player3, player4, player5, player6];

const track1 = {
    DISTANCIA: 100,
    PONTOS_POR_VITORIA: 10,
    PONTOS_POR_SEGUNDO_LUGAR: 5,
    PONTOS_POR_TERCEIRO_LUGAR: 3,
};

const track2 = {
    DISTANCIA: 150,
    PONTOS_POR_VITORIA: 15,
    PONTOS_POR_SEGUNDO_LUGAR: 10,
    PONTOS_POR_TERCEIRO_LUGAR: 5,
};

const track3 = {
    DISTANCIA: 200,
    PONTOS_POR_VITORIA: 20,
    PONTOS_POR_SEGUNDO_LUGAR: 15,
    PONTOS_POR_TERCEIRO_LUGAR: 10,
};

const tracks = [track1, track2, track3];

const typesblocks = {
    RETA: "Reta",
    CURVA: "Curva",
    CONFRONTO: "Confronto",
}

const rounds = 5;

async function rollDice() {
    return Math.floor(Math.random() * 6) + 1;
}

async function randomizePlayers() {
    return players[Math.floor(Math.random() * players.length)];
}

async function randomizeTrack() {
    return tracks[Math.floor(Math.random() * tracks.length)];
}

async function randomizeTypeBlock() {
    const types = Object.values(typesblocks);
    return types[Math.floor(Math.random() * types.length)];
}

(async function main() {
    let player1 = await randomizePlayers();
    let player2 = await randomizePlayers();
    let track = await randomizeTrack();

    while (player1.NOME === player2.NOME) {
        player2 = await randomizePlayers();
    }

    console.log("🚨 Iniciando a corrida entre os jogadores: ");

    console.log(` Jogador 1: ${player1.NOME} (Velocidade: ${player1.VELOCIDADE}, Manobrabilidade: ${player1.MANOBRABILIDADE}, Poder: ${player1.PODER})`)

    console.log(` Jogador 2: ${player2.NOME} (Velocidade: ${player2.VELOCIDADE}, Manobrabilidade: ${player2.MANOBRABILIDADE}, Poder: ${player2.PODER})`)
    console.log(" ")
    console.log("🏁 Na seguinte pista: ");
    console.log(`Pista: ${track.DISTANCIA} metros (Pontos por vitória: ${track.PONTOS_POR_VITORIA}, Segundo lugar: ${track.PONTOS_POR_SEGUNDO_LUGAR}, Terceiro lugar: ${track.PONTOS_POR_TERCEIRO_LUGAR})`);

    for (let i = 0; i < rounds; i++) {
        let rollplayer1;
        let rollplayer2;
        let rolldice = await rollDice();
        let typeblock = await randomizeTypeBlock();

        console.log(`🏁 Rodada ${i + 1}: `);

        if (typeblock === typesblocks.RETA) {
            console.log("🏁 A corrida é em uma pista de RETA.");
            rollplayer1 = rolldice += player1.VELOCIDADE;
            rollplayer2 = rolldice += player2.VELOCIDADE;
        } else if (typeblock === typesblocks.CURVA) {
            console.log("🏁 A corrida é em uma pista de CURVA.");
            rollplayer1 = rolldice += player1.MANOBRABILIDADE;
            rollplayer2 = rolldice += player2.MANOBRABILIDADE;
        } else if (typeblock === typesblocks.CONFRONTO) {
            console.log("🏁 A corrida é em uma pista de CONFRONTO.");
            rollplayer1 = rolldice += player1.PODER;
            rollplayer2 = rolldice += player2.PODER;
        }

        console.log(`🎲 Jogador 1 (${player1.NOME}) rolou: ${rollplayer1}`);
        console.log(`🎲 Jogador 2 (${player2.NOME}) rolou: ${rollplayer2}`);

        if (rollplayer1 > rollplayer2) {
            console.log(`🏁 Jogador 1 (${player1.NOME}) venceu a rodada!`);
            player1.PONTOS += track.PONTOS_POR_VITORIA;
            player2.PONTOS += track.PONTOS_POR_SEGUNDO_LUGAR;
        } else if (rollplayer2 > rollplayer1) {
            console.log(`🏁 Jogador 2 (${player2.NOME}) venceu a rodada!`);
            player2.PONTOS += track.PONTOS_POR_VITORIA;
            player1.PONTOS += track.PONTOS_POR_SEGUNDO_LUGAR;
        } else {
            console.log("🏁 A rodada terminou empatada!");
        }
        console.log(`Pontos atuais: Jogador 1 (${player1.NOME}): ${player1.PONTOS}, Jogador 2 (${player2.NOME}): ${player2.PONTOS}`);
        console.log(" ");
    }

    console.log("🏁 Corrida finalizada!");
    if (player1.PONTOS > player2.PONTOS) {
        console.log(`🏆 Jogador 1 (${player1.NOME}) venceu a corrida!`);
        player1.PONTOS += track.PONTOS_POR_VITORIA;
        player2.PONTOS += track.PONTOS_POR_SEGUNDO_LUGAR;
    } else if (player2.PONTOS > player1.PONTOS) {
        console.log(`🏆 Jogador 2 (${player2.NOME}) venceu a corrida!`);
        player2.PONTOS += track.PONTOS_POR_VITORIA;
        player1.PONTOS += track.PONTOS_POR_SEGUNDO_LUGAR;
    } else {
        console.log("🏁 A corrida terminou empatada!");
    }

    console.log(`Pontos finais: Jogador 1 (${player1.NOME}): ${player1.PONTOS}, Jogador 2 (${player2.NOME}): ${player2.PONTOS}`);

})();