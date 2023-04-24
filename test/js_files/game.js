
var shoot_key = null;
var users = [{username: 'n', password: 'n', firstname:'n', lastname: 'n', email: 'nn@gmail.com', birthdate: '01/01/1996'},{username: 'p', password: 'testuser'}];
let loggedInUser = null;
const canvas = document.getElementById('game-canvas');
const ctx = canvas.getContext('2d');
var limitTime = 120;
var audio;
var playerHistory = [];
var counter = 0;

//choose key to shoot with 
// $(document).ready(function() {
//   const shoot_input = document.getElementById('key-board-input');
//   document.addEventListener('keydown', function(event){
//     if(event.target.tagName.toLowerCase() === "input"){
//     console.log(event)
//     shoot_key = event.keyCode
//     if(event.keyCode == '32'){
//       shoot_input.value = "space";

//     }
//     else{
//       //NEED TO FIX THIS, DOESNT SHOW THE EVENT KEY INSIDE TH INPUT 
//       shoot_input.value = event.key;
//     }
//     shoot_input.value = null;
//     console.log("the chosen key is:" + event.key ); 
//     }
//   });
// });

function setShootKey2(event){
	let key_shot = document.getElementById("key-board-input").value;
  shoot_key = event.keyCode;
  if (event.keyCode=='32'){
    alert("The choosen key is SPACE");
  }
  else{
    alert("The choosen key is "+ event.key);
  }
}


function setShootKey(){
    document.addEventListener('keydown', function(event){
         alert("Key pressed is: "+event.key);
         shoot_key = event.keyCode;
         console.log("shoot key-code is:"+shoot_key);
         if (event.keyCode=='32'){
          document.getElementById('choosen-key').innerHTML = "The choosen key is: space";

         }
         else{
          document.getElementById('choosen-key').innerHTML = "The choosen key is: "+event.key;
        }
         event.preventDefault();
    })
    document.getElementById('key-board-input').value = null;
}

