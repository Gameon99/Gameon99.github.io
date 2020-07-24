/********************************************************
  Declaration of global variables
*/
var Board;
var dummy_Board;
var undo_button_active;
var hint_button_active;
var hint_cell;
var game_end;
var game_start;
const Player1 = 'O';
const Player2 = 'X';
const winSets = [
	[0, 1, 2],
	[3, 4, 5],
	[6, 7, 8],
	[0, 3, 6],
	[1, 4, 7],
	[2, 5, 8],
	[0, 4, 8],
	[6, 4, 2]
]

const cells = document.querySelectorAll('.cell');
"use strict";

var timer;
var timeLeft;
var label;

function countdown() 
{
  if (timeLeft) 
  {
    label.innerHTML = timeLeft;
    timeLeft--;
    timer = setTimeout(countdown, 1000);
  } 
  else 
  {
  	label.innerHTML = 0;
	for (var i = 0; i < cells.length; i++) 
	{
		cells[i].removeEventListener('click', turnClick, false);
	}
	declareWinner("You lose.");
    timer = undefined;
  }
}

function takeMove() {
  // timer will only be undefined if the game is not started
  if (typeof(timer) === "undefined") 
  {
    timeLeft = 10;
  } 
  else 
  {
    clearTimeout(timer);
    timeLeft = 10;
  }
  if(game_end==0)
  	countdown();
}

function init() 
{
  label = document.getElementById("label");
  takeMove();
}

document.addEventListener("DOMContentLoaded", init, false);
startGame();
function startGame() 
{
	document.querySelector(".endgame").style.display = "none";
	Board = Array.from(Array(9).keys());
	dummy_Board=Array.from(Array(9).keys());
	undo_button_active=0;
	hint_button_active=0;
	hint_cell=0;
	game_end=0;
	game_start=0;
	document.querySelector(".undo").style.backgroundColor = "grey";
	document.querySelector(".hint").style.backgroundColor = "green";
	for (var i = 0; i < cells.length; i++) 
	{
		cells[i].innerText = '';
		cells[i].style.removeProperty('background-color');
		cells[i].addEventListener('click', turnClick, false);
	}
	turn(bestSpot(),Player2);
	takeMove();
}
function turnClick(square) 
{
	for(var i = 0; i<9 ; i++)
	{
		dummy_Board[i]=Board[i];
	}
	if (typeof Board[square.target.id] == 'number') 
	{
		turn(square.target.id, Player1);
		document.querySelector(".undo").style.backgroundColor = "green";
		document.querySelector(".hint").style.backgroundColor = "green";
		game_start=1;
		takeMove();
		if (!checkWin(Board, Player1) && !checkTie()) 
		{
			turn(bestSpot(), Player2);
			takeMove();
		}
	}
}

function turn(squareId, player) 
{
	undo_button_active=1;
	if(hint_button_active==1)
	{
		document.getElementById(hint_cell).style.backgroundColor = "deepskyblue";
		hint_button_active=0;
	}
	Board[squareId] = player;
	document.getElementById(squareId).innerText = player;
	document.getElementById(squareId).style.backgroundColor = "deepskyblue";
	let gameWon = checkWin(Board, player)
	if (gameWon) gameOver(gameWon)
	checkTie();
}

function checkWin(board2, player) 
{
	let plays = board2.reduce((a, e, i) =>
		(e === player) ? a.concat(i) : a, []);
	let gameWon = null;
	for (let [index, win] of winSets.entries()) {
		if (win.every(elem => plays.indexOf(elem) > -1)) {
			gameWon = {index: index, player: player};
			break;
		}
	}
	return gameWon;
}

function gameOver(gameWon) {
	for (let index of winSets[gameWon.index]) 
	{
		document.getElementById(index).style.backgroundColor =gameWon.player == Player1 ? "green" : "yellow";
	}
	for (var i = 0; i < cells.length; i++) {
		cells[i].removeEventListener('click', turnClick, false);
	}
	declareWinner(gameWon.player == Player1 ? "You win!" : "You lose.");
}

function declareWinner(who)
 {
 	game_end=1;
	document.querySelector(".endgame").style.display = "block";
	document.querySelector(".endgame .text").innerText = who;
	document.querySelector(".undo").style.backgroundColor = "grey";
	document.querySelector(".hint").style.backgroundColor = "grey";
}

function emptySquares() {
	return Board.filter(s => typeof s == 'number');
}

function bestSpot() 
{
	return minimax(Board, Player2).index;
}

function checkTie() {
	if (emptySquares().length == 0) {
		for (var i = 0; i < cells.length; i++) 
		{
			cells[i].style.backgroundColor = "violet";
			cells[i].removeEventListener('click', turnClick, false);
		}
		declareWinner("Tie Game!")
		return true;
	}
	return false;
}

function minimax(newBoard, player) {
	var availSpots = emptySquares();

	if (checkWin(newBoard, Player1)) {
		return {score: 10};
	} else if (checkWin(newBoard, Player2)) {
		return {score: -10};
	} else if (availSpots.length === 0) {
		return {score: 0};
	}
	var moves = [];
	for (var i = 0; i < availSpots.length; i++) {
		var move = {};
		move.index = newBoard[availSpots[i]];
		newBoard[availSpots[i]] = player;

		if (player == Player2) {
			var result = minimax(newBoard, Player1);
			move.score = result.score;
		} else {
			var result = minimax(newBoard, Player2);
			move.score = result.score;
		}

		newBoard[availSpots[i]] = move.index;

		moves.push(move);
	}

	var bestMove;
	if(player === Player1) {
		var bestScore = -10000;
		for(var i = 0; i < moves.length; i++) {
			if (moves[i].score > bestScore) {
				bestScore = moves[i].score;
				bestMove = i;
			}
		}
	} else {
		var bestScore = 10000;
		for(var i = 0; i < moves.length; i++) {
			if (moves[i].score < bestScore) {
				bestScore = moves[i].score;
				bestMove = i;
			}
		}
	}

	return moves[bestMove];
}

/****************************************************************
 This function analyses the moves of the opponent player and suggests the next best move.
*/
function hint()
{
	if(game_end==0)
	{
		hint_cell=minimax(Board , Player1).index;
		document.getElementById(hint_cell).style.backgroundColor = "pink";
		document.querySelector(".hint").style.backgroundColor = "grey";
		hint_button_active=1;
	}
}

/***************************************************************
 * This function is used to undo the move that is just played.
 */
function undo()
{
	if(game_end===0 && game_start==1)
	{
		if(undo_button_active==1)
		{
			timeLeft=10;
			document.querySelector(".undo").style.backgroundColor = "grey";
			document.querySelector(".hint").style.backgroundColor = "green";
			document.getElementById(hint_cell).style.backgroundColor = "deepskyblue";
			for(var i = 0; i<9 ; i++)
			{
				if(Board[i] != dummy_Board[i])
				{
					Board[i] = dummy_Board[i];
					document.getElementById(i).innerText ='';
				}
			}
			undo_button_active=0;
		}
	}
}