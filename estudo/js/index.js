const colors = ["red", "yellow", "green", "blue"];
const values = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "skip"];
const deck = [];
const firstCard = [];
const player1 = [];
const player2 = [];
const card1 = document.querySelector("#card1");
const card2 = document.querySelector("#card2");
const card3 = document.querySelector("#card3");
const card4 = document.querySelector("#card4");
const card5 = document.querySelector("#card5");
const card6 = document.querySelector("#card6");
const card7 = document.querySelector("#card7");
const card12 = document.querySelector("#card12");
const card22 = document.querySelector("#card22");
const card32 = document.querySelector("#card32");
const card42 = document.querySelector("#card42");
const card52 = document.querySelector("#card52");
const card62 = document.querySelector("#card62");
const card72 = document.querySelector("#card72");
const table = document.querySelector("#table");
const playerTurn = true;
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
  card1.innerText = `${player1[0]}`;
  card2.innerText = `${player1[1]}`;
  card3.innerText = `${player1[2]}`;
  card4.innerText = `${player1[3]}`;
  card5.innerText = `${player1[4]}`;
  card6.innerText = `${player1[5]}`;
  card7.innerText = `${player1[6]}`;
  card12.innerText = `${player2[0]}`;
  card22.innerText = `${player2[1]}`;
  card32.innerText = `${player2[2]}`;
  card42.innerText = `${player2[3]}`;
  card52.innerText = `${player2[4]}`;
  card62.innerText = `${player2[5]}`;
  card72.innerText = `${player2[6]}`;
  table.innerText = `Mesa:  ${firstCard[0]}`;
}
render();
function player1Cards() {
  card1.addEventListener("click", (event) => {
    play(event.target.innerText);
  });
  card2.addEventListener("click", (event) => {
    play(event.target.innerText);
  });
  card3.addEventListener("click", (event) => {
    play(event.target.innerText);
  });
  card4.addEventListener("click", (event) => {
    play(event.target.innerText);
  });
  card5.addEventListener("click", (event) => {
    play(event.target.innerText);
  });
  card6.addEventListener("click", (event) => {
    play(event.target.innerText);
  });
  card7.addEventListener("click", (event) => {
    play(event.target.innerText);
  });
}
function play(card) {
  //entrar no nome da carta e separar o espeaço, jogador 1 e carta da mesa
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
  }
  while (!cardPlayable && deck.length > 0) {
    player1.push(deck.pop());

    // Verifique se a nova carta é jogável
    player1.forEach((card) => {
      let arrayCard = card.split(" ");
      if (arrayedMesa[0] === arrayCard[0] || arrayedMesa[1] === arrayCard[1]) {
        let index = player1.indexOf(card);
        firstCard.unshift(card);
        player1.splice(index, 1);
        render();
        cardPlayable = true;
        console.log(player1);
        return;
      }
    });
  }
  if (deck.length === 0 && player1.length === 0) {
    alert("Fim do jogo! Você ganhou!");
    return;
  }

  if (deck.length === 0 && player2.length === 0) {
    alert("Fim do jogo! O Computador ganhou!");
    return;
  }
  playComp();
}
player1Cards();

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
        render();
        compCard = true;
        console.log("Computador Jogou");
        return;
      }
    } else {
      //se o computador nao tiver carta ele compra do monte
      while (!compCard && deck.length > 0) {
        // Adicione uma carta do deck às cartas do computador
        player2.push(deck.pop());
        // Verifique se a nova carta é jogável
        player2.forEach((card) => {
          let arrayCard = card.split(" ");
          if (
            arrayedMesa[0] === arrayCard[0] ||
            arrayedMesa[1] === arrayCard[1]
          ) {
            let index = player2.indexOf(card);
            firstCard.unshift(card);
            player2.splice(index, 1);
            render();
            compCard = true;
            console.log("Computador jogou");
            return;
          }
        });
      }
    }
  });
  console.log(player1);
  console.log(player2);
  console.log(firstCard);
}
