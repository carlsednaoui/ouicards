$(document).ready(function() {
  initializeHandlers(ouiCardsFlashcards);
  ouicards.updateSaveButtonCopy('.save');
});

function initializeHandlers(flashcards) {
    // Unbind all events, in case the user loads new flashcard questions
    $('.generate').unbind();
    $('.loop-thru-saved-questions').unbind();
    $('.question').unbind();
    $('.clear-local-storage').unbind();
    $('.save').unbind();
    $('.answer').unbind();

    // If answer is hidden, show it. Otherwise create a new question and insert it.
    $('.generate').on('click', function() {
      $('.answer').is(':visible') ? ouicards.changeQuestion(flashcards, flashcards, '.question', '.answer') : $('.answer').show();
    });

    // Same thing with the loop-thru-saved-questions button.
    $('.loop-thru-saved-questions').on('click', function() {
      $('.answer').is(':visible') ? ouicards.changeQuestion(ouicards.getFromLocalStorage(), flashcards, '.question', '.answer') : $('.answer').show();
    });

    // Display answer if user clicks on question.
    $('.question').on('click', function() {
      $('.answer').show();
    });

    // Clear the local storage -- to reset saved questions.
    $('.clear-local-storage').on('click', function() {
      ouicards.clearLocalStorage('.save');
    });

    // Save question to local storage.
    $('.save').on('click', function() {
      var questionID = parseInt($('.question p').attr('id'), 10);

      if (!isNaN(questionID)) {
        ouicards.saveToLocalStorage(questionID);
        $('.save').html("Saved: " + ouicards.getFromLocalStorage().length + " question");
      }
    });

    // Show custom question input area
    $('#pre-load-button').click(function(){
      $('#questions-input-area').show();
      $('#load-questions').show();
      $('#pre-load-button').hide();
    });

    // Get custom questions from input area
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

   // Reload this whole thing if a user loads new questions in
   $('#load-questions').click(function(){
     initializeHandlers( getUserQuestions() );
   });
}
