let playerText = document.querySelector('#playerText')
let restartBtn = document.querySelector('#restartBtn')
let boxes = Array.from(document.getElementsByClassName('cell'))
let  winnerIndicator = getComputedStyle(document.body).getPropertyValue('--winning-blocks')
let drawIndicator = getComputedStyle(document.body).getPropertyValue('--draw-indicator')


const O_TEXT = "O"
const X_TEXT = "X"
let currentPLayer = X_TEXT
let spaces = Array(9).fill(null)
let countPlays = 0

const startGame = () => {
    boxes.forEach(box => box.addEventListener('click', boxClicked))
}

function boxClicked(e) {
    const id = e.target.id

    if(!spaces[id] && countPlays < 9){
        spaces[id] = currentPLayer
        e.target.innerText = currentPLayer

        if(playerHasWon() !==false){
            playerText.innerHTML = `${currentPLayer} has won!`
            let winningBlocks = playerHasWon()
            countPlays = 10
            winningBlocks.map(box => boxes[box].style.backgroundColor = winnerIndicator)
            return
        }
        countPlays++
        currentPLayer = currentPLayer == X_TEXT ? O_TEXT : X_TEXT

    }
    document.querySelector('.status').innerText = `current player: ${currentPLayer}`


    if(countPlays == 9){
        playerText.innerHTML = 'Draw Game!'
        boxes.forEach(box => box.style.color = drawIndicator)
    }
}

const winningCombos = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
]

function playerHasWon(){
    for (const condition of winningCombos) {
        let [a,b,c] = condition
      
        if (spaces[a] && spaces[a] === spaces[b] && spaces[a] === spaces[c]){
            return [a,b,c];
          }
          
      }
      return false
}

restartBtn.addEventListener('click', restart)

function restart(){
    spaces.fill(null)

    countPlays = 0

    boxes.forEach( box =>{
        box.innerText = ''
        box.style.backgroundColor = ''
        box.style.color = '#105f2b'
    })

    currentPLayer = X_TEXT

    playerText = 'Tic Tac Toe'

}

startGame()


