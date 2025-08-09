const leftV = document.getElementById("inputLeft");
const rightV = document.getElementById("inputRight");

const player1V = document.getElementById("Player1");
const player2V = document.getElementById("Player2");

const buttonV = document.getElementById("StartButtonInput");


const centerNumber = document.getElementById("CenterNumber");
let WaitingV = true;


leftV.value = 1
rightV.value = 2



function wait(seconds) {
  return new Promise(resolve => setTimeout(resolve, seconds*1000));
}

function RandomF(min, max) {
  return Math.floor((max-min) * Math.random() + min);
}



leftV.addEventListener("input", () => {
  if (leftV.value > 99) {
    leftV.value = 99;
  } else if (leftV.value < 0) {
    leftV.value = 0;
  }

  if (rightV.value == leftV.value) {
    leftV.value -= 1
    if (leftV.value < 0) {
      leftV.value = 1
    }
  }
});


rightV.addEventListener("input", () => {
  if (rightV.value > 99) {
    rightV.value = 99;
  } else if (rightV.value < 0) {
    rightV.value = 0;
  }

  if (rightV.value == leftV.value) {
    rightV.value -= 1
    if (rightV.value < 0) {
      rightV.value = 1
    }
  }
});



function ChooseWinner(randomV, player1, player2) {
  let WinningPlayer = undefined;

  let player1Score = Math.abs(player1 - randomV);
  let player2Score = Math.abs(player2 - randomV);

  if (player1Score < player2Score) {
    WinningPlayer = player1V
  } else if (player2Score < player1Score) {
    WinningPlayer = player2V
  }

  (async () => {

    for (let x = 1; x < 5; x++) {
      WinningPlayer.style.color = "#3CFF1E";
      await wait(0.2)
      WinningPlayer.style.color = "#060A50";
      await wait(0.2)
    }

    WaitingV = true;

  })();
}



buttonV.addEventListener("click", () => {
  if (WaitingV == true) {
    centerNumber.textContent = "0"

    let TimeV = 0.01;
    let RandomV = RandomF(0, 99);

    let RandomAddV = RandomV / 30;
    let Value = 0;

    let P1V = leftV.value;
    let P2V = rightV.value;

    (async () => {

      WaitingV = false;
      for (let x = 1; x <= 30; x++) {
        Value += RandomAddV
        centerNumber.textContent = String(Math.floor(Value))

        await wait(TimeV);
        TimeV = TimeV + 0.007;
      }

      centerNumber.textContent = RandomV
      ChooseWinner(RandomV, P1V, P2V)

    })();
  }
});