$(document).ready(function() {
  canvas.hidden = true;
	$("#register-section").hide();
	$("#login-section").hide();
	$("#about").hide();
	$("#play-menu-btn").hide();
	$("#logout-menu-btn").hide();
  $("#preference-section").hide();
  $("#play-section").hide();

  // var audio = document.getElementById("startMusic");
  // audio.play();

  $("#home-menu-btn").click(function(){
    // ClearAllIntervals();
    if (audio != null){
      audio.pause();
    }
    // if (loggedInUser != null){
    //   $("#welcome-login-btn").hide();
    //   $("#welcome-registration-btn").hide();
    // }


    $("#player-history-section").show();
    $("#game-canvas").hide();
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
	});

	$("#login-menu-btn").click(function(){
		// ClearAllIntervals();
		if (audio != null){
			audio.pause();
		}
    // audio = document.getElementById("startMusic");
    // audio.play();
    $("#player-history-section").hide();
		$("#welcome-section-notLoggedIn").hide();
		$("#play-section").hide();
		$("#register-section").hide();
		$("#login-section").show();
		$("#preference-section").hide();
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
	});

	$("#welcome-play-btn").click(function(){
		// ClearAllIntervals();
		// if (audio != null){
		// 	audio.pause();
		// }
		$("#welcome-section-notLoggedIn").hide();
		$("#play-section").hide();
		$("#register-section").hide();
		$("#login-section").hide();
		$("#preference-section").show();
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

$(document).ready(function() {
	const rangeTime = document.getElementById('rangeTime');
	const rangeValueTime = document.getElementById('range-value-time');
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


function setUserPreferences(){
	limitTime = parseInt($("#rangeTime").val(), 10);
  if (shoot_key==null){
    alert("please press a keybord");
    return false;
  }
  alert("Let`s Play!");
  canvas.hidden = false;
  $("#welcome-section").hide();
	$("#play-section").show();
	$("#preference-section").hide();
  console.log("hide welcome sec");
  console.log("limit time is:"+ limitTime);

  // var audio = document.getElementById("startMusic");
  // audio.play();
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
  canvas.hidden = true;
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
	loggedInUser = null;
	// ClearAllIntervals();
	// ResetPreferences();
	// if (audio != null){
	// 	audio.pause();
	// }
	setLogOut();
}

function setLogOut(){
  canvas.hidden = true;
	$("#welcome-section-notLoggedIn").show();
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

	ResetPreferences();
}


function ResetPreferences(){
  let form = $("#preference-form");
  form[0].reset();
  shoot_key = null;
  limitTime = null;
  playerHistory = [];
  counter=0;
  //need to reset time   
}


//when the game end show the player his score table 
$(document).ready(function() {
// function setUserScore(){

  //set the title of the table to the user name 
  if (loggedInUser!=null){
    document.getElementById('player-name').innerHTML = loggedInUser['username'];
  }

  const table = document.getElementById('myTable');
  playerHistory = [];
  const curr1 = {game_num: '1',score:'10'};
  const curr2 = {game_num: '2',score:'12'};
  playerHistory.push(curr1);
  playerHistory.push(curr2);
  //sort in decending order by 'score'
  playerHistory.sort(function(first, second) {
    return second.score - first.score;
   });

  const headerRow = table.insertRow();
  const headerCell1 = headerRow.insertCell();
  const headerCell2 = headerRow.insertCell();
  headerCell1.innerText = 'Game Number';
  headerCell2.innerText = 'Points';
  // Create table rows
  for (let i = 0; i < playerHistory.length; i++){
    // for (const [gameNum, p] of Object.entries(curr)) {
      const row = table.insertRow();
      const cell1 = row.insertCell();
      const cell2 = row.insertCell();
      cell1.innerText = playerHistory[i]['game_num'];
      cell2.innerText = playerHistory[i]['score'];
    // }
  }
  table.setAttribute("border", "2");

})

/********************************************************************************************************* */


var keys={};
const restartButton = document.querySelector('#restart-button');
restartButton.addEventListener('click', function() {
  startGame();
});
var resultsList = [];

  function displayArray(canvas1,myArray){
    var canvas = document.getElementById("myCanvas");
    var context = canvas.getContext("2d");
    var myArray = [ [1, 2, 3], [4, 5, 6], [7, 8, 9] ];

    // set the font and font size for the table
    context.font = "16px Arial";

    // set the x and y position for the top-left corner of the table
    var x = 50;
    var y = 50;

    // set the width and height of each cell in the table
    var cellWidth = 50;
    var cellHeight = 30;

    // loop through the array and draw each value in a table cell
    for (var i = 0; i < myArray.length; i++) {
      for (var j = 0; j < myArray[i].length; j++) {
        // calculate the x and y position of the cell based on its index
        var cellX = x + j * cellWidth;
        var cellY = y + i * cellHeight;
        // draw the value of the cell using fillText()
        context.fillText(myArray[i][j], cellX, cellY);
      }
    }
  }


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
    var ranEnemyX=0;
    var ranEnemyY=0;
    var testo=1
    counterOfInt=1
    var timeRemain=true
    debug=0
    var myVar = 2; // The variable to be updated
    var timer;

    function myTimer (){
      timer = setTimeout(function() {
        timeRemain=false
        console.log("timer round is overrrrrrrrrrrrrrrrrrrrrr")
        console.log(playerPoints)
        if(playerPoints<100){
          resultsList.push(playerPoints);
          console.log("Results are" +resultsList)
          rocketObj=null
          // playerPoints=null
          enemies=null;
          alert("You can do better!");
          
          startGame();
        }
        if(playerPoints>=100){
          rocketObj=null
          // playerPoints=null
          enemies=null;
          alert("You Win!");

          startGame();
        }    
      }, 12000);
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





  var intervalId = setInterval(() => {
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
  player.image.src = 'player12.png';
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
      if(smallCo==randomNumber1){
        // console.log("enemies Leng is"+ enemies.length);
        // console.log("The random number is"+ randomNumber1);
        if(rocketob!=null){
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
    if(enemies!=null)
    {
    enemies.forEach((enemy) => {
      
      ctx.drawImage(enemy.image, enemy.x  , enemy.y , enemy.width, enemy.height);
      
    });
  }
    if(rocketObj!=null)
    {
    shootRocket(rocketObj);
  }
    // shootRocket(rocketObj2);
    

    document.addEventListener("keydown", function(event) {
      if (event.keyCode === 32) {
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
        if(enemy.x>xPos){
          xPos=enemy.x
        }
        if(enemy.x<lPos){
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
      if(rocketObj.y==canvas.height ){
        // console.log("this cond");
        smallCo=0;
      }

      if(rocketObj.y==canvas.height*0.75 ){
        // console.log("Shooted number 2");
        // shootRocket(rocketObj2)
      }

      if(rocketObj.y==canvas.height*0.75 ){
        // console.log("Shooted number 1");
        // shootRocket(rocketObj)
      }

      if(rocketObj2.y==canvas.height ){
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
    
      if((rocket.y<0)){
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
      resultsList.push(playerPoints);
      console.log("Results are" +resultsList)
      rocketObj=null
      enemies=null;
      startGame();
      // clearTimeout(timer);
      alert("You Lost!");
      clearTimeout(timer);
      startGame();
    }
    if(x==2){
      resultsList.push(playerPoints);
      console.log("Results are" +resultsList)
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

// startGame();























// function startGame()
// {
// var failsCoount=0
// var cahngeX=0
// var rocketStartingPosY=0
// var rocketStartingPosX=0
// var rockets=[];
// var yVal=0
// var xVal=0
// playerPoints=0
// document.getElementById("points-display").textContent = "Player Points: " + playerPoints;
// document.getElementById("pointsFails-display").textContent = "Number Of Fails: " + playerPoints;
// var ranEnemyX=0;
// var ranEnemyY=0;
// var testo=1
// counterOfInt=1
// var timeRemain=true
// debug=0
// let myVar = 2; // The variable to be updated
// function myTimer (){
// const timer = setTimeout(function() {
//   timeRemain=false
//   endGame(2);
  
// }, 10000);
// }
// myTimer();


// class rocketo {
//   constructor() {
//     this.x = 0;
//     this.y = 0;
//     this.width=15;
//     this.height=10;
//     this.speed=10;
//     this.image=new Image();
//     this.image.src='rocket.png'

    
//   }
// }

// const canvas = document.getElementById('game-canvas');
// const ctx = canvas.getContext('2d');









// let intervalId = setInterval(() => {
//   // Update the variable
//   enemySpeed+=0.5;


// }, 5000); // Run every 5 seconds (5000 milliseconds)

// // To stop the interval after a certain amount of time (e.g. 30 seconds)
// setTimeout(() => {
//   clearInterval(intervalId);
// }, 20000); // Stop after 20 seconds 
// // Player properties
// const player = {
//   x: canvas.width / 2,
//   y: canvas.height - 25,
//   width: 40,
//   height: 30,
//   speed: 10,
//   image: new Image(),
// };
// player.image.src = 'player5.png';
// player.image.onload = () => {
//   gameLoop();
  
// };
// const rocket = {
  
//   x: 0,
//   y: 0,
//   width: 25,
//   height: 20,
//   speed: 10,
//   image: new Image(),
//   usedAlready: 0,
// };

// const rocket2 = {
//   x: 0,
//   y: 0,
//   width: 25,
//   height: 20,
//   speed: 10,
//   image: new Image(),

// };
// rocket.image.src = 'rocket.png';
// rocket2.image.src = 'rocket.png';


// // Enemies properties
// var enemies = [];
// var booli=false
// const enemyImage = new Image();
// enemyImage.src = 'e6.png';
// const enemyWidth = 30;
// const enemyHeight = 20;
// var enemySpeed = 2;


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



// // Create enemies
// function createEnemies() {
  
//   for (let i = 0; i < 20; i++) {
//     const row = Math.floor(i / 5);
//     const col = i % 5;
//     enemies.push({
//       x:(col * enemyWidth + enemyWidth / 2),
//       y: (row * enemyHeight + enemyHeight / 2),
//       width: enemyWidth,
//       height: enemyHeight,
//       rowEne:row,
//       image: enemyImage,
//       direction: 1,
//     });
//   }

// }
// var smallCo=0
// var rocketObj = new rocketo();
// var rocketObj2 = new rocketo();


 
// function shootRocket(rocketob){
//   // smallCo=0;
// var randomNumber1 = Math.floor(Math.random() * enemies.length);  
// enemies.forEach((enemy) => {
  
//   if(smallCo==randomNumber1)
//   {
//     console.log("enemies Leng is"+ enemies.length);
//     console.log("The random number is"+ randomNumber1);
//     rocketob.x=enemy.x
//     rocketob.y=enemy.y
   
//     // return 0;
    

//   }
//   smallCo++;
  
  
// });

// ctx.drawImage(rocketob.image,rocketob.x ,rocketob.y, rocketob.width, rocketob.height);  
// rocketob.y+=0.5 
    
// }




// // Game loop


// rocket.y=player.y   
// rocket.x=player.x 


// var countermy=0

// function gameLoop() {
  
//   // Clear canvas
//   ctx.clearRect(0, 0, canvas.width, canvas.height);

//   // Draw player
//   ctx.drawImage(player.image, player.x, player.y, player.width, player.height);
 
//   // Draw enemies
//   tempPos=0
//   enemies.forEach((enemy) => {
    
//     ctx.drawImage(enemy.image, enemy.x  , enemy.y , enemy.width, enemy.height);
    
//   });

//   shootRocket(rocketObj);
//   // shootRocket(rocketObj2);
  
 
//   document.addEventListener("keydown", function(event) {
//     if (event.keyCode === 32) {
//       countermy=0;
      
//       // do something when space is clicked
//       booli=true
//     }
//   });
//   if (booli==true){
//   if(countermy==0){
    
//   ctx.drawImage(rocket.image,rocket.x , rocket.y, rocket.width, rocket.height);  
  
//   rocket.y-=1.5

// }

// } 


//   // Move enemies
//   var xPos=0
//   var lPos=10000
//   enemies.forEach((enemy) => {
     
//     // console.log(indexof(enemy))
    
//     if(enemy.x>xPos)
//     {
//       xPos=enemy.x
//     }
//     if(enemy.x<lPos)
//     {
//       lPos=enemy.x
//     }
    
//   });
//   counterOfInt=enemySpeed
  
//   enemies.forEach((enemy) => {
    
//     // console.log(indexof(enemy))
   
//     enemy.x += (counterOfInt * enemy.direction);
        
//     if (lPos - enemyWidth / 2 <= 0) {
      
//       enemy.direction = 1;
      
//       // enemy.y += enemyHeight;
//     } else if (xPos + enemyWidth / 2 >= canvas.width) {
//       enemy.direction = -1;
//       // enemy.y += enemyHeight;
//     }
       
//   });
  
  
//   // Move player
//   if (keys.ArrowLeft && player.x > 0) {
//     player.x -= player.speed/2;
//     if(booli==false){
//     rocket.x -= player.speed/2;
//   }
//   } else if (keys.ArrowRight && player.x < canvas.width - player.width) {
//     player.x += player.speed/2;
//     if(booli==false){
//     rocket.x += player.speed/2;
//     }
//   }
//   if (keys.ArrowUp && player.y > canvas.height*0.6) {
//     player.y -= (player.speed/2);
//     rocket.y -= (player.speed/2);
//   } else if (keys.ArrowDown && player.y < canvas.height - player.height) {
//     player.y += (player.speed/2);
//     rocket.y += (player.speed/2);
//   }

  
   
  

//   // Check for collision between player and enemies
  
//   if(rocketObj.y==canvas.height )
  
//   {
//     // console.log("this cond");
//     smallCo=0;
    
//   }

//   if(rocketObj.y==canvas.height*0.75 )
//   {
//     console.log("Shooted number 2");
//     // shootRocket(rocketObj2)
//   }


//   if(rocketObj.y==canvas.height*0.75 )
//   {
//     console.log("Shooted number 1");
//     // shootRocket(rocketObj)
//   }

//   if(rocketObj2.y==canvas.height )
  
//   {
//     smallCo=0; 
//   }





//   enemies.forEach((enemy, index) => {
    
//     if (
//      ( rocket.x < enemy.x + enemy.width / 2 &&
//       rocket.x + rocket.width > enemy.x - enemy.width / 2 &&
//       rocket.y < enemy.y + enemy.height / 2 &&
//       rocket.y + rocket.height > enemy.y - enemy.height / 2&&
//       countermy==0)

//     ) {
//       enemies.splice(index, 1);
//       rocket.y=player.y   
//       rocket.x=player.x 
//       countermy++;
//       booli=false
//       playerPoints+=(20-(5*(enemy.rowEne)))
//       document.getElementById("points-display").textContent = "Player Points: " + playerPoints;
      
      
//     }
   




//     if((rocket.y<0))
//     {
//       rocket.y=player.y   
//       rocket.x=player.x 
//       booli=false
//       countermy++;
//     }
    
//   });

//   if (
//     ( (rocketObj.x - rocketObj.width < player.x + player.width / 2 &&
//     rocketObj.x  > player.x - player.width / 2 &&
//     rocketObj.y > player.y - player.height / 5 &&
//     rocketObj.y + (rocketObj.height/2) > player.y - player.height / 2)
 
//     )

//    ) {
    
//     smallCo=0;
//     console.log("this is smallco:"+smallCo)
//     console.log(rocketObj.x);
//     console.log(player.x);
    
//     player.x=0;
//     failsCoount++;
//     // var rocketObj = new rocketo();
  
    
//   if(failsCoount>2 && playerPoints<100)
//     {
//       failsCoount=0;
      
//       // alert("you can do better");
//       endGame(1);
//   }
//   document.getElementById("pointsFails-display").textContent = "Number Of Fails: " + failsCoount;

     
     
//    }
  
//   requestAnimationFrame(gameLoop);
  
// }

// // Handle keyboard input
// const keys = {};
// // document.addEventListener('Space', (event) => {
// //   const rocket = document.getElementById('rocket');
// //   const startY = player.y;
// //   const endY = startY - 200;
// //   let currentPosition = startY;

// //   const animateRocket = setInterval(() => {
// //     if (currentPosition <= endY) {
// //       clearInterval(animateRocket);
// //     } else {
// //       currentPosition -= 10;
// //       rocket.style.top = player.x;
// //     }
// //   }, 10);
// //   keys[event.code] = true;
// // });
// // function restatGame()
// // {
// //   goto
// // }
// document.addEventListener('keydown', (event) => {
//   keys[event.code] = true;
// });
// document.addEventListener('keyup', (event) => {
//   keys[event.code] = false;
// });

// // document.addEventListener('keydown', launchRocketOnSpace);
// createEnemies();
// function endGame(x){
//   if(x==1){
//     alert("You lost!");
//   }
//   if(x==2){
//     if(playerPoints>=100){
//       alert("You Win!");
//       ctx.clearRect(0, 0, canvas.width, canvas.height);
//       startGame();
//       myTimer();
//     }
//     else{
//       alert("You can do better");
//       ctx.clearRect(0, 0, canvas.width, canvas.height);
//       startGame();
//       myTimer();
//     }

//   }
// }
// }



