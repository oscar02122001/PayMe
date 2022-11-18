'use strict'

// Data
const account1 = {
    owner: 'Ismatov Olimjon',
    movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
    interestRate: 1.2, // %
    pin: 1111,

    movementsDates: [
        '2019-11-18T21:31:17.178Z',
        '2019-12-23T07:42:02.383Z',
        '2020-01-28T09:15:04.904Z',
        '2020-04-01T10:17:24.185Z',
        '2020-05-08T14:11:59.604Z',
        '2020-05-27T17:01:17.194Z',
        '2020-07-11T23:36:17.929Z',
        '2022-11-05T10:51:36.790Z',
    ],
    currency: 'EUR',
    locale: 'de-DE',
};

const account2 = {
    owner: 'Nazarov Bunyod',
    movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
    interestRate: 1.5,
    pin: 2222,

    movementsDates: [
        '2019-11-01T13:15:33.035Z',
        '2019-11-30T09:48:16.867Z',
        '2019-12-25T06:04:23.907Z',
        '2020-01-25T14:18:46.235Z',
        '2020-02-05T16:33:06.386Z',
        '2020-04-10T14:43:26.374Z',
        '2020-06-25T18:49:59.371Z',
        '2020-07-26T12:01:20.894Z',
    ],
    currency: 'USD',
    locale: 'en-US',
};



const account3 = {
    owner: 'Azizov Jasur',
    movements: [200, -200, 340, -300, -20, 50, 400, -460],
    interestRate: 0.7,
    pin: 3333,

    movementsDates: ['2019-11-01T13:15:33.035Z',
        '2019-11-30T09:48:16.867Z',
        '2019-12-25T06:04:23.907Z',
        '2020-01-25T14:18:46.235Z',
        '2020-02-05T16:33:06.386Z',
        '2020-04-10T14:43:26.374Z',
        '2020-06-25T18:49:59.371Z',
        '2020-07-26T12:01:20.894Z',
    ],
    currency: 'USD',
    locale: 'en-US',
};

const account4 = {
    owner: 'Olimov Laziz',
    movements: [430, 1000, 700, 50, 90],
    interestRate: 1,
    pin: 4444,

    movementsDates: [
        '2019-11-01T13:15:33.035Z',
        '2019-11-30T09:48:16.867Z',
        '2019-12-25T06:04:23.907Z',
        '2020-01-25T14:18:46.235Z',
        '2020-02-05T16:33:06.386Z',
        '2020-04-10T14:43:26.374Z',
        '2020-06-25T18:49:59.371Z',
        '2020-07-26T12:01:20.894Z',
    ],
    currency: 'USD',
    locale: 'en-US',
};

const accounts = [account1, account2, account3, account4];




const btnLogin = document.querySelector('.login__btn');
const btnStart = document.querySelectorAll('.login-start');
const btnLoan = document.querySelector('.form__btn--loan')
const btnTransfer = document.querySelector('.form__btn--transfer')
const btnClose = document.querySelector('.closeBtn')
const btnOut = document.querySelector('.out-label')
const btnIn = document.querySelector('.in-label')
const btnCur = document.querySelector('.currant-label')

const showLog = document.querySelector('.show-log')
const app = document.querySelector('.app');
const shadow = document.querySelector('.shadow')

const login = document.querySelector('.login');
const inputLoginUsr = document.querySelector('.login__usr');
const inputLoginPin = document.querySelector('.login__pin');
const inputLoanAmount = document.querySelector('.form__input--loan-amount')
const inputUsrTrf = document.querySelector('.form__input--to')
const inputAmountTrf = document.querySelector('.form__input--amount')

const labelBalanceList = document.querySelector('.balance-list')
const labelBalance = document.querySelector('.balance-label')
const timer = document.querySelector('.timer')
const labelDate = document.querySelector('.date')
const labelWelcome = document.querySelector('.label-welcome');
const balanceValue = document.querySelector('.balance-value')
const containerMov = document.querySelector('.movements')
const text = document.querySelectorAll('.ser-text');
const transfers = document.querySelector('.transfers');
const transferDis = document.querySelector('.transfer');
const cash = document.querySelector('.cash');
const loan = document.querySelector('.loan');
const loanDis = document.querySelector('.display-loan');
const closeAcc = document.querySelector('.cards');


