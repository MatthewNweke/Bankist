'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
};

const account3 = {
  owner: 'Steven Thomas Williams',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: 'Sarah Smith',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
};
const account5 = {
  owner: 'Matthew Nweke',
  movements: [4300, 1000, 1700, -500, -30, -4600, 50, 90],
  interestRate: 0.8,
  pin: 5555,
};

const accounts = [account1, account2, account3, account4, account5];

// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');

// formInput.addEventListener("focus", function () {
//   console.log(formInput.value);
// })
/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES

const displayMovements = function (movements, sort = false) {

  const movs = sort ? movements.slice().sort((a, b) => a - b) : movements;
  containerMovements.innerHTML = ""

  movs.forEach(function (mov, i) {

    const type = mov > 0 ? "deposit" : "withdrawal";



    const html = `<div class="movements__row">
    <div class="movements__type movements__type--${type}">${i + 1} ${type}</div>
    <div class="movements__type"></div>
    <div class="movements__value">${mov}€</div>
  </div>`
    containerMovements.insertAdjacentHTML("afterbegin", html)
  })
  // beforeend can also be used in place of the afterbegin,it rverses the items 
}
// displayMovements(account1.movements)

const currencies = new Map([
  ['USD', 'United States dollar'],
  ['EUR', 'Euro'],
  ['GBP', 'Pound sterling'],
]);



/////////////////////////////////////////////////
// const sliceMe = ["a", "b", "c", "d", "e", "f", "g"];
// console.log(sliceMe.slice(2, -3));
// console.log(sliceMe);

// movements= [5000, 3400, -150, -790, -3210, -1000, 8500, -30]
const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

// movements.forEach(mov => {
//     if(mov < 0){
//       // continue;
//     }
// });


// for (i = 0; i < 10; i++) {
//   console.log(i);

//   if (i === 3) { break; }
//   // text += "The number is " + i + "<br>";
// }

// for julia the first and the last two dogs are actualy cats
// const checkDogs = function (julia, kate) {
//   // julia.forEach(function (el, i) {
//   const removeMe = julia.slice(1, julia.length - 2);
//   console.log(removeMe);
//   const juliAndKate = [...removeMe, ...kate];
//   // console.log(juliAndKate);
//   juliAndKate.forEach(function (el, i) {
//     el >= 3 ? console.log(`Dog number ${[i + 1]} is an adult and is ${el} years old`)
//       : console.log(`Dog number ${[i + 1]} is still a puppy`)
//   })
//   // })
// }
// checkDogs([3, 5, 2, 12, 7], [4, 1, 15, 8, 3])

// console.log("matthew...nweke...kelechi jffjfjf".split("..."));
const user = "Stephen Thomas Williams"
const createUsernames = function (accs) {
  accs.forEach(function (acc) {

    acc.username = acc.owner
      .toLowerCase()
      .split(" ")
      .map(name => name[0])
      .join("");
  })

}

const deposits = movements.filter(function (mov, i, arr) {
  return mov > 0
})
console.log(deposits);
console.log(createUsernames(accounts));



// the reduce method also loops over the array and calls the callback
// const balance = movements.reduce(function (acc, cur, i, arr) {
//   console.log(`iteration ${i} : ${acc}`);
//   return acc + cur;
// }, 0)
const balance = movements.reduce((acc, cur, i, arr) => acc + cur, 0)
console.log(balance);

const calcDisplayBalance = function (acc) {
  const balance = acc.movements.reduce((acc, cur) => acc + cur, 0);
  acc.balance = balance;
  labelBalance.textContent = `${balance} €`
}
// calcDisplayBalance(account1.movements);
const calcDisplaySummary = function (acc) {
  const incomes = acc.movements.filter(mov => mov > 0)
    .reduce((acc, mov) => acc + mov, 0)
  labelSumIn.textContent = `${incomes} €`

  const out = acc.movements.filter(mov => mov < 0)
    .reduce((acc, mov) => acc + mov, 0)
  labelSumOut.textContent = `${Math.abs(out)} €`
  // const checkAvr=0.012 * mov +mov;
  const interest = acc.movements.filter(mov => mov > 0)
    .map(deposit => (deposit * acc.interestRate) / 100)
    .filter(int => int >= 1)
    .reduce((acc, cur) => acc + cur);

  labelSumInterest.textContent = `${interest} €`;
}

// calcDisplaySummary(account1.movements)
const checkMax = movements.reduce(function (acc, cur) {
  //  ?return acc:console.log(cur);
  if (acc > cur) {
    return acc;
  }
  else return cur;
});
console.log(checkMax);

