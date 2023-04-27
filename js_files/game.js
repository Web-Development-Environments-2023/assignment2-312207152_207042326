var shoot_key = null;
var users = [{username: 'n', password: 'n', firstname:'n', lastname: 'n', email: 'nn@gmail.com', birthdate: '01/01/1996'},{username: 'p', password: 'testuser'}];
let loggedInUser = null;
const canvas = document.getElementById('game-canvas');
const ctx = canvas.getContext('2d');
const table = document.getElementById('myTable');
table.setAttribute("border", "2");
var limitTime = 120;
var audio = document.getElementById("startMusic");
var playerHistory = [];
var gameCounter = 1;
var playerColor = 'player12.png'; //defualt player


$(document).ready(function() {
	$("#register-section").hide();
	$("#login-section").hide();
	$("#about").hide();
	$("#play-menu-btn").hide();
	$("#logout-menu-btn").hide();
  $("#preference-section").hide();
  $("#play-section").hide();
  $("#player-history-section").hide();


  $("#home-menu-btn").click(function(){
    // ClearAllIntervals();
    if (audio != null){
      audio.pause();
    }
    // if (loggedInUser != null){
    //   $("#welcome-login-btn").hide();
    //   $("#welcome-registration-btn").hide();
    // }
    $("#player-history-section").hide();
    $("#welcome-section-notLoggedIn").show();
    $("#play-section").hide();
    // setUserScore();
    $("#register-section").hide();
    $("#login-section").hide();
    $("#preference-section").hide();
  });

  $("#register-menu-btn").click(function(){
		// ClearAllIntervals();
		if (audio != null){
			audio.pause();
		}
    $("#player-history-section").hide();
		$("#welcome-section-notLoggedIn").hide();
		$("#play-section").hide();
		$("#register-section").show();
		$("#login-section").hide();
		$("#preference-section").hide();
    $("#player-history-section").hide();
	});

	$("#login-menu-btn").click(function(){
		// ClearAllIntervals();
		if (audio != null){
			audio.pause();
		}
    $("#player-history-section").hide();
		$("#welcome-section-notLoggedIn").hide();
		$("#play-section").hide();
		$("#register-section").hide();
		$("#login-section").show();
		$("#preference-section").hide();
    $("#player-history-section").hide();
	});

	$("#welcome-login-btn").click(function(){
		// ClearAllIntervals();
		if (audio != null){
			audio.pause();
		}
		// if (loggedInUser != null){
		// 	$("#welcome-login-btn").hide();
		// 	$("#welcome-registration-btn").hide();
		// }
		$("#welcome-section-notLoggedIn").hide();
		$("#play-section").hide();
		$("#register-section").hide();
		$("#login-section").show();
		$("#preference-section").hide();
    $("#player-history-section").hide();

	});

	$("#welcome-registration-btn").click(function(){
		// ClearAllIntervals();
		if (audio != null){
			audio.pause();
		}
		$("#welcome-section-notLoggedIn").hide();
		$("#play-section").hide();
		$("#register-section").show();
		$("#login-section").hide();
		$("#preference-section").hide();
    $("#player-history-section").hide();
	});


	$("#play-menu-btn").click(function(){
		// ClearAllIntervals();
		if (audio != null){
			audio.pause();
		}
		// ResetPreferences();
		$("#welcome-section-notLoggedIn").hide();
		$("#play-section").hide();
		$("#register-section").hide();
		$("#login-section").hide();
		// $("#preference-section").show();
    startGame();
	});
})

//**************** SET PREFERENCE *********************/
function setShootKey(event){
	let key_shot = document.getElementById("key-board-input").value;
  shoot_key = event.keyCode;
  if (event.keyCode=='32'){
    alert("The choosen key is SPACE");
  }
  else{
    alert("The choosen key is "+ event.key);
  }
}