const openModal = function () {
    login.classList.add('active')
    shadow.classList.remove('hidden')
}

const closeModal = function () {
    login.classList.remove('active')
    shadow.classList.add('hidden')
}

const createUser = function (accs) {
    accs.forEach(acc => {
        acc.user = acc.owner.toLowerCase().split(' ').map(word => word[0]).join('')
    })
}
createUser(accounts)

const numFormat = function (value, locale, currency) {
    const number = new Intl.NumberFormat(locale, {
        style: 'currency',
        currency: currency,
    }).format(value)
    return number
}


const calcTimer = function () {
    const tickTimer = function () {
        const min = String(Math.floor(time / 60)).padStart(2, 0)
        const sec = String(Math.floor(time % 60)).padStart(2, 0)

        timer.textContent = `${min}:${sec}`

        if (time === 0) {
            app.style.display = 'none';
            login.style.display = 'block'
            showLog.style.display = 'block'
        }

        time--;
    }
    let time = 120

    tickTimer()

    const timerBasic = setInterval(tickTimer, 1000)
    return timerBasic
}


btnStart.forEach(btn => btn.addEventListener('click', openModal))
btnClose.addEventListener('click', closeModal)
shadow.addEventListener('click', closeModal)

const calcBalance = function (acc, balanceType) {
    acc.balance = balanceType.reduce((accur, mov) => accur + mov, 0)
    const formatBalance = numFormat(acc.balance, acc.locale, acc.currency)
    balanceValue.textContent = formatBalance
};

const besicBalance = function () {
    labelBalance.style.color = 'rgb(77, 194, 5)'
    labelBalance.textContent = btnCur.textContent
    balanceValue.style.color = 'rgb(77, 194, 5)'

    updateUI(currentAccaunt, currentAccaunt.movements)
}
labelBalance.addEventListener('click', function (e) {
    e.preventDefault()
    labelBalance.classList.toggle('active')
    labelBalanceList.classList.toggle('active')
})
btnCur.addEventListener('click', besicBalance)

btnIn.addEventListener('click', function (e) {
    e.preventDefault()

    labelBalance.textContent = btnIn.textContent
    labelBalance.style.color = 'rgb(77, 194, 5)'
    balanceValue.style.color = 'rgb(77, 194, 5)'
    // labelBalanceList.classList.remove('active')

    const calcIn = function (accs) {
        accs.forEach(acc => {
            acc.incames = acc.movements.filter(mov => mov > 0)
        })
    }
    calcIn(accounts)
    updateUI(currentAccaunt, currentAccaunt.incames)
})
btnOut.addEventListener('click', function (e) {
    e.preventDefault()

    labelBalance.textContent = btnOut.textContent
    labelBalance.style.color = 'red'
    balanceValue.style.color = 'red'
    // labelBalanceList.classList.remove('active')

    const calcOut = function (accs) {
        accs.forEach(acc => {
            acc.outcames = acc.movements.filter(mov => mov < 0)

        })
    }
    calcOut(accounts)
    updateUI(currentAccaunt, currentAccaunt.outcames)
})

const daysMovements = function (date, locale) {
    const calcPassedDays = (day1, day2) => Math.round(Math.abs(day2 - day1) / (1000 * 60 * 60 * 24))
    const daysPassed = calcPassedDays(new Date(), date)

    if (daysPassed === 0) return 'Today'
    if (daysPassed === 1) return 'Yesterday'
    if (daysPassed <= 7) return `${daysPassed} days ago`;
    else {
        // const day = `${date.getDate()}`.padStart(2, 0)
        // const month = `${date.getMonth()+1}`.padStart(2, 0);
        // const year = date.getFullYear()
        // return `${day}/${month}/${year}`
        return Intl.DateTimeFormat(locale).format(date)
    }
}

