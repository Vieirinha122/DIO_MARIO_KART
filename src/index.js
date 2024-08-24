class Player {
    constructor(nome, Velocidade, Manobrabilidade, Poder, Pontos) {
        this.nome = nome; 
        this.Velocidade = Velocidade; 
        this.Manobrabilidade = Manobrabilidade; 
        this.Poder = Poder; 
        this.Pontos = Pontos; 
    }
}

const player1 = new Player('Mario', 4, 3, 3,0); 
const player2 = new Player('Luigi', 3, 4, 4, 0); 

async function rollDice() {
    return Math.floor(Math.random() * 6) + 1;  
}; 

async function getRandomBlock() {
    let random = Math.random()
    let resultado; 

    switch (true) {
        case random < 0.33:
            resultado = "RETA"
            break;
    
        case random < 0.66: 
            resultado = "CURVA"
            break; 

        default:
            resultado = "CONFRONTO"
            break;
    }
    return resultado; 
}

async function logRollResult(characterName, block, diceResult, attribute) {
    console.log(`${characterName} 🎲 rolou o dado de ${block} ${diceResult} + ${attribute} = ${diceResult + attribute}`); 
    
}

async function playRaceEngine(character1,character2) {
    for(let round = 1; round <= 5; round++){
        console.log(`🏁 Rodada ${round}`); 

        // Sortear bloco
        let block = await getRandomBlock(); 
        console.log(`Bloco: ${block}`); 

        // Rolar os dados
    let diceResult1 = await rollDice(); 
    let diceResult2 = await rollDice(); 

    // teste de habilidade
    let TotalTesteSkill1 = 0;
    let TotalTesteSkill2 = 0;

    if(block === "RETA"){
        TotalTesteSkill1 = diceResult1 + character1.Velocidade;
        TotalTesteSkill2 = diceResult2 + character2.Velocidade;
        
        await logRollResult(character1.nome, "velocidade", diceResult1, character1.Velocidade);
        await logRollResult(character2.nome, "velocidade", diceResult2, character2.Velocidade);
    }
    if(block === "CURVA"){
        TotalTesteSkill1 = diceResult1 + character1.Manobrabilidade;
        TotalTesteSkill2 = diceResult2 + character2.Manobrabilidade;

        await logRollResult(character1.nome, "manobrabilidade", diceResult1, character1.Manobrabilidade);
        await logRollResult(character2.nome, "manobrabilidade", diceResult2, character2.Manobrabilidade);
    }
    if(block === "CONFRONTO"){
        let powerResult1 = diceResult1 + character1.Poder;
        let powerResult2 = diceResult2 + character2.Poder;

        console.log(`${character1.nome} confrontou com ${character2.nome}!`); 
        await logRollResult(character1.nome, "poder", diceResult1, character1.Poder);
        await logRollResult(character2.nome, "poder", diceResult2, character2.Poder);

        if(powerResult1 > powerResult2 && character2.Pontos > 0){
            console.log(`${character1.nome} venceu o confronto! ${character2.nome} perdeu 1 ponto`);
            character2.Pontos --;
        }

        if(powerResult2 > powerResult1 && character1.Pontos > 0){
            console.log(`${character2.nome} venceu o confronto! ${character1.nome} perdeu 1 ponto`);
            character1.Pontos--; 
        }
    
        console.log(powerResult2 === powerResult1 ? "Confronto empatado! Nenhum ponto foi perdido" : "");
    }   

    if(TotalTesteSkill1 > TotalTesteSkill2) {
        console.log(`${character1.nome} marcou um ponto!`); 
        character1.Pontos++; 
    }else if (TotalTesteSkill2 > TotalTesteSkill1) {
        console.log(`${character2.nome} marcou um ponto!`); 
        character2.Pontos++; 
    }

    console.log("_________________\n")
    } 
}

async function declareWinner(character1, character2) {
    console.log("Resultado final:")
    console.log(`${character1.nome}: ${character1.Pontos} ponto(s)`);
    console.log(`${character2.nome}: ${character2.Pontos} ponto(s)`);

    if (character1.Pontos > character2.Pontos){
        console.log(`\n${character1.nome} venceu a corrida! Parabéns!`);
    }else if(character2.Pontos > character1.Pontos){
        console.log(`\n${character2.nome} venceu a corrida! Parabéns!`);
    }else{
        console.log("A corrida terminou empatada"); 
    }
    
}

(async function main() {
    console.log(`🏁🚨 Corrida entre ${player1.nome} e ${player2.nome} começando...\n`);

    await playRaceEngine(player1, player2); 
    await declareWinner(player1, player2); 
})(); 