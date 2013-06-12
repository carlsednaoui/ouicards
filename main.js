$(document).ready(function() {

  // If answer is hidden, show it. Otherwise create a new question and insert it.
  $('.generate').on('click', function() {
    $('.answer').is(':visible') ? createAndChangeQuestion(flashcards) : $('.answer').show();
  });

  // Same thing with the loop-thru-saved-questions button.
  $('.loop-thru-saved-questions').on('click', function() {
    $('.answer').is(':visible') ? createAndChangeQuestion(flashcards, getQuestionsFromLocalStorage()) : $('.answer').show();
  });

  // Display answer if user clicks on question.
  $('.question').on('click', function() {
    $('.answer').show();
  });

  // Clear the local storage -- to reset saved questions.
  $('.clear-local-storage').on('click', function() {
    clearlLocalStorage();
  });

  // Save question to local storage.
  $('.save').on('click', function() {
    var questionID = parseInt($('.question p').attr('id'));

    if (questionID) {
      saveQuestionToLocalStorage(questionID);
      $('.save').html("Saved: " + getQuestionsFromLocalStorage().length + " question");
    }
  });

  // Update button copy if we have saved questionss.
  if (getQuestionsFromLocalStorage()) {
    $('.save').html("Saved: " + getQuestionsFromLocalStorage().length + " question");
  }
});

// Generate a new question/ answer object.
function createRandomQuestion(questions, array) {
  var randomNumber, questionParagraph, answerParagraph;

  // If you pass an array, pick a random number from it. Otherwise create a random number based on the numer of questions passed.
  randomNumber = array ? array[Math.floor(Math.random() * array.length)] : Math.floor(Math.random() * questions.length);
  console.log(randomNumber);

  questionParagraph = document.createElement('p');
  questionParagraph.id = randomNumber;
  questionParagraph.innerHTML = getQuestion(randomNumber);

  answerParagraph = document.createElement('p');
  answerParagraph.innerHTML = getAnswer(randomNumber).replace(/\n/g, '<br>'); // replace line breaks with <br> tags

  return {question: questionParagraph, answer: answerParagraph};
}

// Change the actual page HTML with a new question/ answer.
function createAndChangeQuestion(questions, array) {
  var questionAnswerObject = createRandomQuestion(questions, array);

  $('.answer').hide();
  $('.question').html(questionAnswerObject.question);
  $('.answer').html(questionAnswerObject.answer);
}

function getQuestion(questionNumber) {
  return flashcards[questionNumber].question;
}

function getAnswer(questionNumber) {
  return flashcards[questionNumber].answer;
}

function createRandomQuestionFromArrayIDS(arrayIDS) {
  var randomNumber = Math.floor(Math.random() * arrayIDS.length);
  $('.question').html(getQuestion(arrayIDS[randomNumber]));
  $('.answer').html("<b>Answer:</b> <br/>" + getAnswer(arrayIDS[randomNumber]).replace(/\n/g,"<br>"));
}

function saveQuestionToLocalStorage(questionID) {
  var savedCards = getQuestionsFromLocalStorage();

  // Not sure if there's a better way to do this without if/ else.
  if ( savedCards && (savedCards.indexOf(questionID) === -1) ) {
    localStorage.saved_naturalization_flashcard_questions = savedCards + ',' + questionID;
  } else if ( !savedCards ) {
    localStorage.saved_naturalization_flashcard_questions = questionID;
  }
}

function getQuestionsFromLocalStorage() {
  // Used to avoid JS errors. Not sure if this is the best way to do this.
  if (!localStorage.saved_naturalization_flashcard_questions) {
    return;
  }
  var savedQuestionArray = localStorage.saved_naturalization_flashcard_questions.split(',');
  var savedQuestionArrayInIntegers = savedQuestionArray.map(function(el) { return parseInt(el, 10); });
  return savedQuestionArrayInIntegers;
}

function clearlLocalStorage() {
  delete localStorage.saved_naturalization_flashcard_questions;
}