$(document).ready(function() {
	const rangeTime = document.getElementById('rangeTime');
  console.log("range time is " +rangeTime.value) 
	const rangeValueTime = document.getElementById('range-value-time');
  console.log("rangeValueTime is " +rangeValueTime.value) 
	const setValueTime = () => {
		const newVal = Number((rangeTime.value - rangeTime.min) * 100 / (rangeTime.max - rangeTime.min));
		const newPosition = 10 - (newVal * 0.2);
		rangeValueTime.innerHTML = `<span>${rangeTime.value}</span>`;
		rangeValueTime.style.left = `calc(${newVal}% + ${newPosition}%)`;
	};
	document.addEventListener("ContactLoaded", setValueTime);
	rangeTime.addEventListener('input', setValueTime);

	setValueTime();
});

$('.color-btn').click(function() {
  $('.color-btn').removeClass('clicked');
  $(this).addClass('clicked');
})

$("#blackPlayer").click(function(){
  playerColor = 'player12.png';
  $('.color-btn').removeClass('clicked');
  $(this).addClass('clicked');
});

$("#redPlayer").click(function(){
  playerColor = 'player1.png';
  $('.color-btn').removeClass('clicked');
  $(this).addClass('clicked');
});

function setUserPreferences(){
	limitTime = parseInt($("#rangeTime").val(), 10);
  if (shoot_key==null){
    alert("please press a keybord");
    return false;
  }
  alert("Let`s Play!");
  console.log("hide welcome sec");
  console.log("limit time is:"+ limitTime);
  audio.play();
  $("#welcome-section").hide();
	$("#play-section").show();
	$("#preference-section").hide();
  $("#home-menu-btn").hide();
  $("#register-section").hide();
	$("#login-section").hide();
	$("#about").hide();
	$("#play-menu-btn").show();
	$("#logout-menu-btn").show();
  $("#preference-section").hide();
  startGame();
	return false;
}


//****************REGISTRATION AND LOG IN *********************/
$(document).ready(function() {
  $('#registration-section-form').submit(function(event) {
    event.preventDefault();
    if ($(this).valid()) {
      console.log("OK");
      registrationUser();
    }
  });
});

$(document).ready(function() {
  $('#reset-btn').click(function() {
    $('#registration-section-form')[0].reset();
  });
});

$(document).ready(function () {
	//Checks password
	$.validator.addMethod("validPassword", function (value) {
		return /^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9]+)$/.test(value);
	});

	//Checks no numbers first and last name
	$.validator.addMethod("noNumbers", function(value){
		return /^[a-zA-Z]+$/.test(value);
	});

	//Checks if username is already exists
	$.validator.addMethod("validUserName", function(value){
		let is_valid = users.some(e => e.username == value);
		if (is_valid == true){
			return false;
		}
		else{
			return true;
		}
	});

	$("#registration-section-form").validate({
		rules: {
			registerFormUserName: {
				required: true,
				validUserName: true
			},

			registerFormPassword: {
				required: true,
				validPassword: true,
				minlength: 8
			},

			registerFormConfirmPassword : {
				required: true,
				equalTo: "#registerFormPassword"
			},

			registerFormFirstName: {
				required: true,
				noNumbers: true
			},

			registerFormLastName: {
				required: true,
				noNumbers: true
			},

			registerFormEmail: {
				required: true,
				email: true
			},

			registerFormBirthDate: {
				required: true,
			}
		},

		messages: {
			registerFormUserName: {
				validUserName: "This username is already exists",
				required: "Please enter a username"
			},

			registerFormPassword: {
				minlength: "Password must be at least 8 characters long.",
				validPassword: "Password must contain at least one character and one number",
				required: "Please enter a password"
			},

			registerFormConfirmPassword: {
				equalTo: "Password and Confirm Password must match.",
				required: "Please enter a confirm password"
			},

			registerFormFirstName: {
				noNumbers: "Letters allowed only.",
				required: "Please enter a first name"
			},

			registerFormLastName: {
				noNumbers: "Letters allowed only.",
				required: "Please enter a last name"
			},

			registerFormEmail: {
				required: "Please enter an email"
			},

			registerFormBirthDate: {
				required: "Please choose your birth date"
			}
		},

  });
		// submitHandler: function(){
		// 	registrationUser();
		// 	alert(users.length);
		// }
});

