const colors = ["red", "yellow", "green", "blue"];
const values = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "skip"];
const deck = [];
const firstCard = [];
const player1 = [];
const player2 = [];
const divPlayer1 = document.querySelector("#player1-hand");
const table = document.querySelector("#table");
const buyButton = document.querySelector("#buyButton");
const playerTurn = true;
const gameOverElement = document.getElementById("gameOver");
function startGame() {
  //Criando as cartas adicionando no Deck
  for (let i = 0; i < colors.length; i++) {
    for (let j = 0; j < values.length; j++) {
      deck.push(`${colors[i]} ${values[j]}`);
    }
  }
  //Embaralhar o Deck
  deck.sort(() => {
    return Math.random() - 0.5;
  });
  //Entregando 7 cartas para cada jogador
  console.log(deck.length);
  for (let i = 0; i < 7; i++) {
    player1.push(deck.pop());
    player2.push(deck.pop());
  }
  // Virar a primeira carta
  for (let i = 0; i < 1; i++) {
    firstCard.push(deck.pop());
  }
}
startGame();
function render() {
  divPlayer1.innerHTML = "";
  player1.forEach((card, index) => {
    let span = document.createElement("span");
    span.id = `card${index + 1}`;
    span.innerText = card;
    span.addEventListener("click", (event) => {
      play(event.target.innerText);
    });
    divPlayer1.appendChild(span);
  });

  table.innerText = `Mesa:  ${firstCard[0]}`;
}
render();
function play(card) {
  //entrar no nome da carta e separar o espaço, jogador 1 e carta da mesa
  let arrayedPlayer = card.split(" ");
  let arrayedMesa = firstCard[0].split(" ");
  let cardPlayable = false;
  //Verifica se a cor ou numero da carta jogada é igual a carta da mesa
  if (
    arrayedMesa[0] === arrayedPlayer[0] ||
    arrayedMesa[1] === arrayedPlayer[1]
  ) {
    let index = player1.indexOf(card);
    firstCard.unshift(card);
    player1.splice(index, 1);
    render();
    cardPlayable = true;
    playComp();
    console.log("Vez do Computador");
  }
  checkStatus();
  // if (deck.length >= 0 && player1.length === 0 && player2.length > 0) {
  //   console.log("Fim do jogo! Você ganhou!");
  //   return;
  // }
  // if (deck.length >= 0 && player2.length === 0 && player1.length > 0) {
  //   console.log("Fim do jogo! O Computador ganhou!");
  //   return;
  // }
  //console.log("Vez do Computador");
}
buyButton.addEventListener("click", () => {
  console.log("Comprei carta");
  if (deck.length > 0) {
    player1.push(deck.pop());
    render();
  } else {
    // Acontece quando as cartas do deck acabam
    if (player1.length < player2.length) {
      console.log("Fim do jogo! Você ganhou!");
      return;
    }
    if (player2.length < player1.length) {
      console.log("Fim do jogo! O Computador ganhou!");
      return;
    }
  }
});
function checkStatus() {
  //Checar se o deck esta vazio, se estiver vazio checar quem tem menos cartas
  //Checar se o usuario ainda tem cartas
  //Checar se o computador tem cartas
  if (deck.length === 0) {
    if (player1.length > player2.length) {
      //acontece quando o deck = a 0 e o player 1 - e maior que zero
      console.log("Fim do jogo! O Computador ganhou!");
    }
    if (player2.length > player1.length) {
      console.log("Fim do jogo! Você ganhou!");
    }
  }
  if (player1.length === 0) {
    console.log("Fim do jogo! Você ganhou!");
    
  }
  if (player2.length === 0) {
    console.log("Fim do jogo! O Computador ganhou!");
  }
}
function buyComp() {
  if (deck.length > 0) {
    player2.push(deck.pop());
    playComp();
  } else {
    // Acontece quando as cartas do deck acabam
    if (player1.length < player2.length) {
      console.log("Fim do jogo! Você ganhou!");
      return;
    }
    if (player2.length < player1.length) {
      console.log("Fim do jogo! O Computador ganhou!");
      return;
    }
  }
}
function playComp() {
  let arrayedMesa = firstCard[0].split(" ");
  let compCard = false;
  player2.forEach((card) => {
    let arrayCard = card.split(" ");
    if (arrayedMesa[0] === arrayCard[0] || arrayedMesa[1] === arrayCard[1]) {
      if (compCard === false) {
        let index = player2.indexOf(card);
        firstCard.unshift(card);
        player2.splice(index, 1);
        compCard = true;
        render()
        return;
      }
    }
  });
  if (compCard === false) {
    buyComp();
  }
  checkStatus();
  console.log(player1);
  console.log(player2);
  console.log(firstCard);
  console.log(deck);
}
