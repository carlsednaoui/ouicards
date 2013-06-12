$(document).ready(function() {
  initializeHandlers();
  updateSaveButtonCopy();
});

function initializeHandlers() {
  // If answer is hidden, show it. Otherwise create a new question and insert it.
  $('.generate').on('click', function() {
    $('.answer').is(':visible') ? changeQuestion(flashcards) : $('.answer').show();
  });

  // Same thing with the loop-thru-saved-questions button.
  $('.loop-thru-saved-questions').on('click', function() {
    $('.answer').is(':visible') ? changeQuestion(getFromLocalStorage()) : $('.answer').show();
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
}

// Change the question/ answer.
function changeQuestion(array) {
  // Prevent implosion if users tries to loop thru 0 saved questions
  if (!array) { console.log('what are you doing?'); return; }

  var randomNumber = generateRandomNumber(array);
  var questionObject = buildQuestionHTML(randomNumber);

  $('.answer').hide();
  $('.question').html(questionObject.question);
  $('.answer').html(questionObject.answer);
}

function generateRandomNumber(array) {
  // If the array passed is === flashcards, just create a random number
  // otherwise extract a random number from the array.
  var randomNumber = array === flashcards ?
      Math.floor(Math.random() * array.length) :
      array[Math.floor(Math.random() * array.length)];
  return randomNumber;
}

function buildQuestionHTML(questionNumber) {
  var questionEl, answerEl;

  questionEl = document.createElement('p');
  questionEl.id = questionNumber;
  questionEl.innerHTML = flashcards[questionNumber].question;

  answerEl = document.createElement('p');
  answerEl.innerHTML = flashcards[questionNumber].answer.replace(/\n/g, '<br>');

  return {question: questionEl, answer: answerEl};
}

function saveToLocalStorage(questionID) {
  var savedCards = getFromLocalStorage();

  // Not sure if there's a better way to do this without if/ else.
  if ( savedCards && (savedCards.indexOf(questionID) === -1) ) {
    localStorage.savedQuestions = savedCards + ',' + questionID;
  } else if ( !savedCards ) {
    localStorage.savedQuestions = questionID;
  }
}

function getFromLocalStorage() {
  // Used to avoid JS errors. Not sure if this is the best way to do this.
  if (!localStorage.savedQuestions) { return; }

  var savedQuestions = localStorage.savedQuestions.split(',');
  var savedQuestionsInt = savedQuestions.map(function(el) { return parseInt(el, 10); });
  return savedQuestionsInt;
}

function clearlLocalStorage() {
  delete localStorage.savedQuestions;
  updateSaveButtonCopy();
}

function updateSaveButtonCopy() {
  if (getFromLocalStorage()) {
    $('.save').html("Saved: " + getFromLocalStorage().length + " question");
  } else {
    $('.save').html("Save Question");
  }
}