function registrationUser(){
	const un = document.getElementById("registerFormUserName").value;
	const pass = document.getElementById("registerFormPassword").value;
	const fn = document.getElementById("registerFormFirstName").value;
	const ln = document.getElementById("registerFormLastName").value;
	const em = document.getElementById("registerFormEmail").value;
	const bD = document.getElementById("registerFormBirthDate").value;

	if (un == "" || pass == "" || fn == "" || ln == "" || em == ""){
		alert("Some details are missing.");
		return false;
	}

	const newUser = {username: un, password: pass, firstname: fn, lastname: ln, email: em, birthdate: bD};

	users.push(newUser);

	alert('Registration completed successfully');

	let form = $("#registration-section-form");
	form[0].reset();

	$("#register-section").hide();
	$("#login-section").show();

	return false;
}


function logIn(){
	let userName = document.getElementById("loginFormUserName").value;
	let password = document.getElementById("loginFormPassword").value;

	let user = null;

	for (let i = 0; i < users.length; i++){
		if (users[i]['username'] == userName){
			user = users[i];
		}
	}

	if (user != null){
		if (user['password'] == password){
			loggedInUser = user;
			alert("Welcome " + userName + "!");
			setLogIn();
			let form = $("#login-section-form");
			form[0].reset();
			return false;
		}
		else{
			alert("Password is incorrect");
			return false;
		}
	}
	else {
		alert(userName + " is not a registered user, please register")

		let form = $("#login-section-form");
		form[0].reset();

		$("#register-section").show();
		$("#login-section").hide();

		return false;
	}
}

function setLogIn() {
	$("#preference-section").show();
	$("#welcome-section-notLoggedIn").hide();
	$("#play-section").hide();
	$("#register-section").hide();
	$("#login-section").hide();
	$("#play-menu-btn").show();
	$("#logout-menu-btn").show();
	$("#register-menu-btn").hide();
	$("#login-menu-btn").hide();
}

function logout(){
	// ClearAllIntervals();
	if (audio != null){
		audio.pause();
    console.log("pauseeeee audiooooooooooooooo");
	}
  breakGame();
  setUserTable();
  setLogOut();
  ResetPreferences();
}

function setLogOut(){
	$("#welcome-section-notLoggedIn").hide();
	$("#play-section").hide();
	$("#register-section").hide();
	$("#login-section").hide();
	$("#preference-section").hide();
	$("#play-menu-btn").hide();
	$("#logout-menu-btn").hide();
	$("#register-menu-btn").show();
	$("#login-menu-btn").show();
	$("#welcome-login-btn").show();
	$("#welcome-registration-btn").show();
  $("#player-history-section").show();
  $("#home-menu-btn").show();
	// ResetPreferences();
}


function ResetPreferences(){
  $('.color-btn').removeClass('clicked');
  let form = $("#preference-form");
  form[0].reset();
  shoot_key = null;
  limitTime = null;
  loggedInUser = null;
  gameCounter = 1;
  playerHistory = [];
}

//when the game end show the player his score table 
function setUserTable(){
  //set the title of the table to the user name 
  if (loggedInUser!=null){
    document.getElementById('player-name').innerHTML = loggedInUser['username'];
  }
  //sort in decending order by 'score'
  playerHistory.sort(function(first, second) {
    return second[1] - first[1];
   });
   console.log("player hist:" +playerHistory );

   //clear old table
  const rowCount = table.rows.length;
  for (let i = rowCount - 1; i > 0; i--) {
    table.deleteRow(i);
  }
  // Create table rows
  for (let i = 0; i < playerHistory.length; i++){
    console.log(playerHistory)
    const row = table.insertRow();
    const cell1 = row.insertCell();
    const cell2 = row.insertCell();
    cell1.innerText = playerHistory[i][0];
    cell2.innerText = playerHistory[i][1];
  }
}

$(document).keydown(function(e) {
  if (e.keyCode == 32) {
      // prevent default action
      e.preventDefault();
      // perform intended action here
  }
});
/********************************************************************************************************* */
var keys={};
const restartButton = document.querySelector('#restart-button');
var intervalId;

