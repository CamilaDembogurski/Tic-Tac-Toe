const boardRegion = document.querySelectorAll('#gameBoard span')
let virtualBoard = []
let turnPlayer = ''

function updateTitle(){
    const playerInput = document.getElementById(turnPlayer)
    document.getElementById('turnPlayer').innerText = playerInput.value
}

function disabledRegion(element){
    element.classList.remove('region')
    element.removeEventListener('click', handleBoardClick)
}

function getWinRegions(){
    const winRegions = []
    if (virtualBoard[0][0] && virtualBoard[0][0] === virtualBoard[0][1] && virtualBoard[0][0] === virtualBoard[0][2])
        winRegions.push("0.0", "0.1", "0.2")
    if (virtualBoard[1][0] && virtualBoard[1][0] === virtualBoard[1][1] && virtualBoard[1][0] === virtualBoard[1][2])
        winRegions.push("1.0", "1.1", "1.2")
    if (virtualBoard[2][0] && virtualBoard[2][0] === virtualBoard[2][1] && virtualBoard[2][0] === virtualBoard[2][2])
        winRegions.push("2.0", "2.1", "2.2")
    if (virtualBoard[0][0] && virtualBoard[0][0] === virtualBoard[1][0] && virtualBoard[0][0] === virtualBoard[2][0])
        winRegions.push("0.0", "1.0", "2.0")
    if (virtualBoard[0][1] && virtualBoard[0][1] === virtualBoard[1][1] && virtualBoard[0][1] === virtualBoard[2][1])
        winRegions.push("0.1", "1.1", "2.1")
    if (virtualBoard[0][2] && virtualBoard[0][2] === virtualBoard[1][2] && virtualBoard[0][2] === virtualBoard[2][2])
        winRegions.push("0.2", "1.2", "2.2")
    if (virtualBoard[0][0] && virtualBoard[0][0] === virtualBoard[1][1] && virtualBoard[0][0] === virtualBoard[2][2])
        winRegions.push("0.0", "1.1", "2.2")
    if (virtualBoard[0][2] && virtualBoard[0][2] === virtualBoard[1][1] && virtualBoard[0][2] === virtualBoard[2][0])
        winRegions.push("0.2", "1.1", "2.0")
    return winRegions
}

function handleWin(regions){
    regions.forEach(function (region){
        document.querySelector('[data-region="' + region + '"]').classList.add('win')
    })
    const playerName = document.getElementById(turnPlayer).value
    document.querySelector('h2').innerHTML = '<span>' + playerName + ' venceu!</span>'
}

function handleBoardClick(ev){
    const span = ev.currentTarget
    const region = span.dataset.region
    const rowColumnPair = region.split('.')     //quebra a string no . e cria um array
    const row = rowColumnPair[0]
    const column = rowColumnPair[1]

    if(turnPlayer == 'player1'){
        span.innerText = 'X'
        virtualBoard[row][column] = 'X'
    } else{
        span.innerText = 'O'
        virtualBoard[row][column] = 'O'
    }

    disabledRegion(span)
    const winRegions = getWinRegions()
    if(winRegions.length > 0){
        handleWin(winRegions)
        boardRegion.forEach(function (element){
            element.removeEventListener('click', handleBoardClick)
            element.classList.remove('region')
        })
    } else if(virtualBoard.flat().includes('')){
        turnPlayer = turnPlayer === 'player1' ? 'player2' : 'player1'
        updateTitle()
    } else{
        document.querySelector('h2').innerHTML = '<span>Empate!</span>'
    }
}

function initializeGame (){
    virtualBoard = [['', '', ''], ['', '', ''], ['', '', '']]
    turnPlayer = 'player1'
    document.querySelector('h2').innerHTML = 'Vez de: <span id="turnPlayer"></span>'
    updateTitle()
    boardRegion.forEach(function (element){
        element.classList.remove('win')
        element.innerText = ''
        element.classList.add('region')
        element.addEventListener('click', handleBoardClick)
    })
}

document.getElementById('start').addEventListener('click', initializeGame)