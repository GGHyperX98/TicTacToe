var btn = "";
var symbol = "X";
var click_count = 0;
var player1 = "";
var player2 = "";
var counter1 = 1;
var counter2 = 1;



// variables - Strings declare
var draw1 = "Wer mit einem starken Gedanken spielt, kann oft schon mit einem unentschieden sehr zufrieden sein."
var draw2 = "Auch ein unentschieden ist ein Sieg, weil man nicht verloren hat."
var draw3 = "Einigen wir uns auf ein unentschieden."
// store variables in a list
var array_draw = [draw1, draw2, draw3]
// choose random element from list
var item = array_draw[Math.floor(Math.random()*array_draw.length)]


// give IDS from HTML variables
var btn0 = document.getElementById("1");
var btn1 = document.getElementById("2");
var btn2 = document.getElementById("3");
var btn3 = document.getElementById("4");
var btn4 = document.getElementById("5");
var btn5 = document.getElementById("6");
var btn6 = document.getElementById("7");
var btn7 = document.getElementById("8");
var btn8 = document.getElementById("9");
var player1 = document.getElementById("player1");
var player2 = document.getElementById("player2");

var switchBtn = document.getElementById("switchBtn");



// mode selection

var mode = 0;

function switchMode() {
	if (mode == 0) {
  	mode = 1;
  } else {
  	mode = 0;
  }
}

// returns the choosen button

function getBtn (x, y) {
	return document.getElementById(3 * y + x + 1);
}



// change symbol (x and o)

function button(btn) {
	switchBtn.style.display = "none";
  if (btn.value == "X" || btn.value == "O") {
    	return;
  }
  click_count++;
  if (mode == 0) {
  	playerPlayer(btn);
  } else {
  	playerPC(btn);
  }
}

function playerPC(btn) {
    btn.value = "X";
    var win = checkForWin();
    if (win == true) return;
    
    symbol = "O";
    bot();
    setTimeout(function() {
    	checkForWin();
   	 	symbol = "X";
    }, 10);
}


function playerPlayer(btn) {
    if (btn.value == " ") {
        btn.value = symbol;
        checkForWin();
        if (symbol == "X") {
            symbol = "O";
        } else {
           symbol = "X";
        }
    }
}
  

function bot() {
		btn = botChooseBtn();
    btn.value = "O";
    click_count++;
}  


function checkTwoInRow(sym) {

    // check horizontally
    for (var i = 0; i < 3; i++) {
    		if (getBtn(0, i).value == sym &&
        		getBtn(0, i).value == getBtn(1, i).value) {
        		if(isEmpty(getBtn(2, i))) return getBtn(2, i);
        }
        if (getBtn(1, i).value == sym &&
        					 getBtn(1, i).value == getBtn(2, i).value) {
                   if(isEmpty(getBtn(0, i))) return getBtn(0, i);
        }
        if (getBtn(0, i).value == sym &&
        					 getBtn(0, i).value == getBtn(2, i).value) {
                   if(isEmpty(getBtn(1, i))) return getBtn(1, i);
        }
    }
    
    // check vertically
    for (var i = 0; i < 3; i++) {
    		if (getBtn(i, 0).value == sym &&
        		getBtn(i, 0).value == getBtn(i, 1).value) {
        		if(isEmpty(getBtn(i, 2))) return getBtn(i, 2);
        }
        if (getBtn(i, 1).value == sym &&
        					 getBtn(i, 1).value == getBtn(i, 2).value) {
                   if(isEmpty(getBtn(i, 0))) return getBtn(i, 0);
        }
        if (getBtn(i, 0).value == sym &&
        					 getBtn(i, 0).value == getBtn(i, 2).value) {
                   if(isEmpty(getBtn(i, 1))) return getBtn(i, 1);
        }
    }
    
    // check diagonally
    if (getBtn(0, 0).value == sym &&
    		getBtn(0, 0).value == getBtn(1, 1).value) {
        if(isEmpty(getBtn(2, 2))) return getBtn(2, 2);
    }
    if (getBtn(1, 1).value == sym &&
    					 getBtn(1, 1).value == getBtn(2, 2).value) {
        if(isEmpty(getBtn(0, 0))) return getBtn(0, 0);
    }
    if (getBtn(0, 0).value == sym &&
    					 getBtn(0, 0).value == getBtn(2, 2).value) {
        if(isEmpty(getBtn(1, 1))) return getBtn(1, 1);
    }
    if (getBtn(2, 0).value == sym &&
    					 getBtn(2, 0).value == getBtn(1, 1).value) {
        if(isEmpty(getBtn(0, 2))) return getBtn(0, 2);
		}
    if (getBtn(1, 1).value == sym &&
    				   getBtn(1, 1).value == getBtn(0, 2)) {
        if(isEmpty(getBtn(2, 0))) return getBtn(2, 0);
		}
    if (getBtn(0, 0).value == sym &&
    				   getBtn(0, 0).value == getBtn(0, 2)) {
        if(isEmpty(getBtn(1, 1))) return getBtn(1, 1);
		}
    
    return null;
}