const account = accounts.find(acc => acc.owner === "Jessica Davies");
console.log(account);
// array methods chaining
const eurToUsd = 1.1;
const totalDepositsUsd = movements.filter(mov => mov > 0)
  .map(mov => mov * eurToUsd)
  .reduce((acc, mov) => acc + mov, 0);
console.log(totalDepositsUsd);

const updateUI = function (acc) {
  displayMovements(acc.movements);
  calcDisplayBalance(acc)
  calcDisplaySummary(acc)
}

let currentAccount;
btnLogin.addEventListener("click", function (e) {
  e.preventDefault();
  currentAccount = accounts.find(acc => acc.username === inputLoginUsername.value);
  console.log(currentAccount);
  if (currentAccount?.pin === +inputLoginPin.value) {
    console.log("Login");
    labelWelcome.innerHTML = `<p>Welcome back, <span style="color:green;font-weight:bolder">
    ${currentAccount.owner.split(" ")[0]}</span></p>`
    containerApp.style.opacity = "100";
    inputLoginUsername.value = inputLoginPin.value = "";


    updateUI(currentAccount);
  }
})
btnTransfer.addEventListener("click", function (e) {
  e.preventDefault();
  const amount = Number(inputTransferAmount.value);
  const receiverAccount = accounts.find(acc => acc.username === inputTransferTo.value);
  console.log(amount, receiverAccount);
  if (amount > 0 && currentAccount.balance >= amount
    && receiverAccount?.username !== currentAccount) {
    // console.log("Transfer valid");
    currentAccount.movements.push(-amount);
    receiverAccount.movements.push(amount);
    updateUI(currentAccount);
  }
  inputTransferAmount.value = inputTransferTo.value = ""

})
const withdrawals = movements.filter(mov => mov < 0)
console.log(withdrawals);

btnLoan.addEventListener("click", function (e) {
  e.preventDefault();
  const amount = Number(inputLoanAmount.value);
  if (amount > 0 && currentAccount.movements.some(mov => mov >= amount * 0.1)) {
    currentAccount.movements.push(amount);
    updateUI(currentAccount)
  }
  inputLoanAmount.value = ""
})

const accountMovements = accounts.map(acc => acc.movements);
const allMovements = accountMovements.flat();
const overalBalance = allMovements.reduce((acc, mov) => acc + mov, 0)

btnClose.addEventListener("click", function (e) {
  e.preventDefault();
  if (inputCloseUsername.value === currentAccount.username &&
    +inputClosePin.value) {
    const index = accounts.findIndex(acc => acc.username === currentAccount.username)
    accounts.splice(index, 1);
    labelWelcome.textContent = `Login to get started`;
    document.querySelector(".logout-timer").style.opacity = "0";
    containerApp.style.opacity = "0";
  }
  inputCloseUsername.value = inputClosePin.value = ""
  btnLogin.addEventListener("click", function () {
    if (inputLoginUsername.value === inputCloseUsername.value
      && inputLoginPin.value === +inputClosePin.value) {
      labelWelcome.textContent = `Account already closed`;
    }
    console.log("you clicked me");

  })
})
let sorted = false;
btnSort.addEventListener("click", function (e) {
  e.preventDefault();
  displayMovements(currentAccount.movements, !sorted)
  sorted = !sorted;
})

// loading section
let html = document.querySelector("html");
html.style.overflow = "hidden";
let loader = document.querySelector(".loader");
setTimeout(function () {
  loader.style.display = "none";
  html.style.overflow = "visible";
  containerApp.style.opacity = "100";
}, 5000)



const bankDepositSum = accounts
  .flatMap(acc => acc.movements)
  // .filter(mov => mov >= 1000)
  .reduce((sum, curr) => sum + curr, 0)
console.log(bankDepositSum);

const convertStr = function (str) {
  // console.log(str.toUpperCase());
  const checkStr = str.split(" ");

  // checkStr.forEach(function (el, i, arr) {
  //   // console.log(arr);

  // })
}
convertStr("i am matthew");
// const calcAvrHumanAge = function (dogAges) {

//   const checkAge = dogAges.map(function (dogAge) {
//     return dogAge <= 2 ? 2 * dogAge : 16 + dogAge * 4;
//   });
//   // console.log(checkAge);
//   const exclude = checkAge.filter(function (n) {
//     return n >= 18;
//   });
//   const calcAvr = exclude.reduce(function (acc, cur, i, arr) {
//     const sum = acc + cur;
//     const avr = sum / arr.length;
//     return avr;
//   })
//   console.log(calcAvr);
// }
// calcAvrHumanAge([5, 2, 4, 1, 15, 8, 3]);
// calcAvrHumanAge([16, 6, 10, 5, 6, 1, 4]);

// The includes() method only checks for equality
// in tj=he some() method you can specify a condition