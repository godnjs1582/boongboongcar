const MAX_RACING_COUNT=5
const CAR_GO_PROBABILITY=4
export function createPlayerList (carNames){
    return carNames.split(",")
}

export function checkCarNameValidation(playerList){
    let result = true;
    for(let i=0;i<playerList.length;i++){
        if(playerList[i].length>5 || playerList[i].length===0){
            result = false
        }
    }

    let set = new Set(playerList)

    if(set.size!==playerList.length){
        result=false
    }
    return result;
}



function createPlayerAndResultMap(playerList){
    let playerAndResultMap = new Map();
    playerList.map((player)=>playerAndResultMap.set(player,0))
    return playerAndResultMap
}

export function decideGoOrStopRandomly(randomNumber){
    if(isNaN(randomNumber))return
    if(randomNumber<0||randomNumber>=10) return
    return randomNumber>=CAR_GO_PROBABILITY
}

export function createRandomNumberBetweenZeroToNine(){
    return Math.floor(Math.random()*10) 
}

export function playGamesForCertainTimesForEveryPlayers(playerList){
    let playerAndResultMap = createPlayerAndResultMap(playerList)
   
    for(let i=0;i<MAX_RACING_COUNT;i++){
        playGameForOneTimeForEveryPlayers(playerList,playerAndResultMap)
        gameResultLogger("divider")
    }
    return playerAndResultMap;
}


export function playGameForOneTimeForEveryPlayers(playerList,playerAndResultMap){
    for(let j=0;j<playerList.length;j++){
        let prev = playerAndResultMap.get(playerList[j])
        if(decideGoOrStopRandomly(createRandomNumberBetweenZeroToNine())){
            playerAndResultMap.set(playerList[j],prev+1)
        }
        const loggingInfo ={"player":playerList[j], "playResult":playerAndResultMap.get(playerList[j])}
        gameResultLogger("play",loggingInfo)
    }
}

export function gameResultLogger(type,loggingInfo){
    if(type==="play"){
        const {player, playResult}=loggingInfo
        console.log(player+":"+"_".repeat(playResult))
    }
    if(type==="divider"){
        console.log(`\n`)
    }
}

function decideWinner(playerAndResultMap){
    let maxNumber =findMaxNumberOfTheRace(playerAndResultMap)
    let winnersArray=[];
    for(let item of Array.from(playerAndResultMap)){
        const [player, number]=item
        if(number===maxNumber){
            winnersArray.push(player)
        }
    }
    return winnersArray
}

export function joinMultipleWinnersWithComma(winnersArray){
    return winnersArray.join(",")
}

function findMaxNumberOfTheRace(playerAndResultMap){
    let maxNumber =0
    for(let item of Array.from(playerAndResultMap)){
        const [player, number]=item
        if(number>=maxNumber){
            maxNumber=number
        }
    }
    return maxNumber
}

function printWinnerOfTheRace(winnersArray){
    const winners=joinMultipleWinnersWithComma(winnersArray)
    console.log(`${winners}가 최종 우승했습니다`)
}




export function playRacingGame(inputString){
    const playerList=createPlayerList(inputString)
    if(checkCarNameValidation(playerList)){
        const playerAndResultMap=playGamesForCertainTimesForEveryPlayers(playerList)
        const gameResult=decideWinner(playerAndResultMap)
        printWinnerOfTheRace(gameResult)
    }else{
        return "program quit"
    }
}

playRacingGame("hae,sang,won")