restartButton.addEventListener('click', function() {
  startGame();

});
function startGame(){
  keys={};
  var failsCoount=0
  var cahngeX=0
  var rocketStartingPosY=0
  var rocketStartingPosX=0
  var rockets=[];
  var yVal=0
  var xVal=0
  var playerPoints=0
  document.getElementById("points-display").textContent = "Player Points: " + playerPoints;
  document.getElementById("pointsFails-display").textContent = "Number Of Fails: " + playerPoints;
  // document.getElementById("time-left").innerHTML = "Time Left: ";
  var ranEnemyX=0;
  var ranEnemyY=0;
  var testo=1
  counterOfInt=1
  var timeRemain=true
  debug=0
  var myVar = 2; // The variable to be updated

  function updateTimer(){
    // var seconds = Math.floor((limitTime % (60 * 1000)) / 1000);
    document.getElementById("time-left").innerHTML = "Time Left: " + seconds;
  }
  setInterval(updateTimer, 1000);


  function myTimer (){
    timer = setTimeout(function() {
      timeRemain=false
      console.log("timer round is overrrrrrrrrrrrrrrrrrrrrr")
      console.log(playerPoints)
      if(playerPoints<100){
          
        var tupleRes=[gameCounter,playerPoints]
        playerHistory.push(tupleRes);
        gameCounter++
        console.log("Playr"+playerHistory)
        // playerHistory.push(dic);
        // console.log("Results are" +playerHistory);
        rocketObj=null
        // playerPoints=null
        enemies=null;
        alert("You can do better!");
        startGame();
      }

      if(playerPoints>=100){
        var tupleRes=[gameCounter,playerPoints]
        playerHistory.push(tupleRes);
        gameCounter++
        rocketObj=null
        // playerPoints=null
        enemies=null;
        alert("You Win!");
        startGame();
      }
    }, limitTime*1000);
  }

  myTimer();

  class rocketo {
    constructor() {
      this.x = 0;
      this.y = 0;
      this.width=15;
      this.height=10;
      this.speed=10;
      this.image=new Image();
      this.image.src='player11.png'
    }
  }



intervalId = setInterval(() => {
  // Update the variable
  enemySpeed+=0.5;
}, 5000); // Run every 5 seconds (5000 milliseconds)

// To stop the interval after a certain amount of time (e.g. 30 seconds)
setTimeout(() => {
  clearInterval(intervalId);
}, 20000); // Stop after 20 seconds 
// Player properties
const player = {
  x: 0,
  y: canvas.height - 25,
  width: 40,
  height: 30,
  speed: 10,
  image: new Image(),
};
player.image.src = playerColor;
player.image.onload = () => {
  gameLoop();
};

const rocket = {
  x: 0,
  y: 0,
  width: 25,
  height: 20,
  speed: 10,
  image: new Image(),
  usedAlready: 0,
};

const rocket2 = {
  x: 0,
  y: 0,
  width: 25,
  height: 20,
  speed: 10,
  image: new Image(),
};
rocket.image.src = 'shootRocket.png';
rocket2.image.src = 'shootRocket.png';


// Enemies properties
var enemies = [];
var booli=false
const enemyImage = new Image();
enemyImage.src = 'enemy11.png';
const enemyWidth = 30;
const enemyHeight = 20;
var enemySpeed = 2;


// function createRockets() {
  
//   for (let i = 0; i < 20; i++) {
//     const row = Math.floor(i / 5);
//     const col = i % 5;
//     rockets.push({
//       x:0,
//       y: 0,
//       width: rocket.width,
//       height: rocket.height,
//       image: rocket.image,
//       speed: rocket.speed,
//     });
//   }
// }



// Create enemies
function createEnemies() {
  
  for (var i = 0; i < 20; i++) {
    const enemyImageChanged = new Image();
    const row = Math.floor(i / 5);
    const col = i % 5;
    console.log("The row is ="+ row)
    if(row==0){
      console.log("choose first line image");
      enemyImageChanged.src='firstline.png';
    }
    if (row ==1)
    {
      enemyImageChanged.src='enemy11.png';
    }
    if (row ==2)
    {
      enemyImageChanged.src='enemy2.png';
    }
    if (row ==3)
    {
      enemyImageChanged.src='enemy8.png';
    }
    if (row ==4)
    {
      enemyImageChanged.src='enemy13.png';
    }
    enemies.push({
      x:(col * enemyWidth + enemyWidth / 2),
      y: (row * enemyHeight + enemyHeight / 2),
      width: enemyWidth,
      height: enemyHeight,
      rowEne:row,
      image: enemyImageChanged,
      direction: 1,
    });
  }
}

var smallCo=0
let rocketObj = new rocketo();
var rocketObj2 = new rocketo();


function shootRocket(rocketob){
  // let rocketObj = new rocketo();
  // smallCo=0;
var randomNumber1 = Math.floor(Math.random() * enemies.length);  
enemies.forEach((enemy) => {
  
  if(smallCo==randomNumber1)
  {
    // console.log("enemies Leng is"+ enemies.length);
    // console.log("The random number is"+ randomNumber1);
    if(rocketob!=null)
    {
    rocketob.x=enemy.x
    rocketob.y=enemy.y
  }
    // return 0;
    

  }
  smallCo++;
  
  
});

ctx.drawImage(rocketob.image,rocketob.x ,rocketob.y, rocketob.width, rocketob.height);  
rocketob.y+=0.5 
    
}


// Game loop
rocket.y=player.y   
rocket.x=player.x 
var countermy=0

function gameLoop() {
  
  // Clear canvas
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Draw player
  ctx.drawImage(player.image, player.x, player.y, player.width, player.height);
 
  // Draw enemies
  var tempPos=0
  if(enemies!=null){
    enemies.forEach((enemy) => {
      ctx.drawImage(enemy.image, enemy.x  , enemy.y , enemy.width, enemy.height);
    });
  }
  if(rocketObj!=null){
    shootRocket(rocketObj);
  }
  // shootRocket(rocketObj2);
  
 
  document.addEventListener("keydown", function(event) {
    if (event.keyCode === shoot_key) {
      countermy=0;
      // do something when space is clicked
      booli=true
    }
  });

  if (booli==true){
    if(countermy==0){
    ctx.drawImage(rocket.image,rocket.x , rocket.y, rocket.width, rocket.height);  
    rocket.y-=1.5
    }
  } 

  // Move enemies
  var xPos=0
  var lPos=10000
  if(enemies!=null){
    enemies.forEach((enemy) => {
      
      // console.log(indexof(enemy))
      
      if(enemy.x>xPos)
      {
        xPos=enemy.x
      }
      if(enemy.x<lPos)
      {
        lPos=enemy.x
      }
      
    });
  }

  counterOfInt=enemySpeed
  if(enemies!=null){
    enemies.forEach((enemy) => {

      // console.log(indexof(enemy))
      enemy.x += (counterOfInt * enemy.direction);
          
      if (lPos - enemyWidth / 2 <= 0) {
        
        enemy.direction = 1;
        
        // enemy.y += enemyHeight;
      }
      else if (xPos + enemyWidth / 2 >= canvas.width) {
        enemy.direction = -1;
        // enemy.y += enemyHeight;
      }  
    });
  }
  
  // Move player
  if (keys.ArrowLeft && player.x > 0) {
    player.x -= player.speed/2;
    if(booli==false){
    rocket.x -= player.speed/2;
    }
  } 
  else if (keys.ArrowRight && player.x < canvas.width - player.width) {
    player.x += player.speed/2;
    if(booli==false){
    rocket.x += player.speed/2;
    }
  }
  if (keys.ArrowUp && player.y > canvas.height*0.6) {
    player.y -= (player.speed/2);
    rocket.y -= (player.speed/2);
  } 
  else if (keys.ArrowDown && player.y < canvas.height - player.height) {
    player.y += (player.speed/2);
    rocket.y += (player.speed/2);
  }

  
   
  

  // Check for collision between player and enemies
  if(rocketObj!=null){
    if(rocketObj.y==canvas.height )
    {
      // console.log("this cond");
      smallCo=0;
    }

    if(rocketObj.y==canvas.height*0.75 )
    {
      // console.log("Shooted number 2");
      // shootRocket(rocketObj2)
    }


    if(rocketObj.y==canvas.height*0.75 )
    {
      // console.log("Shooted number 1");
      // shootRocket(rocketObj)
    }

    if(rocketObj2.y==canvas.height )
    
    {
      smallCo=0; 
    }
  }

if (enemies!=null){
  enemies.forEach((enemy, index) => {
    if (
     ( rocket.x < enemy.x + enemy.width / 2 &&
      rocket.x + rocket.width > enemy.x - enemy.width / 2 &&
      rocket.y < enemy.y + enemy.height / 2 &&
      rocket.y + rocket.height > enemy.y - enemy.height / 2&&
      countermy==0)) 
      {
      enemies.splice(index, 1);
      rocket.y=player.y   
      rocket.x=player.x 
      countermy++;
      booli=false
      console.log("The row is"+ enemy.rowEne)
      playerPoints+=(20-(5*(enemy.rowEne)))
      document.getElementById("points-display").textContent = "Player Points: " + playerPoints;
      }
   
    if((rocket.y<0))
    {
      rocket.y=player.y   
      rocket.x=player.x 
      booli=false
      countermy++;
    }
  });
}
if (rocketObj!=null){
  if (
    ( (rocketObj.x - rocketObj.width < player.x + player.width / 2 &&
    rocketObj.x  > player.x - player.width / 2 &&
    rocketObj.y > player.y - player.height / 5 &&
    rocketObj.y + (rocketObj.height/2) > player.y - player.height / 2)))
    {
    console.log("The fire cachted the player");
    smallCo=0;
    // console.log("this is smallco:"+smallCo)
    // console.log(rocketObj.x);
    // console.log(player.x);
    
    player.x=0
    // rocketObj.x=0
    failsCoount++;
    // var rocketObj = new rocketo();
    if(failsCoount>2){
        clearTimeout(timer);
        failsCoount=0;
        // alert("you can do better");
        endGame(1);
    }

    document.getElementById("pointsFails-display").textContent = "Number Of Fails: " + failsCoount;
  }
}
  requestAnimationFrame(gameLoop);
}

// Handle keyboard input
 keys = {};
// document.addEventListener('Space', (event) => {
//   const rocket = document.getElementById('rocket');
//   const startY = player.y;
//   const endY = startY - 200;
//   let currentPosition = startY;

//   const animateRocket = setInterval(() => {
//     if (currentPosition <= endY) {
//       clearInterval(animateRocket);
//     } else {
//       currentPosition -= 10;
//       rocket.style.top = player.x;
//     }
//   }, 10);
//   keys[event.code] = true;
// });
// function restatGame()
// {
//   goto
// }
  document.addEventListener('keydown', (event) => {
    keys[event.code] = true;
  });
  document.addEventListener('keyup', (event) => {
    keys[event.code] = false;
  });

// document.addEventListener('keydown', launchRocketOnSpace);
  createEnemies();
  function endGame(x){
    if(x==1){
      var tupleRes=[gameCounter,playerPoints]
      playerHistory.push(tupleRes);
      gameCounter++
      // dic = {game_num:gameCounter.toString(), score:playerPoints.toString()};
      // playerHistory.push(dic.show);
      // playerHistory.push(playerPoints);
      console.log("Results are" + playerHistory)
      rocketObj=null
      enemies=null;
      
      startGame();
      
      // clearTimeout(timer);
    
      alert("You Lost!");
      clearTimeout(timer);
        startGame();
    }
    
    if(x==2){
      
      dic = {game_num:gameCounter.toString(), score:playerPoints.toString()};
      playerHistory.push(dic);
        
      // playerHistory.push(playerPoints);
      console.log("Results are" +playerHistory)
      rocketObj=null
      enemies=null;
      alert("You Win!");
      startGame();
    
      if(x==3){
        
            alert("You can do better!");
            
            // clearTimeout(timer);
        
            // alert("You can do better");
      }
        // return;
        // // var rocketObj = new rocketo();
        // ctx.clearRect(0, 0, canvas.width, canvas.height);
        // enemies=[];
        // startGame();
    }
  }
}

function breakGame(){
  rocketObj=null
  enemies=null;
  clearTimeout(timer);
  clearInterval(intervalId);
  console.log("Game is broken"); 
}



