$(document).ready(function() {

	var startScreen;
	var gameHTML;
	var correct = 0;
	var incorrect = 0;
	var unanswered = 0;
	var questionCounter = 0;
	var counter = 20;
	var clock;
	var selecterAnswer;
	var questionArray = [
		{ 	
			question: "How old was Olivia Newton John when she filmed Grease?",
			answers: [
				{text: "28", isCorrect: true},
				{text: "21", isCorrect: false},
				{text: "16", isCorrect: false},
				{text: "34", isCorrect: false}
			]
		},
		{	
			question: "Olivia Newton John and John Travolta starred together in a second movie, what is the name of that movie?",
			answers: [
				{text: "Sordid Lives", isCorrect: false},
				{text: "Two of a Kind", isCorrect: true},
				{text: "Xanadu", isCorrect: false},
			]
		},
		{
			question: "What is Olivia Newton Johns natural haircolor?",
			answers: [
				{text: "Red", isCorrect: false},
				{text: "Blonde", isCorrect: true},
				{text: "Brown", isCorrect: false}
			]
		},
		{ 
			question: "Where is Olivia Newton John from?",
			answers: [
				{text: "America", isCorrect: false},
				{text: "Ireland", isCorrect: false},
				{text: "England", isCorrect: false},
				{text: "Australia", isCorrect: true}
			]
		},
		{
			question: "Is Olivia Newton John the best actress in the world?",
			answers: [
				{text: "No", isCorrect: true},
				{text: "Yes", isCorrect: false}
			]
		},
		{
			question: "How old is Olivia Newton John today?",
			answers: [
				{text: "55", isCorrect: false},
				{text: "49", isCorrect: false},
				{text: "70", isCorrect: true},
				{text: "82", isCorrect: false}
			]
		},
		{ 
			question: "Olivia Newton John had a hit song that was not from the Grease soundtrack. What's the name of the song?",
			answers: [
				{text: "Make Me Move", isCorrect: false},
				{text: "Physical", isCorrect: true},
				{text: "Old Town Road", isCorrect: false},
				{text: "You're the One That I Want", isCorrect: false}
			]	
		},
		{
			question: "How many Grammy's does Olivia Newton John have?",
			answers: [
				{text: "4", isCorrect: true},
				{text: "1", isCorrect: false},
				{text: "0", isCorrect: false}
			]
		},
		{
			question: "She is married to John Newton Olivia",
			answers: [
				{text: "False", isCorrect: true},
				{text: "True", isCorrect: false}
				]
			},
			{
			question: "A health scare in 1992 turned Olivia into an activist for research and testing for what condition?",
			answers: [
			 {text: "Parkinsons", isCorrect: false},
			 {text: "Chronic Foot Fungus", isCorrect: false},
			 {text: "ALS", isCorrect: false},
			 {text: "Cancer", isCorrect: true}
			]
		}
	];

	
	function generateHTML() {
		var timeRemainingText = "<p class='timerText text-center'>Time Remaining: <span id='timer'>20</span></p>";
		var questionText = "<p class='questionText text-center'>" + questionArray[questionCounter].question + "</p>";
		gameHTML = timeRemainingText + questionText;
		$(".mainArea").html(gameHTML);
		for (var i = 0; i < questionArray[questionCounter].answers.length; i++) {
			var answerButton = $("<button>");
			answerButton.addClass("answer btn btn-block text-center");
			answerButton.attr("isCorrect", questionArray[questionCounter].answers[i].isCorrect);
			answerButton.html(questionArray[questionCounter].answers[i].text);
			$(".mainArea").append(answerButton);
		}
	}

	function generateWin() {
		correct++;
		var correctAnswerText = "<p class='correctText text-center'>CORRECT!</p>";
		var imgHTML = "<img class='center-block imgCorrect' src='./Assets/correct.jpeg'>";
		gameHTML = correctAnswerText + imgHTML;
		$(".mainArea").html(gameHTML);
		setTimeout(nextDisplay, 3000);  
	}

	function generateLoss() {
		incorrect++;
		var wrongAnswerText = "<p class='wrongText text-center'>INCORRECT</p>";
		var imgHTML = "<img class='center-block imgWrong' src='./Assets/incorrect.jpg'>";
		gameHTML = wrongAnswerText + imgHTML;
		$(".mainArea").html(gameHTML);
		setTimeout(nextDisplay, 3000); 
	}

	function generateLossAtTimeOut() {
		unanswered++;
		var timeOutText = "<p class='timeOutText text-center'>TIME'S UP!</p>";
		var imgHTML = "<img class='center-block imgWrong' src='./Assets/redx.pgn'>";
		gameHTML =  timeOutText + imgHTML;
		$(".mainArea").html(gameHTML);
		setTimeout(nextDisplay, 3000);  
	}

	function timer() {
		clock = setInterval(twentySeconds, 1000);
		function twentySeconds() {
			if (counter === 0) {
				clearInterval(clock);
				generateLossAtTimeOut();
			} else if (counter > 0) {
				counter--;
			}
			$("#timer").html(counter);
		}
	}

	// function that generates html for the next screen, increments the question counter, and resets timer
	function nextDisplay() {
		if (questionCounter < questionArray.length - 1) {
			questionCounter++;
			generateHTML();
			counter = 20;
			timer();
		} else {
			finalScreen();
		}
	}

	function finalScreen() {
		var finishedText = "<p class='finishedText text-center'>Here's how you did!</p>";
		var summaryCorrectHTML = "<p class='summaryCorrect text-center'>Correct Answers: " + correct + "</p>";
		var summaryWrongHTML = "<p class='summaryWrong text-center'>Wrong Answers: " + incorrect + "</p>";
		var summaryUnansweredHTML = "<p class='summaryUnanswered text-center'>Unanswered: " + unanswered + "</p>";
		var resetButtonHTML = "<button class='resetButton btn btn-primary btn-lg btn-block text-center' type='button'>PLAY AGAIN</button>";
		gameHTML = finishedText + summaryCorrectHTML + summaryWrongHTML + summaryUnansweredHTML + resetButtonHTML;
		$(".mainArea").html(gameHTML);
	}

	function resetGame() {
		questionCounter = 0;
		correct = 0;
		incorrect = 0;
		unanswered = 0;
		counter = 20;
		generateHTML();
		timer();
	}

	// Function that creates the start button and initial screen
	function initialScreen() {
		var initialText = "<p class='initialText text-center'>Welcome to Trivia Newton John</p> <p class='initialText text-center'>Test your knowledge of Olivia Newton John. There are 10 questions total and you will have 20 seconds to answer each one!</p>";
		var startButtonHTML = "<button class='startButton btn btn-primary btn-lg btn-block text-center' type='button'>Start Quiz</button>";
		startScreen = initialText + startButtonHTML;
		$(".mainArea").html(startScreen);
	}

	// When the start button is clicked:
	$("body").on("click", ".startButton", function(event){ 
		generateHTML();
		timer();
	});

	// When an answer is clicked:
	$("body").on("click", ".answer", function(event){
		selectedAnswer = $(this).attr("isCorrect");
		console.log(selectedAnswer);

		if (selectedAnswer === "true") { // evaluates if this is the correct answer
			clearInterval(clock);
		 	generateWin();
		} else { 	// then it's the wrong answer
			clearInterval(clock);
			generateLoss();
		}

	}); 

	// When the Play Again button is clicked:
	$("body").on("click", ".resetButton", function(event){
		resetGame();
	}); 

	initialScreen();

});  

