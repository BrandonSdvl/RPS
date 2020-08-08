const rock = document.getElementById('rock')
const paper = document.getElementById('paper')
const scissors = document.getElementById('scissors')
const selectedUser = document.getElementById('imgSelectedUser')
const selectedMachine = document.getElementById('imgSelectedMachine')
const button = document.getElementById('start')
const timeHTML = document.getElementById('time')
const userScoreHTML = document.getElementById('userScore')
const machineScoreHTML = document.getElementById('machineScore')
const userContainer = document.getElementById('userContainer')
const machineContainer = document.getElementById('machineContainer')
const scoreModal = document.getElementById('scoreModal')
const startModal = document.getElementById('startModal')
const restart = document.getElementById('restart')
const startConfirm = document.getElementById('startConfirm')
const roundsInput = document.getElementById('roundsInput')

let user = ""
let machine = ""
let time = 3
let userScore = 0
let machineScore = 0
let gameStarted = false
let roundsToWin = 0

rock.addEventListener('click', () => {
    if (gameStarted) {
        selectedUser.src = 'assets/img/rockUser.png'
        rock.classList.add('focus')
        paper.classList.remove('focus')
        scissors.classList.remove('focus')
        user = 'rock'
    }
})

paper.addEventListener('click', () => {
    if (gameStarted) {
        selectedUser.src = 'assets/img/paperUser.png'
        rock.classList.remove('focus')
        paper.classList.add('focus')
        scissors.classList.remove('focus')
        user = 'paper'
    }
})

scissors.addEventListener('click', () => {
    if (gameStarted) {
        selectedUser.src = 'assets/img/scissorUser.png'
        rock.classList.remove('focus')
        paper.classList.remove('focus')
        scissors.classList.add('focus')
        user = 'scissors'
    }
})

start.addEventListener('click', () => {
    gameStarted = true
    selectedMachine.src = ''
    selectedUser.src = ''
    user = ''
    machine = ''
    rock.classList.remove('focus')
    paper.classList.remove('focus')
    scissors.classList.remove('focus')
    userContainer.classList.remove('lose')
    userContainer.classList.remove('win')
    machineContainer.classList.remove('win')
    machineContainer.classList.remove('lose')
    time = 3
    if (start.innerHTML == 'Start') {
        startModal.classList.add('lightbox--show')
        start.innerHTML = 'Continue'
    } else {
        timer()
    }
    start.disabled = true
})

scoreModal.addEventListener('click', (e) => {
    if (e.target.classList.contains('lightbox')) {
        scoreModal.classList.remove('lightbox--show')
        reset()
    }
})

restart.addEventListener('click', () => {
    scoreModal.classList.remove('lightbox--show')
    reset()
})

startConfirm.addEventListener('click', (e) => {
    e.preventDefault()
    if (document.form.checkValidity()) {
        roundsToWin = roundsInput.value
        startModal.classList.remove('lightbox--show')
        document.getElementById('time').style.display = 'flex'
        document.getElementById('pointsContainer').style.display = 'block'
        document.getElementById('points').innerHTML = roundsToWin
        timer()
    } else if (roundsInput.value == "") {
        alert("The input can't be empty")
    } else if (roundsInput.value <= 0) {
        alert('Enter a number bigger than 0')
    }
})

const startGame = () => {
    let machine = Math.floor((Math.random() * 3) + 1)
    if (machine == 1) {
        machine = 'rock'
        selectedMachine.src = 'assets/img/rockMachine.png'
    } else if (machine == 2) {
        machine = 'paper'
        selectedMachine.src = 'assets/img/paperMachine.png'
    } else if (machine == 3) {
        machine = 'scissors'
        selectedMachine.src = 'assets/img/scissorMachine.png'
    }
    validation(machine, user)
}

const validation = (machine, user) => {
    if (user == '') {
        machineScore += 1
        machineContainer.classList.add('win')
        userContainer.classList.add('lose')
    } else if (user == 'rock') {
        if (machine == 'scissors') {
            userScore += 1
            machineContainer.classList.add('lose')
            userContainer.classList.add('win')
        } else if (machine == 'paper') {
            machineScore += 1
            machineContainer.classList.add('win')
            userContainer.classList.add('lose')
        }
    } else if (user == 'paper') {
        if (machine == 'rock') {
            userScore += 1
            machineContainer.classList.add('lose')
            userContainer.classList.add('win')
        } else if (machine == 'scissors') {
            machineScore += 1
            machineContainer.classList.add('win')
            userContainer.classList.add('lose')
        }
    } else if (user == 'scissors') {
        if (machine == 'paper') {
            userScore += 1
            machineContainer.classList.add('lose')
            userContainer.classList.add('win')
        } else if (machine == 'rock') {
            machineScore += 1
            machineContainer.classList.add('win')
            userContainer.classList.add('lose')
        }
    }

    userScoreHTML.innerHTML = userScore
    machineScoreHTML.innerHTML = machineScore
}

const validateScore = () => {
    if (userScore > machineScore) {
        userContainer.classList.add('winning')
        machineContainer.classList.remove('winning')
    } else if (machineScore > userScore) {
        userContainer.classList.remove('winning')
        machineContainer.classList.add('winning')
    }
    if (userScore == roundsToWin) {
        start.innerHTML = "Start"
        scoreModal.classList.add('lightbox--show')
        document.getElementById('finalScoreUser').innerHTML = userScore
        document.getElementById('finalScoreMachine').innerHTML = machineScore
        document.getElementById('winner').innerHTML = "User Wins!!"
    } else if (machineScore == roundsToWin) {
        start.innerHTML = "Start"
        scoreModal.classList.add('lightbox--show')
        document.getElementById('finalScoreUser').innerHTML = userScore
        document.getElementById('finalScoreMachine').innerHTML = machineScore
        document.getElementById('winner').innerHTML = "Machine Wins!!"
    }
}

const timer = () => {
    timeHTML.innerHTML = time
    time -= 1
    if (time >= 0) {
        setTimeout('timer()', 1000)
    } else {
        startGame()
        validateScore()
        start.disabled = false
        gameStarted = false
    }
}

const reset = () => {
    userScore = 0
    machineScore = 0
    userScoreHTML.innerHTML = userScore
    machineScoreHTML.innerHTML = machineScore
    rock.classList.remove('focus')
    paper.classList.remove('focus')
    scissors.classList.remove('focus')
    userContainer.classList.remove('lose')
    userContainer.classList.remove('win')
    userContainer.classList.remove('winning')
    machineContainer.classList.remove('win')
    machineContainer.classList.remove('lose')
    machineContainer.classList.remove('winning')
    document.getElementById('time').style.display = 'none'
    document.getElementById('pointsContainer').style.display = 'none'
    selectedMachine.src = ''
    selectedUser.src = ''
}