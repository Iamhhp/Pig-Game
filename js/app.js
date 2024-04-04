const overlay = document.getElementsByClassName('overlay')[0];
const Modal = {
  box: document.querySelector('.overlay .box-modal'),
  text: document.querySelector('.overlay .box-modal .text-modal'),
  btn: document.querySelector('.overlay .box-modal .btn-new-game'),
};

const btnNewGame = document.getElementsByClassName('btn-new')[0];
const btnRoll = document.getElementsByClassName('btn-roll')[0];
const btnHold = document.getElementsByClassName('btn-hold')[0];
const imgRoll = document.getElementsByClassName('img-roll')[0];

let whoTurn = 'p1';
let totalCurrent = 0;
const displayPlayer = {
  p1: {
    container: document.getElementsByClassName('player-1')[0],
    totalFinally: document.getElementsByClassName('total-finally')[0],
    totalCurrent: document.querySelector('.player-1 .total-current .count'),
  },
  p2: {
    container: document.getElementsByClassName('player-2')[0],
    totalFinally: document.getElementsByClassName('total-finally')[1],
    totalCurrent: document.querySelector('.player-2 .total-current .count'),
  },
};

const totalFinally = {
  p1: 0,
  p2: 0,
};

const rollDice = () => {
  const roll = Math.trunc(Math.random() * 6 + 1);

  imgRoll.classList.toggle('roll-shack');
  window.setTimeout(() => {
    imgRoll.src = `./assets/img/dice-${roll}.png`;
  }, 10);

  return roll;
};

const switchTurn = () => {
  if (whoTurn === 'p1') {
    whoTurn = 'p2';
  } else {
    whoTurn = 'p1';
  }

  displayPlayer.p1.container.classList.toggle('active');
  displayPlayer.p1.totalCurrent.innerText = 0;
  displayPlayer.p2.container.classList.toggle('active');
  displayPlayer.p2.totalCurrent.innerText = 0;
};

btnRoll.addEventListener('click', () => {
  const numRoll = rollDice();
  if (numRoll === 1) {
    displayPlayer[whoTurn].totalCurrent.innerText = 0;
    totalCurrent = 0;
    switchTurn();
    return;
  }

  totalCurrent += numRoll;
  displayPlayer[whoTurn].totalCurrent.innerText = totalCurrent;
});

const clickHandlerNewGame = () => {
  totalFinally.p1 = 0;
  totalFinally.p2 = 0;
  displayPlayer.p1.totalFinally.innerText = 0;
  displayPlayer.p1.totalCurrent.innerText = 0;
  displayPlayer.p2.totalFinally.innerText = 0;
  displayPlayer.p2.totalCurrent.innerText = 0;
  if (!displayPlayer.p1.container.classList.contains('active')) {
    displayPlayer.p1.container.classList.add('active');
    displayPlayer.p2.container.classList.remove('active');
  }
};
btnNewGame.addEventListener('click', clickHandlerNewGame);

const showModal = (text) => {
  Modal.text.innerText = text;
  overlay.classList.add('show');
  window.setTimeout(() => {
    Modal.box.classList.add('show');
  }, 10);
};

btnHold.addEventListener('click', () => {
  if (!totalCurrent) {
    return;
  }

  totalFinally[whoTurn] += totalCurrent;
  displayPlayer[whoTurn].totalFinally.innerText = totalFinally[whoTurn];

  totalCurrent = 0;
  if (totalFinally[whoTurn] >= 100) {
    showModal(whoTurn === 'p1' ? 'Player-1 Win! 🎉🎉🎉' : 'Player-2 Win! 🎉🎉🎉');
    return;
  }
  switchTurn();
});

const hideModal = () => {
  Modal.box.classList.remove('show');
  window.setTimeout(() => {
    overlay?.classList.remove('show');
  }, 500);
};

Modal.btn.addEventListener('click', () => {
  clickHandlerNewGame();
  hideModal();
});

window.addEventListener('DOMContentLoaded', clickHandlerNewGame);
