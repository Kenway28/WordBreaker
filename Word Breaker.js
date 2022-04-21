letterBtn = document.querySelectorAll(".row-button:not(.clear, .enter)");
btnEnter = document.querySelector(".enter");
btnClear = document.querySelector(".clear");
game = document.querySelector(".game");

let levels = document.querySelectorAll(".level-list li");
let Vlist = "last games hospital visited accept";
let theWord;
levels.forEach((lvl) => {
  lvl.addEventListener("click", () => {
    levels.forEach((lv) => {
      lv.classList.remove("level");
    });
    lvl.classList.add("level");
    generateGame(lvl.innerHTML);
  });
});
function generateGame(size) {
  theWord = Vlist.split(" ")
    .filter((e) => {
      if (e.length == size) {
        return e;
      }
    })
    .join("");
  console.log(theWord);
  game.innerHTML = "";

  for (let i = 0; i < 7; i++) {
    let line = document.createElement("div");
    for (let j = 0; j < size; j++) {
      let letter = document.createElement("span");
      letter.className = "letter";
      line.className = "line";
      line.appendChild(letter);
    }
    game.appendChild(line);
  }
}
window.onload = () => {
  generateGame(4);
};


document.body.addEventListener("keydown", (event) => {
  let row = game.querySelector(".line:not(.locked)");

  if (
    event.key.match(/[a-z]/) &&
    event.key != "Enter" &&
    event.key != "Backspace"
  ) {
    for (let i = 0; i < Array.from(row.children).length; i++) {
      if (Array.from(row.children)[i].innerHTML == "") {
        Array.from(row.children)[i].innerHTML = event.key;
        break;
      }
    }
  }
  if (event.key == "Backspace") {
    for (let i = Array.from(row.children).length - 1; i > -1; i--) {
      if (Array.from(row.children)[i].innerHTML != "") {
        Array.from(row.children)[i].innerHTML = "";
        break;
      }
    }
  }
  if (event.key == "Enter") {
    let emptyLetter = row.querySelectorAll(".letter:empty").length;
    if (emptyLetter == 0) {
      row.classList.add("locked");
      let boxes = Array.from(row.children);

      boxes.forEach((box) => {
        box.style.transitionDelay = `${0.05 * boxes.indexOf(box)}s`;
        if (theWord.includes(box.innerHTML)) {
          if (theWord.charAt(boxes.indexOf(box)) === box.innerHTML) {
            box.className = "letter match";
          } else {
            box.className = "letter notPlaced";
          }
        } else {
          box.className = "letter noMatch";
        }
        letterBtn.forEach((letter) => {
          if (letter.innerHTML == box.innerHTML) {
            letter.className = `row-button ${box.className.split(" ")[1]}`;
          }
        });
      });
    }
  }
});
