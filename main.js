$(document).ready(function() {

  // If answer is hidden, show it. Otherwise create a new question and insert it.
  $('.generate').on('click', function() {
    $('.answer').is(':visible') ? changeQuestion(flashcards) : $('.answer').show();
  });

  // Same thing with the loop-thru-saved-questions button.
  $('.loop-thru-saved-questions').on('click', function() {
    $('.answer').is(':visible') ? changeQuestion(flashcards, getFromLocalStorage()) : $('.answer').show();
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
      saveToLocalStorage(questionID);
      $('.save').html("Saved: " + getFromLocalStorage().length + " question");
    }
  });

  // Update button copy if we have saved questionss.
  if (getFromLocalStorage()) {
    $('.save').html("Saved: " + getFromLocalStorage().length + " question");
  }
});

// Generate a new question/ answer object.
function createQuestion(questions, array) {
  var randomNumber, questionParagraph, answerParagraph;

  // If you pass an array, pick a random number from it. Otherwise create a random number based on the numer of questions passed.
  randomNumber = array ? array[Math.floor(Math.random() * array.length)] : Math.floor(Math.random() * questions.length);

  questionParagraph = document.createElement('p');
  questionParagraph.id = randomNumber;
  questionParagraph.innerHTML = getQuestion(randomNumber);

  answerParagraph = document.createElement('p');
  answerParagraph.innerHTML = getAnswer(randomNumber).replace(/\n/g, '<br>'); // replace line breaks with <br> tags

  return {question: questionParagraph, answer: answerParagraph};
}

// Change the actual page HTML with a new question/ answer.
function changeQuestion(questions, array) {
  var questionObject = createQuestion(questions, array);

  $('.answer').hide();
  $('.question').html(questionObject.question);
  $('.answer').html(questionObject.answer);
}

function getQuestion(questionNumber) {
  return flashcards[questionNumber].question;
}

function getAnswer(questionNumber) {
  return flashcards[questionNumber].answer;
}

function saveToLocalStorage(questionID) {
  var savedCards = getFromLocalStorage();

  // Not sure if there's a better way to do this without if/ else.
  if ( savedCards && (savedCards.indexOf(questionID) === -1) ) {
    localStorage.saved_questions = savedCards + ',' + questionID;
  } else if ( !savedCards ) {
    localStorage.saved_questions = questionID;
  }
}

function getFromLocalStorage() {
  // Used to avoid JS errors. Not sure if this is the best way to do this.
  if (!localStorage.saved_questions) {
    return;
  }
  var savedQuestions = localStorage.saved_questions.split(',');
  var savedQuestionsInt = savedQuestions.map(function(el) { return parseInt(el, 10); });
  return savedQuestionsInt;
}

function clearlLocalStorage() {
  delete localStorage.saved_questions;
}