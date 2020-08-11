const selectedUser = document.getElementById('imgSelectedUser')
const selectedMachine = document.getElementById('imgSelectedMachine')
const start = document.getElementById('start')
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
const currentRoundHTML = document.getElementById('currentRoundHTML')
const cancel = document.getElementById('cancel')
const options = document.getElementById('options')
const player = document.querySelectorAll('.player')

let user = ""
let machine = ""
let time = 3
let userScore = 0
let machineScore = 0
let gameStarted = false
let roundsToWin = 0
let currentRound = 0
let srcBase = 'assets/img/'

options.addEventListener('click', (e) => {
    if (gameStarted && (e.target.id == 'rock' || e.target.id == 'paper' || e.target.id == 'scissors')) {
        document.querySelectorAll('.option').forEach(el => el.classList.remove('focus'))
        e.target.parentNode.classList.add('focus')
        if (e.target.id == 'rock') {
            selectedUser.src = srcBase + 'rock.svg'
            user = 'rock'
        } else if (e.target.id == 'paper') {
            selectedUser.src = srcBase + 'paper.svg'
            user = 'paper'
        } else if (e.target.id == 'scissors') {
            selectedUser.src = srcBase + 'scissors.svg'
            user = 'scissors'
        }
    }
})

start.addEventListener('click', () => {
    gameStarted = true
    selectedMachine.src = ''
    selectedUser.src = ''
    user = ''
    machine = ''
    document.querySelectorAll('.option').forEach(el => el.classList.remove('focus'))
    player.forEach(el => {
        el.classList.remove('lose')
        el.classList.remove('win')
        el.classList.remove('tie')
    })
    time = 3
    currentRound += 1
    currentRoundHTML.innerHTML = currentRound
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
        document.getElementById('roundsContainer').style.display = 'block'
        currentRoundHTML.innerHTML = currentRound
        timer()
    } else if (roundsInput.value == "") {
        alert("The input can't be empty")
    } else if (roundsInput.value <= 0) {
        alert('Enter a number bigger than 0')
    }
})

cancel.addEventListener('click', (e) => {
    e.preventDefault()
    startModal.classList.remove('lightbox--show')
    start.disabled = false
    start.innerHTML = "Start"
    reset()
})

const startGame = () => {
    let machine = Math.floor((Math.random() * 3) + 1)
    if (machine == 1) {
        machine = 'rock'
        selectedMachine.src = 'assets/img/rock.svg'
    } else if (machine == 2) {
        machine = 'paper'
        selectedMachine.src = 'assets/img/paper.svg'
    } else if (machine == 3) {
        machine = 'scissors'
        selectedMachine.src = 'assets/img/scissors.svg'
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
        } else {
            machineContainer.classList.add('tie')
            userContainer.classList.add('tie')
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
        } else {
            machineContainer.classList.add('tie')
            userContainer.classList.add('tie')
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
        } else {
            machineContainer.classList.add('tie')
            userContainer.classList.add('tie')
        }
    }

    userScoreHTML.innerHTML = userScore
    machineScoreHTML.innerHTML = machineScore
}

const validateScore = () => {
    player.forEach(el => {
        el.classList.remove('winning')
        el.classList.remove('global-tie')
    })

    if (userScore > machineScore) {
        userContainer.classList.add('winning')
    } else if (machineScore > userScore) {
        machineContainer.classList.add('winning')
    } else if (machineScore == userScore) {
        userContainer.classList.add('global-tie')
        machineContainer.classList.add('global-tie')
    }

    if (roundsToWin == currentRound) {
        start.innerHTML = "Start"
        scoreModal.classList.add('lightbox--show')
        document.getElementById('finalScoreUser').innerHTML = userScore
        document.getElementById('finalScoreMachine').innerHTML = machineScore
        if (userScore > machineScore) {
            document.getElementById('winner').innerHTML = "User Wins!!"
        } else if (machineScore > userScore) {
            document.getElementById('winner').innerHTML = "Machine Wins!!"
        } else if (machineScore == userScore) {
            document.getElementById('winner').innerHTML = "Tie!!"
        }
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
    currentRound = 0
    userScoreHTML.innerHTML = userScore
    machineScoreHTML.innerHTML = machineScore
    gameStarted = false
    document.querySelectorAll('.option').forEach(el => el.classList.remove('focus'))
    player.forEach(el => {
        el.classList.remove('lose')
        el.classList.remove('win')
        el.classList.remove('tie')
        el.classList.remove('winning')
        el.classList.remove('global-tie')
    })
    document.getElementById('time').style.display = 'none'
    document.getElementById('roundsContainer').style.display = 'none'
    selectedMachine.src = ''
    selectedUser.src = ''
}