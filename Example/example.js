document.getElementById('pre-load-button').onclick = function() {
  showQuestionInput();
};

document.getElementById('load-questions').onclick = function() {
  initializeOuicardsHandlers(getUserQuestions());
};

function showQuestionInput() {
  document.getElementById('questions-input-area').style.display = 'block';
  document.getElementById('load-questions').style.display = 'block';
  document.getElementById('pre-load-button').style.display = 'none';
}

function getUserQuestions() {
  var flashcards = [],
      userInput = document.getElementById('questions-input-area').value.split('\n');

  // Get rid of empty questions
  userInput = userInput.filter(function(card) {
    return card !== "";
  });

  userInput.forEach(function(card) {
    var parsedCard = card.split('\t');
    flashcards.push({question: parsedCard[0], answer: parsedCard[1]});
  });

  return flashcards;
}
