var numSquares = 6;
var colors = generateRandomColors(numSquares);
var squares = document.querySelectorAll(".square");
var pickedColor = pickColor();
var colorDisplay = document.getElementById("colorDisplay");
var messageDisplay = document.querySelector("#message");
var h1 = document.querySelector("h1");
var resetButton = document.querySelector("#reset");
var easyBtn = document.querySelector("#easyBtn");
var hardBtn = document.querySelector("#hardBtn");


easyBtn.addEventListener("click", function(){
	hardBtn.classList.remove("selected");
	easyBtn.classList.add("selected");

	numSquares = 3;
	colors = generateRandomColors(numSquares);
	pickedColor = pickColor();
	colorDisplay.textContent = pickedColor;

	for(var i = 0; i < squares.length; i++){
		if(colors[i]){
			squares[i].style.backgroundColor = colors[i]; 
		}else{
			squares[i].style.display = "none";
		}
	}
})

hardBtn.addEventListener("click", function(){
	easyBtn.classList.remove("selected");
	hardBtn.classList.add("selected");

	numSqares = 6;
	colors = generateRandomColors(numSquares);
	pickedColor = pickColor();
	colorDisplay.textContent = pickedColor;

	for(var i = 0; i < squares.length; i++){
		
			squares[i].style.backgroundColor = colors[i]; 
	
			squares[i].style.display = "block";
		}
	})

reset.addEventListener("click", function(){
	//geereate all new colors
	colors = generateRandomColors(numSquares);
	//pick a new random color from array
	pickedColor = pickColor();
	//change colorDisplay to match picked color

	messageDisplay.textContent = "";
	this.textContent = "New Colors";

	colorDisplay.textContent = pickedColor;
	//change colors of squares
	for(var i = 0;i < squares.length; i++){
		squares[i].style.backgroundColor = colors[i];
	}
	h1.style.backgroundColor = "steelblue";
})

pickedColor = "4"
clickedColor = "2"

colorDisplay.textContent = pickedColor;

for(var i = 0; i < squares.length; i++){

	//add initial colors
	squares[i].style.backgroundColor = colors[i];

	//add click listeners to squares
	squares[i].addEventListener("click", function(){

		//grab color of clicked square
		var clickedColor = this.style.backgroundColor;

		//compare color to pickedColor 
		if(clickedColor === pickedColor){
			messageDisplay.textContent = "Correct!";
			changeColors(clickedColor);
			h1.style.backgroundColor = clickedColor;
			resetButton.textContent = "Play Again";

		} else{
			this.style.backgroundColor = "#232323"; 
			messageDisplay.textContent = "Try Again"; 
		}
	});
}

function changeColors(color){

	//loop through all squares
	for(var i = 0; i < squares.length; i++){

		//change each color to match given color
		squares[i].style.backgroundColor = color;
	}
}

function pickColor(){
	var random = Math.floor(Math.random() * colors.length);
	return colors[random];
}

function generateRandomColors(num){
	//make an array
	var arr = []

	//repeat num time
	for(var i = 0; i < num; i++){

		//get random color and push into array
		arr.push(randomColor());
	}

	//return array
	return arr;
}

function randomColor(){

	//pick a "red form 0 - 255"
	var r = Math.floor(Math.random() * 256); = 123

	//pick a "green form 0 - 255"
	var g = Math.floor(Math.random() * 256); = 200

	//pick a "blue form 0 - 255"
	var b = Math.floor(Math.random() * 256); = 150

	return "rgb(" + r + ", " + g + ", " + b + ")";
}