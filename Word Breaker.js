let word = document.querySelector(".word");
let history = document.querySelector(".history");
let check = document.querySelector(".check");
const words = [
  // "Hello",
  // "Lotfi",
  "Programming",
  // "Code",
  "Javascript",
  // "Town",
  "Country",
  //   "Testing",
  // "Youtube",
  //   "Linkedin",
  // "Twitter",
  //   "Github",
  // "Leetcode",
  "Internet",
  //   "Python",
  //   "Scala",
  //   "Destructuring",
  // "Paradigm",
  //   "Styling",
  //   "Cascade",
  //   "Documentation",
  //   "Coding",
  //   "Funny",
  //   "Working",
  //   "Dependencies",
  //   "Task",
  // "Runner",
  //   "Roles",
  // "Test",
  //   "Rust",
  //   "Playing",
];

let theWord = "";

window.onload = () => {
  generateWord();
};
function generateWord() {
  theWord = words[Math.floor(Math.random() * words.length)];
  let wordIndex = words.indexOf(theWord);
  word.innerHTML = "";
  history.innerHTML = "";
  words.splice(wordIndex, 1);
  generateBoxs(theWord);
}
function generateBoxs(randomWord) {
  console.log(randomWord);
  for (let index = 0; index < randomWord.length; index++) {
    let box = document.createElement("span");
    box.contentEditable = "true";
    box.className = "box";
    word.appendChild(box);
  }
  let input = document.querySelectorAll(".box");

  for (let i = 0; i < input.length; i++) {
    input[i].onkeyup = function (event) {
      if (input[i].innerHTML.length == 1) {
        event.preventDefault();
        if (input[i + 1] === input[input.length]) {
        } else {
          input[i + 1].focus();
        }
      }
    };
  }
  word.firstElementChild.focus();
  check.disabled = false;
}
check.addEventListener("click", (event) => {
  let boxes = Array.from(document.querySelectorAll(".word .box"));
  theWord = theWord.toLowerCase();

  boxes.forEach((box) => {
    if (theWord.includes(box.innerHTML)) {
      if (theWord.charAt(boxes.indexOf(box)) === box.innerHTML) {
        box.className = "box match";
        box.contentEditable = "false";
      } else {
        box.className = "box notPlaced";
      }
    } else {
      box.className = "box noMatch";
    }
    if (box.innerHTML == "") {
      box.className = "box";
    }
  });
  let clone = word.cloneNode(true);
  clone.className = "historyWord";
  Array.from(clone.childNodes).forEach((element) => {
    element.contentEditable = false;
  });
  let match = document.querySelectorAll(".word .box.match");

  if (match.length == theWord.length) {
    check.disabled = true;
    if (words.length > 0) {
      setTimeout(() => {
        generateWord();
      }, 1500);
    } else {
      event.preventDefault();
      document.body.innerHTML = "Done";
    }
  } else {
    history.prepend(clone);
    boxes.forEach((box) => {
      box.className = "box";
      box.innerHTML = "";
      box.contentEditable = true;
      boxes[0].focus();
    });
  }
});
