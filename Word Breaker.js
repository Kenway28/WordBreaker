letterBtn = document.querySelectorAll(".row-button:not(.clear, .enter)");
btnEnter = document.querySelector(".enter");
btnClear = document.querySelector(".clear");
game = document.querySelector(".game");
let levels = document.querySelectorAll(".level-list li");

window.onload = function () {
  let Mode = JSON.parse(localStorage.getItem("WordLe")).mode;
  let Level = JSON.parse(localStorage.getItem("WordLe")).level;
  if (Mode === "dark") {
    toggle.classList.toggle("active");
    document.body.classList.toggle("dark");
  }
  if (Level != "") {
 
    levels.forEach((lvl) => {
      lvl.classList.remove("level");
      if (lvl.innerHTML == Level) {
        lvl.classList.add("level");
        generateGame(+Level);
      }
    });
  } else {
    generateGame(4);
  }
};
/***************** Settings */
let settings = {
  mode: "",
  level: "",
};
let toggle = document.getElementById("toggle");
let indicator = document.querySelector(".indicator");
toggle.onclick = function () {
  document.body.classList.toggle("dark");
  toggle.classList.toggle("active");
  settings.mode = document.body.className;
  saveSettings(settings);
};

function saveSettings(settings) {
  localStorage.setItem("WordLe", JSON.stringify(settings));
}
let WordList = "last gone games hospital visited accept reload";
let theWord;
let words;
levels.forEach((lvl) => {
  lvl.addEventListener("click", () => {
    levels.forEach((lv) => {
      lv.classList.remove("level");
    });
    lvl.classList.add("level");
    settings.level = lvl.innerHTML;
    saveSettings(settings);
    console.log(settings);
    generateGame(lvl.innerHTML);
  });
});
function generateGame(size) {
  words = WordList.split(" ").filter((e) => {
    if (e.length == size) {
      return e;
    }
  });
  theWord = words[Math.floor(Math.random() * words.length)];
  let wordIndex = words.indexOf(theWord);
  words.splice(wordIndex, 1);
  console.log(theWord);
  game.innerHTML = "";

  for (let i = 0; i < 7; i++) {
    let line = document.createElement("div");
    line.className = "line";
    for (let j = 0; j < size; j++) {
      let letter = document.createElement("span");
      letter.className = "letter";
      line.appendChild(letter);
    }
    game.appendChild(line);
  }
}

document.body.addEventListener("keydown", (event) => {
  let row = game.querySelector(".line:not(.locked)");

  if (event.key.match(/[a-z]/) && event.key.length == 1) {
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
    if (row.querySelectorAll(".letter.match").length == theWord.length) {
      setTimeout(() => {
        game.innerHTML = "finished";
        // generateGame(document.querySelector(".level").innerHTML);
      }, 2000);
    } 
    console.log(row.querySelectorAll(".letter.match").length);
  }
});