function botChooseBtn () {
    
    if(click_count > 8) return null;
    
    // 1. if bot has got two symbols in a row, choose third field to win
    btn = checkTwoInRow("O");
    if (btn != null) return btn;
    
    // 2. if player has got two symbols in a row, prevent him from winning
    btn = checkTwoInRow("X");
    if (btn != null) return btn;
    
    if(btn!=null)alert(btn.id);
    
    // 3. if pivotal field is empty, choose it
    if (isEmpty(getBtn(1, 1))) return getBtn(1, 1);
    
    // 4. if a corner field is empty, choose it
    if (isEmpty(getBtn(0, 0))) return getBtn(0, 0);
    if (isEmpty(getBtn(0, 2))) return getBtn(0, 2);
    if (isEmpty(getBtn(2, 0))) return getBtn(2, 0);
    if (isEmpty(getBtn(2, 2))) return getBtn(2, 2);
    
    // 5. choose button randomly
    var random_pick = [btn1, btn3, btn5, btn7];
    do{
    	btn = random_pick[Math.floor(Math.random()*random_pick.length)];
    } while (!isEmpty(btn));
    return btn;
}

function isEmpty(btn) {
		return (btn.value != "X" && btn.value != "O");
}



// if horizontal, vertical or diagonal are three in a row --> win = true
function checkForWin(){
    var win = false;
    var draw = false;

if (btn0.value == symbol && btn1.value == symbol && btn2.value == symbol){
alert (symbol + " has won the game")
win = true;
}

else if (btn3.value == symbol && btn4.value == symbol && btn5.value == symbol){
alert (symbol + " has won the game")
win = true;
}

else if (btn6.value == symbol && btn7.value == symbol && btn8.value == symbol){
alert (symbol + " has won the game")
win = true;
}

else if (btn0.value == symbol && btn3.value == symbol && btn6.value == symbol){
alert (symbol + " has won the game")
win = true;
}

else if (btn1.value == symbol && btn4.value == symbol && btn7.value == symbol){
alert (symbol + " has won the game")
win = true;
}

else if (btn2.value == symbol && btn5.value == symbol && btn8.value == symbol){
alert (symbol + " has won the game")
win = true;
}

else if (btn0.value == symbol && btn4.value == symbol && btn8.value == symbol){
alert (symbol + " has won the game")
win = true;
}

else if (btn2.value == symbol && btn4.value == symbol && btn6.value == symbol){
alert (symbol + " has won the game")
win = true;
}

// if all fields are clicked, then alert --> item

else if (click_count == 9) {
    alert(item)
    draw = true;
}

if (win == true && symbol == "X") {
    player1.value = counter1++;
} 
else if (win == true && symbol =="O") {
    player2.value = counter2++;
}

// function clear several buttons

function clearAutomatically(){
	btn0.value = " ";
    btn1.value = " ";
    btn2.value = " ";
    btn3.value = " ";
    btn4.value = " ";
    btn5.value = " ";
    btn6.value = " ";
    btn7.value = " ";
    btn8.value = " ";
    click_count = 0;	
}

// call function, if win or draw == true
if(win==true||draw==true){
	clearAutomatically();
  return true;
	} else return false;
}

// clear buttons
function clearBtn() {
    btn0.value = " ";
    btn1.value = " ";
    btn2.value = " ";
    btn3.value = " ";
    btn4.value = " ";
    btn5.value = " ";
    btn6.value = " ";
    btn7.value = " ";
    btn8.value = " ";
    click_count = 0;
	player1.value = 0;
	player2.value = 0;
}

// autoplay music with with a predefined list
 var idx = 0;
        var tracks = ["Songs/Lied.mp3", "Songs/Lied2.mp3", "Songs/Lied3.mp3", "Songs/Lied4.mp3", "Songs/Costollo.mp3"];
        aud1.addEventListener("ended", playnext);
        function playnext() {
            if (idx < tracks.length) {
               
                aud1.src = tracks[idx];
                aud1.play();
            }
            idx++;
        }
        playnext();
