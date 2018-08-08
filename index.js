//activate strict mode
'use strict';

//Set up variables for quiz progress and score. Start at negative to allow loop to work to 
//display each page at the right time
let currentScore = -1;
let questionNum = -1;

 
const quizQuestions = [
 
  {
    question: 'Who was the first costumed superhero?',
    answers: [ 'Batman', 'Spiderman', 'Superman', 'The Phantom'],
    correct: 'The Phantom',
  },
  {  
    question: 'What superteam includes a sentient tree-like creature?',
    answers: ['The Justice League','Doom Patrol', 'The Guardians of the Galaxy', 'The Knights of Everdeen', 'Teen Titans'],
    correct: 'The Guardians of the Galaxy',
  },  
  {
    question: 'What is Wolverine\'s real name?',
    answers: ['Mark','Leon','Logan','Rick'],
    correct: 'Logan',
  },
  {
    question: 'What is the name of Doctor Strange\'s home in Greenwich Village?',
    answers: ['Verdant Village', 'The Sanctuary', 'Sanctum Santorum', 'Drathmar'],
    correct: 'Sanctum Santorum',
  },
  { 
    
    question: 'In what comic issue does Batman first encounter Joker?',
    answers: ['Batman #1','Detective Comics #36', 'Batman #2', 'Detective Comics #21'],
    correct: 'Batman #1',
  },
  { 
    question: 'Which of the following does Batman NOT carry in his utility belt?',
    answers: ['Reading Glasses','A crayon', 'Shark Repellent', 'A backup costume'],
    correct: 'Reading Glasses',
  },
  {
    question: 'What full sized dinosaur does Batman keep in the Batcave?',
    answers: ['Raptor', 'Tyrannosaurus Rex', 'Stegosaurus', 'Triceratops'],
    correct: 'Tyrannosaurus Rex',
  },
  {    
    question: 'What superhero was a star quarterback at Gotham University?',
    answers: ['Batman', 'Robin', 'Batgirl', 'Booster Gold'],
    correct: 'Booster Gold',
  },
  {
    question: 'Which villain made the most appearances in the 1960s Batman TV series?',
    answers: ['Catwoman', 'Penguin', 'Joker', 'Riddler'],
    correct: 'Joker',
  },
  {
    question: 'When was Marvel Comics character Iron Man first introduced?',
    answers: ['1963', '1947', '1984', '1953'],
    correct: '1963',
  }
];

//Need function that will bring in our html that hold our questions and multiple choice options while also removing the start screen
function quizLayout() {
  if(questionNum < quizQuestions.length) {
    console.log(quizQuestions.length);
    return `<div class="quiz-template">
        <form class="quiz-form">
          <fieldset>
            <legend><h2>${quizQuestions[questionNum].question}</h2></legend>
            
            <div class="answerChoices">
              
              <input value="${quizQuestions[questionNum].answers[0]}" type="button" required>
            </div>

            <div class="answerChoices">
              
              <input value="${quizQuestions[questionNum].answers[1]}" type="button"  required>
            </div>

            <div class="answerChoices">
              
              <input value="${quizQuestions[questionNum].answers[2]}" type="button" required>
            </div>

            <div class="answerChoices">
            <input type="button" value ="${quizQuestions[questionNum].answers[3]}"required></>
            </div>  
            
              
            
          <button type="submit" class="send-answer">Submit!</button>
            
          </fieldset>
        </form>
        
        </div>`;


  } else {
    renderQuizResults();
    $('.questionNum').text(10);
        
  }

}

//Function that will increase the score
function increaseScoreCounter() {
  currentScore++;
}

//Function that will increase our question progress number
function questionProgressCounter() {
  questionNum++;
  $('.questionNum').text(questionNum+1);
}

//Sets up main event listener to start the quiz when the user hits start
function quizStart() {
  $('.start-quiz-button-js').on('click', function() {
    questionProgressCounter();
    console.log("User has begun the quiz!");
    renderQuiz();
    activeAnswer();
    selectAnswer();
  });   
    
} 
//Pushes in our HTML for the quiz questions and answers
function renderQuiz() {
  $('.start-menu-js').html(quizLayout());
}

//Function will display the html for correct answer or incorrect answer
function rightAnswer() {
  $('.start-menu-js').html(rightAnswerLayout());
}

function wrongAnswer() {
  $('.start-menu-js').html(wrongAnswerLayout());
}

//This function will take the user's answer and deem it correct or incorrect and then will show the right feedback
function selectAnswer() {
  activeAnswer();
  $('form').on('submit', function(event) {
    event.preventDefault();
    let choice = $('input.active').val();
    let correctAnswer =`${quizQuestions[questionNum].correct}`;
    console.log("User submitted their answer");
      if (choice === correctAnswer) {
        rightAnswer();
      } else {
        wrongAnswer();
      }
  });
}

//This function watches our answers and applies the active class for visual effect and also to show the user that they have selected that answer
function activeAnswer() {
  $('input[type=button]').click(function() {
    $('input[type=button]').removeClass('active');
    $(this).addClass('active');
  });
}

//This will push in the positive feedback elements and also increase the user's score
function rightAnswerLayout() {
  increaseScoreCounter();
  $('.currentScore').text(currentScore+1);
  return `<div class="correct-answer-layout">
      <h2>BAM! You got it right!</h2>
      <button type=button class="proceed-js">Next</button>
    </div>`;
}

//This function shows the user they were incorrect and gives the correct answer
function wrongAnswerLayout() {
  return `<div class="wrong-answer-layout">
      <h2>Great Scott Batman! Wrong answer! </br> The correct choice was ${quizQuestions[questionNum].correct}</h2>
      <button type=button class="proceed-js">Next</button>
   </div>`
}

//Event listener to get to the next questions
function nextQuestionButtonHandler() {
  $('.start-menu-js').on('click', '.proceed-js', function(event) {
    questionProgressCounter();
    renderQuiz();
    selectAnswer();
  });

}

//Function to display final score and allow a restart
function renderQuizResults() {
  $('.start-menu-js').html(`<div class="results-page">
  <h2>Your final score is ${currentScore+1} out of 10!</h2>
  <button type="button" class="restart-button">Try Again</button>
  </div>`)
  restartQuiz();
}

//Adds the ability to restart the quiz from the final score display page
function restartQuiz() {
  $('.start-menu-js').on('click', '.restart-button', function(event) {
    location.reload();
  });
}

//Function that pulls all the others together and then call the program to start
function comicQuiz() {
  quizStart();
  activeAnswer();
  selectAnswer();
  nextQuestionButtonHandler();
  restartQuiz();  
}

comicQuiz();