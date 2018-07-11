//loads everything in onload function when page loads
window.onload = function () {
	//array of alphabet letters to create keyboard UI with
	var alphabet = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h',
        'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's',
        't', 'u', 'v', 'w', 'x', 'y', 'z'];
  
	//different topics that player can guess from
	var categories;    

	//the chosen or selected category (chosen randomly)     
	var chosenCategory;     
	var getHint;    

  	//the chosen word      
 	var word;              
 	var guess;

	//stored guesses            
  	var guesses = [ ];      
  	var lives; 

  	//counts number of correct guesses            
  	var counter; 

  	//number of spaces ('-') in word          
  	var space;              

  	//getting elements by id and assigning them to variables
  	var showLives = document.getElementById("lives");
  	var getHint = document.getElementById("hint");
  	var showClue = document.getElementById("clue");

	//create alphabet letter keyboard buttons
  	var keyboard = function () {
    	myButtons = document.getElementById('keyboard');
    	letters = document.createElement('ul');

		for (var i = 0; i < alphabet.length; i++) {
      		letters.id = 'alphabet';
      		list = document.createElement('li');
      		list.id = 'letter';
      		list.innerHTML = alphabet[i];
      		check();
      		myButtons.appendChild(letters);
      		letters.appendChild(list);
    	}
  	}
  
	//choosing a category
  	var selectCat = function () {
    	if (chosenCategory === categories[0]) {
      		categoryName.innerHTML = "The chosen category is cities";
    	} else if (chosenCategory === categories[1]) {
      		categoryName.innerHTML = "The chosen category is films";
    	} else if (chosenCategory === categories[2]) {
      		categoryName.innerHTML = "The chosen category is food";
    	}
  	}

	//create the hidden word in underscores
  	result = function () {
    	wordHolder = document.getElementById('hiddenWord');
    	correct = document.createElement('ul');

    	for (var i = 0; i < word.length; i++) {
      		correct.setAttribute('id', 'hiddenWord');
      		guess = document.createElement('li');
      		guess.setAttribute('class', 'guess');

      		if (word[i] === "-") {
        		guess.innerHTML = "-";
        		space = 1;
      		} else {
        		guess.innerHTML = "_";
      		}

      		guesses.push(guess);
      		wordHolder.appendChild(correct);
      		correct.appendChild(guess);
    	}
  	}
  
	//displaying player's lives
  	comments = function () {
    	showLives.innerHTML = "You have " + lives + " lives";

    	if (lives < 1) {
      		showLives.innerHTML = "Game Over";
    	}
    	for (var i = 0; i < guesses.length; i++) {
      		if (counter + space === guesses.length) {
        		showLives.innerHTML = "You Win!";
      		}
    	}
  	}

	//function to perform the drawing action for the hangman figure
  	var animate = function () {
    	var drawMe = lives ;
    	drawArray[drawMe]();
  	}

  	//hangman
  	canvas =  function(){
    	myStickman = document.getElementById("stickman");
    	context = myStickman.getContext('2d');
    	context.beginPath();
    	context.strokeStyle = "#6F706F";
    	context.lineWidth = 2;
  	};
  
  	head = function(){
    	myStickman = document.getElementById("stickman");
    	context = myStickman.getContext('2d');
    	context.beginPath();
    	context.arc(60, 25, 15, 0, Math.PI * 2, true);
      context.fillStyle = '#CDFCFF';
      context.fill();
      context.lineWidth = 2;
      context.strokeStyle = '#6F706F';
    	context.stroke();

      //left eye
      context.beginPath();
      context.arc(53, 28, 2, 0, Math.PI * 2, true);
      context.fillStyle = '#6F706F';
      context.fill();
      context.stroke();

      //right eye
      context.beginPath();
      context.arc(64, 25, 2, 0, Math.PI * 2, true);
      context.fillStyle = '#6F706F';
      context.fill();
      context.stroke();
  	}

    torso = function() {
      //positioning torso behind head
      context.globalCompositeOperation='destination-over';
      context.beginPath();
      context.rect(56, 30, 20, 40);
      context.fillStyle = '#6F706F';
      context.fill();
      context.stroke();
    }
    
  	draw = function($pathFromx, $pathFromy, $pathTox, $pathToy) {
    	context.moveTo($pathFromx, $pathFromy);
    	context.lineTo($pathTox, $pathToy);
    	context.stroke(); 
  	}

  	frame1 = function() {
    	draw (0, 150, 190, 150);
  	};
   
  	frame2 = function() {
    	draw (10, 0, 10, 600);
  	};
  
  	frame3 = function() {
    	draw (0, 5, 70, 5);
  	};
  
  	frame4 = function() {
    	draw (60, 5, 60, 15);
  	};
  
  	rightArm = function() {
    	draw (76, 45, 94, 50);
  	};
  
  	leftArm = function() {
    	draw (58, 45, 40, 50);
  	};
  
  	rightLeg = function() {
    	draw (75, 70, 77, 90);
  	};
  
  	leftLeg = function() {
    	draw (60, 70, 58, 90);
  	};
  
  	drawArray = [rightLeg, leftLeg, rightArm, leftArm,  torso,  head, frame4, frame3, frame2, frame1]; 


	//checking if keyboard button is clicked and performs correct action
  	check = function () {
    	list.onclick = function () {
      		var geuss = (this.innerHTML);
      		this.setAttribute("class", "active");
      		this.onclick = null;

      		for (var i = 0; i < word.length; i++) {
        		if (word[i] === geuss) {
          			guesses[i].innerHTML = geuss;
          			counter += 1;
        		} 
      		}
      		var j = (word.indexOf(geuss));

      		if (j === -1) {
        		lives -= 1;
        		comments();
        		animate();
      		} else {
        		comments();
      		}
    	}
  	}
  
	//gameplay
  	play = function () {
    	//categories (cities, films, food)
    	categories = [
        	["new-york-city", "los-angeles", "london", "tokyo", "brussels", "shanghai", "beijing", "paris", "vancouver", "jakarta"],
        	["harry-potter", "finding-nemo", "jaws", "charlie-and-the-chocolate-factory", "the-breakfast-club", "spirited-away", "up", "toy-story", "forrest-gump", "the-shining"],
        	["sushi", "gelato", "banana", "chocolate", "strawberry", "sandwich", "grapes", "cheese-stick", "rice", "burrito"]
    	];

    	chosenCategory = categories[Math.floor(Math.random() * categories.length)];
    	word = chosenCategory[Math.floor(Math.random() * chosenCategory.length)];
    	word = word.replace(/\s/g, "-");
    	keyboard();

    	guesses = [ ];
    	lives = 10;
    	counter = 0;
    	space = 0;
    	result();
    	comments();
    	selectCat();
    	canvas();
  	}

	play();
  
  	//giving a hint
	hint.onclick = function() {
    	hints = [
       		["Skyscraper wonderland", "Starry night", "Historic clock tower", "Neon and futuristic", "Chocolate lovers", "Global financial hub", "The Forbidden City", "Vintage romance", "Shivers up your spine", "Capital of an island"],
        	["Wizards and magic", "Lost fish", "Great white shark", "Chocolate river", "1980's classic", "Anime", "Balloon home", "Talking toys", "RUN", "Here's Johnny!"],
        	["Raw", "Italian dessert", "Also a type of slug", "Solid and liquid", "Fondue please", "Many layers", "Make wine", "Stringy", "Too small to count", "Wrap it up"]
    	];

    	var categoryIndex = categories.indexOf(chosenCategory);
    	var hintIndex = chosenCategory.indexOf(word);
    	showClue.innerHTML = "Clue: " +  hints [categoryIndex][hintIndex];
  	};

    //resetting the game
	document.getElementById('reset').onclick = function() {
    	correct.parentNode.removeChild(correct);
    	letters.parentNode.removeChild(letters);
    	showClue.innerHTML = "";
    	context.clearRect(0, 0, 400, 400);
    	play();
  	}
}