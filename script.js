let game = document.querySelector(".game");
let boxes = document.querySelectorAll(".box");
let resetbtn = document.querySelector(".reset-btn");
let message = document.querySelector(".msg");
let winnerIs = document.querySelector(".winner");
let newGamebtn= document.querySelector(".newgame-btn");

let turnO = true; // O's first turn
let count = 0;

// storing all the winning patterns
const winPatterns = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

// adding on-click event listener to each box
boxes.forEach((box) => {
    box.addEventListener("click", () => {
        if (turnO) { // O's turn
            box.innerText = "O";
            turnO = false;
            box.disabled = true;
            count++;
        } else { // X's turn
            box.innerText = "X";
            turnO = true;
            box.disabled = true;
            count++;
        }
        // checking the winner after each turn
        checkWinner();
        // if all boxes are clicked, game ends in draw
        if (count === 9) {
            gameDraw();
        }
    });
});

const checkWinner = () => {
    for (let pattern of winPatterns) {
        let pos1Val = boxes[pattern[0]].innerText;
        let pos2Val = boxes[pattern[1]].innerText;
        let pos3Val = boxes[pattern[2]].innerText;

        if (pos1Val != "" && pos2Val != "" && pos3Val != "") {
            if (pos1Val === pos2Val && pos2Val == pos3Val) {
                // show winner message and new game button
                showWinner(pos1Val);
            }
        }
    }
}

const showWinner = (winner) => {
    winnerIs.innerText = `Congratulations, winner is ${winner}`;
    message.classList.remove("hide");
    resetbtn.classList.add("hide");
    // disable all the boxes
    disableAllBoxes();
}

const gameDraw = () => {
    winnerIs.innerText = `Game ended in a draw`;
    message.classList.remove("hide");
    resetbtn.classList.add("hide");
    disableAllBoxes();
}

const disableAllBoxes = () => {
    for (let box of boxes) {
        box.disabled = true;
    }
}

// reset the game on clicking the reset or new game button
const resetGame = () => {
    turnO = true;
    count = 0;
    // enable all the boxes again
    enableAllBoxes();
    message.classList.add("hide");
    resetbtn.classList.remove("hide");
}

const enableAllBoxes = () => {
    for (let box of boxes) {
        box.disabled = false;
        box.innerText = "";
    }
}

resetbtn.addEventListener("click", resetGame);
newGamebtn.addEventListener("click", resetGame);