//roll number initialized to 0
var rollNumber = 0;

//round number initialized to 1
var roundNumber = 1;

//array for all dice currently in play array initialized to an empty array
var diceAnywhere = [];

//array for the dice on the table initialized to an empty array
var diceOnTable = [];

//array for the selected dice initialized to an empty array
var diceSelected = [];

//variable to store the current die index value for selection/deselection
var currentDieIndex;

//array that stores the indexes for the dice, initialized to values 0,1,2,3,4  
var dieIndexHolder = [0, 1, 2, 3, 4];

//variable to reference the selected dice elements 
var selectedDiceElements;

// DOM elements

//constant set to document, getElementById, passing argument diceArea
const diceArea = document.getElementById("diceArea");

//constant set to document, getElementById, passing argument selectedDiceArea 
const selectedDiceArea = document.getElementById("selectedDiceArea");

//constant set to document, getElementById, passing argument rollButton
const rollButton = document.getElementById("rollDiceButton");

//constant set to document, getElementById, passing argument round-number
const roundNumberElement = document.getElementById("round-number");

//constant set to document, getElementById, passing argument site-wrapper
const siteWrapper = document.getElementById("site-wrapper");

//constant set to document, getElementById, passing argument site-canvas
const siteCanvas = document.getElementById("site-canvas");

//constant set to document, getElementsByClassName, passing argument speculative-score
const speculativeScoreTab = document.getElementsByClassName("speculative-score");

// Add an event listener to button rollButton
rollButton.addEventListener('click', rollDie, false);

checkRollNumber();

//return a randomized number between 1 - 6
function randomizeDie()
{
	// return a randomized number between 1 - 6
    return Math.floor(Math.random() * 6) + 1;
}

//function to update the dice roll button status based on current roll number
function checkRollNumber()
{
    switch(rollNumber) {
        case 0: // roll 0
            rollButton.className = "";
            rollNumber++;
            break;
        case 1: // roll 1
            rollButton.className = "roll-1";
            rollNumber++;
            break;
        case 2: // roll 2
            rollButton.className = "roll-2";
            rollNumber++;
            break;
        case 3: // roll 3
            rollButton.className = "roll-3";
            rollButton.removeEventListener("click", rollDie, false);
            rollNumber++;
            setTimeout(function() {
                rollButton.className = "roll-3 disabled";
            }, 500);
            break;
        default:
            console.log("Roll number error");
            break;

    }
}

//function to roll the dice
function rollDie()
{
	//update roll number indicator on the roll button
    checkRollNumber();
    
	//if roundNumber is identical to 1, update the round number indicator visibility to visible  
    if(roundNumber === 1) {
        document.getElementById("round-number-wrapper").className = "visible";
    } 

    //clear the dice table
    document.getElementById("diceArea").innerHTML = "";

    
    //update array diceOnTable
    diceOnTable = [];


	//store the number of dice to roll
    var amountToRoll = 5 - diceSelected.length;

    
    //iterate through number of dice to roll
    for(let i = 0; i < amountToRoll; i++) {
        var diceRoll = randomizeDie();
        diceOnTable.push(diceRoll);
    }

	//display the dice
    drawDiceOnTable();
    
    //reset dice in play array
    updateDiceAnywhere();
    
    //update score table to show correct values on scores
    updateScoreTable();
}

//function to draw the dice on table after a new roll
function drawDiceOnTable()
{
    //update array dieIndexHolder
    dieIndexHolder = [0, 1, 2, 3, 4];


	//iterate through diceOnTable 
    for(let i = 0; i < diceOnTable.length; i++) {
        drawDieOnTable(diceOnTable[i], dieIndexHolder[i]);
    }

    updateSelectedDiceElements();

    //assign new indexes for left over dice from the previous roll
    if(selectedDiceElements) {
        for(let i = 0; i < selectedDiceElements.length; i++) {
            selectedDiceElements[i].setAttribute("die-index", diceOnTable.length + i);
        }
    }
}

