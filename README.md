# Desafio de Projeto: Mario Kart.JS

<img src="./docs/header.gif" alt="Mario Kart" width="200">

## Objetivo

Mario Kart é uma série de jogos de corrida desenvolvida e publicada pela Nintendo. Nosso desafio será criar a lógica de um videogame para simular corridas de Mario Kart, levando em consideração as regras e mecânicas abaixo.

## 👥 Players

| Personagem | Atributos | Personagem | Atributos | Personagem | Atributos |
| :---: | :---: | :---: | :---: | :---: | :---: |
| **Mario** <br> <img src="./docs/mario.gif" alt="Mario" width="60"> | Velocidade: 4 <br> Manobrabilidade: 3 <br> Poder: 3 | **Peach** <br> <img src="./docs/peach.gif" alt="Peach" width="60"> | Velocidade: 3 <br> Manobrabilidade: 4 <br> Poder: 2 | **Yoshi** <br> <img src="./docs/yoshi.gif" alt="Yoshi" width="60"> | Velocidade: 2 <br> Manobrabilidade: 4 <br> Poder: 3 |
| **Bowser** <br> <img src="./docs/bowser.gif" alt="Bowser" width="60"> | Velocidade: 5 <br> Manobrabilidade: 2 <br> Poder: 5 | **Luigi** <br> <img src="./docs/luigi.gif" alt="Luigi" width="60"> | Velocidade: 3 <br> Manobrabilidade: 4 <br> Poder: 4 | **Donkey Kong** <br> <img src="./docs/dk.gif" alt="Donkey Kong" width="60"> | Velocidade: 2 <br> Manobrabilidade: 2 <br> Poder: 5 |

### 🕹️ Regras & Mecânicas

**Jogadores:**

- O computador deve receber dois personagens para disputar a corrida (representados por um objeto cada).

**Pistas:**

- Os personagens irão correr em uma pista aleatória de 5 rodadas.
- A cada rodada, será sorteado um tipo de bloco que pode ser uma **Reta**, **Curva** ou **Confronto**.
- **RETA:** O jogador joga um dado de 6 lados e soma o resultado ao seu atributo de **VELOCIDADE**. Quem vencer a disputa ganha um ponto.
- **CURVA:** O jogador joga um dado de 6 lados e soma o resultado ao seu atributo de **MANOBRABILIDADE**. Quem vencer a disputa ganha um ponto.
- **CONFRONTO:** O jogador joga um dado de 6 lados e soma o resultado ao seu atributo de **PODER**. Quem perder a disputa perde um ponto.
- Nenhum jogador pode ter pontuação negativa (o placar mínimo é 0).

**Condição de vitória:**

- Ao final das 5 rodadas, vence quem acumulou mais pontos.
