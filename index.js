const RUNNING = 'running'
const STOP = 'stop'

let gameStatus = RUNNING;
const table = $('table tr');

const playerOneColor = 'rgb(86, 151, 255)';
const playerTwoColor = 'rgb(237, 45, 73)';
const initialColor = 'rgb(128, 128, 128)';

const playerOneName = prompt('Player One: Enter your name? (You will be Blue)');
const playerTwoName = prompt('Player Two: Enter your name? (You will be Red)');

let currentPlayer = 1;
let currentPlayerName = playerOneName;
let currentColor = playerOneColor;

function changeColor(rowIndex, colIndex, color) {
    return table.eq(rowIndex).find('td').eq(colIndex).css('background-color', color);
}

function getCurrentColor(rowIndex, colIndex) {
    return table.eq(rowIndex).find('td').eq(colIndex).css('background-color');
}

function getBottomRowIndex(colIndex) {
    const initialRowIndex = 0;

    for(let rowIndex = 5; rowIndex >= initialRowIndex; rowIndex--) {
        const color = getCurrentColor(rowIndex, colIndex);

        if (color === initialColor) {
            return rowIndex;
        }
    }
}

function checkColorMatch(firstColor, secondColor, thirdColor, fourthColor) {
    return (
        firstColor === secondColor &&
        firstColor === thirdColor &&
        firstColor === fourthColor &&
        firstColor !== initialColor &&
        firstColor != undefined
    );
}

function checkHorizontalMatch() {
    const numOfColsToBeChecked = 4;
    const numOfRows = 6;

    for (let rowIndex = 0; rowIndex < numOfRows; rowIndex++) {
      for (let colIndex = 0; colIndex < numOfColsToBeChecked; colIndex++) {
        const firstColor = getCurrentColor(rowIndex, colIndex);
        const secondColor = getCurrentColor(rowIndex, colIndex+1);
        const thirdColor = getCurrentColor(rowIndex, colIndex+2);
        const fourthColor = getCurrentColor(rowIndex, colIndex+3);

        const isColorMatched = checkColorMatch(
            firstColor,
            secondColor,
            thirdColor,
            fourthColor
        )

        if (isColorMatched) {
            return true;
        }
      }  
    }
}

function checkVerticalMatch() {
    const numOfCols = 7;
    const numOfRowsToBeChecked = 3;

    for (let colIndex = 0; colIndex < numOfCols; colIndex++) {
        for (let rowIndex = 0; rowIndex < numOfRowsToBeChecked; rowIndex++) {
            const firstColor = getCurrentColor(rowIndex, colIndex);
            const secondColor = getCurrentColor(rowIndex+1, colIndex);
            const thirdColor = getCurrentColor(rowIndex+2, colIndex);
            const fourthColor = getCurrentColor(rowIndex+3, colIndex);

            const isColorMatched = checkColorMatch(
                firstColor,
                secondColor,
                thirdColor,
                fourthColor
            )

            if (isColorMatched) {
                return true;
            }
        }
    }
}

function checkDiagonalMatch() {
    const numOfColsToBeChecked = 4;
    const numOfRows = 6;

    for (let colIndex = 0; colIndex < numOfColsToBeChecked; colIndex++) {
        for (let rowIndex = 0; rowIndex < numOfRows; rowIndex++) {
            if (rowIndex < 3) {
                const firstColor = getCurrentColor(rowIndex, colIndex);
                const secondColor = getCurrentColor(rowIndex+1, colIndex+1);
                const thirdColor = getCurrentColor(rowIndex+2, colIndex+2);
                const fourthColor = getCurrentColor(rowIndex+3, colIndex+3);
    
                const isColorMatched = checkColorMatch(
                    firstColor,
                    secondColor,
                    thirdColor,
                    fourthColor
                )

                if (isColorMatched) {
                    return true;
                }
            } else {
                const firstColor = getCurrentColor(rowIndex, colIndex);
                const secondColor = getCurrentColor(rowIndex-1, colIndex+1);
                const thirdColor = getCurrentColor(rowIndex-2, colIndex+2);
                const fourthColor = getCurrentColor(rowIndex-3, colIndex+3);
    
                const isColorMatched = checkColorMatch(
                    firstColor,
                    secondColor,
                    thirdColor,
                    fourthColor
                )
                
                if (isColorMatched) {
                    return true;
                }
            }
        }
    }
}

function changeCurrentPlayerAttributes() {
    if (currentPlayer === 1) {
        currentPlayerName = playerOneName;
        currentColor = playerOneColor;
    } else {
        currentPlayerName = playerTwoName;
        currentColor = playerTwoColor;
    }
}

function checkForMatch() {
    const isMatched = checkHorizontalMatch() ||
        checkVerticalMatch() ||
        checkDiagonalMatch();

    if (isMatched) {
        $('h1').text(currentPlayerName + ' you have won!');
        $('h2').fadeOut('fast');
        $('h3').fadeOut('fast');

        gameStatus = STOP;
    } else {
        currentPlayer *= -1;
        changeCurrentPlayerAttributes();
    
        $('h3').text(currentPlayerName + ' it\'s your turn');
    }
}

$('h3').text(playerOneName + ' it is your turn, pick a column to drop in!');

$('.board .chip').on('click', function() {
    if (gameStatus === STOP) {
        return;
    }

    const colIndex = $(this).index();
    const bottomRowIndex = getBottomRowIndex(colIndex);

    if (bottomRowIndex === undefined) {
        return;
    }

    changeColor(bottomRowIndex, colIndex, currentColor);
    checkForMatch();
})
