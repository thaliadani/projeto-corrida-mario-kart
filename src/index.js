const player1 = {
    NOME:"Mario",
    VELOCIDADE: 4,
    MANOBRABILIDADE: 3,
    PODER:3,
    PONTOS: 0,
};

const player2 = {
    NOME:"Luigi",
    VELOCIDADE: 3,
    MANOBRABILIDADE: 4,
    PODER: 4,
    PONTOS: 0,
};

const player3 = {
    NOME:"Peach",
    VELOCIDADE: 3,
    MANOBRABILIDADE: 4,
    PODER: 2,
    PONTOS: 0,
};

const player4 = {
    NOME:"Bowser",
    VELOCIDADE: 5,
    MANOBRABILIDADE: 2,
    PODER: 5,
    PONTOS: 0,
};

const player5 = {
    NOME:"Yoshi",
    VELOCIDADE: 2,
    MANOBRABILIDADE: 4,
    PODER: 3,
    PONTOS: 0,
};

const player6 = {
    NOME:"DK",
    VELOCIDADE: 2,
    MANOBRABILIDADE: 2,
    PODER: 5,
    PONTOS: 0,
};

function rollDice() {
    return Math.floor(Math.random() * 6) + 1;
}