//function to remove die from selected dice tray
function removeDieSelection()
{
    //create diceValue
    var diceValue = parseInt(this.getAttribute("die-value"), 10);

    //update currentDieIndex
    currentDieIndex = parseInt(this.getAttribute("die-index"), 10);
	
    //declare position
    var position = diceSelected.indexOf(diceValue);
	
    //update diceSelected
    diceSelected.splice(position, 1);
	
    //update diceOnTable
    diceOnTable.push(diceValue);

    //call drawDieOnTable
    drawDieOnTable(diceValue, currentDieIndex);

    //remove the selected die from the DOM
    this.parentNode.removeChild(this);

    updateDiceAnywhere();
	
    updateScoreTable();
}

//function to draw the selected die on selected dice tray
function drawSelectedDice(value, index)
{
	//declare dieDiv
    var dieDiv = document.createElement("div");

    //add to dieDiv
    dieDiv.className += 'die-selected';
	
    //append to selectedDiceArea
	selectedDiceArea.appendChild(dieDiv);

    dieDiv.setAttribute("die-value", value);

    dieDiv.setAttribute("die-index", index);

    dieDiv.addEventListener("click", removeDieSelection, false);
}

//function to pick a die from table
function selectDieFromTable()
{
	//declare diceValue
    var diceValue = parseInt(this.getAttribute("die-value"), 10);

	//update currentDieIndex
    currentDieIndex = parseInt(this.getAttribute("die-index"), 10);
	
    //declare position
    var position = diceOnTable.indexOf(diceValue);
	
    //update diceOnTable
    diceOnTable.splice(position, 1);
	
    //remove the selected die from the DOM
    this.parentNode.removeChild(this);

    diceSelected.push(diceValue);

	drawSelectedDice(diceValue, currentDieIndex);

    updateDiceAnywhere();

    updateScoreTable();
}

//function to draw die
function drawDieOnTable(value, index)
{
	//declare dieDiv
    var dieDiv = document.createElement("div");
	
    //add to dieDiv
    dieDiv.className += "die";
    
    //append to diceArea
    diceArea.appendChild(dieDiv);
    
    dieDiv.setAttribute("die-value", value);

    dieDiv.setAttribute("die-index", index);

    //add event listener for dieDiv
    dieDiv.addEventListener("click", selectDieFromTable, false);
}

function hideSpeculativeScores()
{
	//iterate through speculativeScoreTab array
    //set the attribute style.display equal to none
    for(let i = 0; i < speculativeScoreTab.length; i++) {
        speculativeScoreTab[i].style.display = "none";
    }
}

function updateRoundNumber()
{
	//update roundNumberElement
    roundNumberElement.innerHTML = Math.min(roundNumber, 13);
}

function resetTable()
{
	//update diceOnTable
    diceOnTable = [];

    //update diceSelected
    diceSelected = [];
	
    //update dieIndexHolder
    dieIndexHolder = [0, 1, 2, 3, 4];
    
    //call updateDiceAnywhere to reset dice in play array
    updateDiceAnywhere()
    
    // set rollNumber to 0
    rollNumber = 0;
    
    checkRollNumber();

    hideSpeculativeScores();

    //call updateRoundNumber to reset dice in play array
    updateRoundNumber();
    
    //add event listener to rollButton
    rollButton.addEventListener("click", rollDie, false);
	
    //update selectedDiceArea innerHTML
    selectedDiceArea.innerHTML = "";
    
    //update diceArea innerHTML
    diceArea.innerHTML = "";
}

function resetGame()
{
    // reset game with window.location
    window.location.reload(false);

}

function updateSelectedDiceElements()
{
    if(selectedDiceArea.innerHTML !== "") {
        selectedDiceElements = document.getElementsByClassName("die-selected");
    }

}

function updateDiceAnywhere()
{
    if(diceSelected) {
        diceAnywhere = diceOnTable.concat(diceSelected);
    }
    else {
        diceAnywhere = diceOnTable;
    }
}