const displayMovements = function (acc, balanceType) {
    containerMov.innerHTML = ''
    balanceType.forEach(function (mov, i) {
        const type = mov > 0 ? 'deposit' : 'withdrawal';
        const formatMov = numFormat(mov, acc.locale, acc.currency)
        const movDate = new Date(acc.movementsDates[i])
        const displayDate = daysMovements(movDate, acc.locale)

        const html = `
            <div class = "movements__row">
            <div class = "movements__type movements__type--${type}"> ${i+1} ${type}</div> 
            <div class = "movements__date"> ${displayDate}</div>
            <div class = "movements__value"> ${formatMov}</div>
             </div>
    `;
        containerMov.insertAdjacentHTML('afterbegin', html)
    })
}

const updateUI = function (acc, balanceType) {
    displayMovements(acc, balanceType)
    calcBalance(acc, balanceType)
}

let currentAccaunt, timerBasic
btnLogin.addEventListener('click', function (e) {
    e.preventDefault()

    currentAccaunt = accounts.find(acc => acc.user === inputLoginUsr.value)

    if (timerBasic) clearInterval(timerBasic)

    timerBasic = calcTimer()

    const date = new Date()

    const year = date.getFullYear()
    const month = String(`${date.getMonth() + 1}`).padStart(2, 0)
    const day = String(date.getDate()).padStart(2, 0)
    const hour = String(date.getHours()).padStart(2, 0)
    const min = String(date.getMinutes()).padStart(2, 0)

    labelDate.textContent = `${day}/${month}/${year}, ${hour}:${min}`

    if (currentAccaunt && currentAccaunt.pin === +inputLoginPin.value) {
        containerMov.style.display = 'block'
        transferDis.style.display = 'none'
        loanDis.style.display = 'none'
        app.style.display = 'block'
        showLog.style.display = 'none'
        closeModal()
        labelWelcome.textContent = `Welcome back, ${currentAccaunt.owner.split(' ')[1]}`

        inputLoginPin.value = inputLoginUsr.value = '';

        updateUI(currentAccaunt, currentAccaunt.movements)
    }

})

btnTransfer.addEventListener('click', function (e) {
    e.preventDefault()
    const resiveAcc = accounts.find(acc => acc.user === inputUsrTrf.value)
    const amount = Number(inputAmountTrf.value)

    besicBalance()
    if (timerBasic) clearInterval(timerBasic)
    timerBasic = calcTimer()

    if (resiveAcc && amount > 0 && currentAccaunt !== resiveAcc && amount < currentAccaunt.balance) {
        resiveAcc.movements.push(amount)
        currentAccaunt.movements.push(-amount)
        currentAccaunt.movementsDates.push(new Date())
        resiveAcc.movementsDates.push(new Date())


        updateUI(currentAccaunt, currentAccaunt.movements)
        inputAmountTrf.value = inputUsrTrf.value = '';
    }

})

btnLoan.addEventListener('click', function (e) {
    e.preventDefault()
    const amount = Number(inputLoanAmount.value)
    // console.log(amount);

    if (timerBasic) clearInterval(timerBasic)
    timerBasic = calcTimer()

    if (amount > 0 && currentAccaunt.movements.some(mov => mov >= amount * 0.1)) {
        setTimeout(function () {
            currentAccaunt.movements.push(amount)
            currentAccaunt.movementsDates.push(new Date())

            updateUI(currentAccaunt, currentAccaunt.movements)
        }, 2000)
    }
    inputLoanAmount.value = '';
})

cash.addEventListener('click', function (e) {
    e.preventDefault()
    containerMov.style.display = 'block'
    transferDis.style.display = 'none'
    loanDis.style.display = 'none'
})

transfers.addEventListener('click', function (e) {
    e.preventDefault()
    besicBalance()
    labelBalanceList.classList.remove('active')
    transferDis.style.display = 'block'
    containerMov.style.display = 'none'
    loanDis.style.display = 'none'

})

loan.addEventListener('click', function (e) {
    e.preventDefault()
    transferDis.style.display = 'none'
    containerMov.style.display = 'none'
    loanDis.style.display = 'block'
})