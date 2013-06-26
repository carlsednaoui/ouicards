document.getElementById('pre-load-button').onclick = function() {
  document.getElementById('questions-input-area').style.display = 'block';
  document.getElementById('load-questions').style.display = 'block';
  document.getElementById('pre-load-button').style.display = 'none';
};

document.getElementById('load-questions').onclick = function() {
  var flashcards = getNewQuestions();

  initializeHandlers(flashcards);
  console.log('new questions loaded');
};

function getNewQuestions() {
  var allQuestions = document.getElementById('questions-input-area').value.split('\n');
  var flashcards = [];
  allQuestions.forEach(function(card) {
    var parsedCard = card.split('\t');
    var newQuestionAnswerPair = {question: parsedCard[0], answer: parsedCard[1]};
    flashcards.push(newQuestionAnswerPair);
  });

  return flashcards;
}
