letterBtn = document.querySelectorAll(".row-button:not(.clear, .enter)");
btnEnter = document.querySelector(".enter");
btnClear = document.querySelector(".clear");
game = document.querySelector(".game");
window.onload = () => {
  generateGame();
};

// let Vlist =
//   "variety various vehicle version victims victory village virtual visible visited vitamin vaccine vaginal vampire variant varsity varying veggies verdict veteran vicious villain violate viruses visions visuals volcano";
let Vlist = "last games hospital visited guns cottage";
let theWord =
  Vlist.split(" ")[Math.floor(Math.random() * Vlist.split(" ").length)];

console.log(theWord);

// letterBtn.forEach((e) => {
//   e.addEventListener("click", () => {
//     let row = document.querySelector(".line:not(.locked)");
//     // console.log(row);
//     for (let i = 0; i < Array.from(row.children).length; i++) {
//       if (Array.from(row.children)[i].innerHTML == "") {
//         // console.log(i);
//         Array.from(row.children)[i].innerHTML = e.innerHTML;
//         break;
//       }
//     }
//   });
// });

// btnEnter.addEventListener("click", () => {
//   let row = document.querySelector(".line:not(.locked)");
//   let emptyLetter = row.querySelectorAll(".letter:empty").length;
//   if (emptyLetter == 0) {
//     row.classList.add("locked");
//     // console.log(row.querySelectorAll(".letter:empty").length);
//     let boxes = Array.from(row.children);

//     boxes.forEach((box) => {
//       box.style.transitionDelay = `${0.1 * boxes.indexOf(box)}s`;
//       if (theWord.includes(box.innerHTML)) {
//         if (theWord.charAt(boxes.indexOf(box)) === box.innerHTML) {
//           box.className = "letter match";
//         } else {
//           box.className = "letter notPlaced";
//         }
//       } else {
//         box.className = "letter noMatch";
//       }
//       letterBtn.forEach((letter) => {
//         if (letter.innerHTML == box.innerHTML) {
//           // console.log(letter.className);
//           letter.className = `row-button ${box.className.split(" ")[1]}`;
//           // console.log(letter.className);
//         }
//       });
//     });
//   } else {
//     alert("To Short");
//   }
// });
// btnClear.addEventListener("click", () => {
//   let row = document.querySelector(".line:not(.locked)");
//   for (let i = Array.from(row.children).length - 1; i > -1; i--) {
//     if (Array.from(row.children)[i].innerHTML != "") {
//       Array.from(row.children)[i].innerHTML = "";
//       break;
//     }
//   }
// });

document.body.addEventListener("keydown", (event) => {
  let row = document.querySelector(".line:not(.locked)");
  // console.log(event);
  if (event.key.match(/[a-z]/) && event.key != "Enter" && event.key != "Backspace") {
    for (let i = 0; i < Array.from(row.children).length; i++) {
      if (Array.from(row.children)[i].innerHTML == "") {
        Array.from(row.children)[i].innerHTML = event.key;
        break;
      }
    }
  }
  if (event.key == "Backspace") {
    // let row = document.querySelector(".line:not(.locked)");
    for (let i = Array.from(row.children).length - 1; i > -1; i--) {
      if (Array.from(row.children)[i].innerHTML != "") {
        Array.from(row.children)[i].innerHTML = "";
        break;
      }
    }
  }
  if (event.key == "Enter") {
    // let row = document.querySelector(".line:not(.locked)");
    let emptyLetter = row.querySelectorAll(".letter:empty").length;
    if (emptyLetter == 0) {
      row.classList.add("locked");
      // console.log(row.querySelectorAll(".letter:empty").length);
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
            // console.log(letter.className);
            letter.className = `row-button ${box.className.split(" ")[1]}`;
            // console.log(letter.className);
          }
        });
      });
    }
  }
});

function generateGame() {
  for (let i = 0; i < 7; i++) {
    let line = document.createElement("div");

    for (let j = 0; j < theWord.split("").length; j++) {
      let letter = document.createElement("span");
      letter.className = "letter";
      line.className = "line";
      line.appendChild(letter);
    }
    game.appendChild(line);
  }
}
