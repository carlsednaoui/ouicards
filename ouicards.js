(function(exports) {
  exports.ouicards = {
    changeQuestion: function(questionsArray, flashcards, questionElSelector, answerElSelector) {
      // Prevent user from looping thru an empty questionsArray or empty flashcards
      if (!questionsArray || questionsArray.length === 0 || !flashcards || flashcards.length === 0 ) {
        console.log('what are you doing?');
        return;
      }

      var randomNumber = this.generateRandomNumber(questionsArray, flashcards);
      var currentQuestionId = parseInt($('.question p').attr('id'), 10);

      // Ensure same question is not displayed twice in a row
      // Do this only if we have more than 1 question in our questionsArray
      while (randomNumber === currentQuestionId && questionsArray.length > 1) {
        randomNumber = this.generateRandomNumber(questionsArray, flashcards);
      }

      var questionObject = this.buildQuestionHTML(randomNumber, flashcards);

      $(answerElSelector).hide();
      $(questionElSelector).html(questionObject.question);
      $(answerElSelector).html(questionObject.answer);
    },
    generateRandomNumber: function(questionsArray, flashcards) {
      // If the questionsArray passed is === flashcards, just create a random number
      // otherwise extract a random number from the questionsArray.
      var randomNumber = questionsArray === flashcards ?
          Math.floor(Math.random() * questionsArray.length) :
          questionsArray[Math.floor(Math.random() * questionsArray.length)];
      return randomNumber;
    },
    buildQuestionHTML: function(questionNumber, flashcards) {
      var questionEl, answerEl;

      questionEl = document.createElement('p');
      questionEl.id = questionNumber;
      questionEl.innerHTML = flashcards[questionNumber].question;

      answerEl = document.createElement('p');
      answerEl.innerHTML = flashcards[questionNumber].answer.replace(/\n/g, '<br>');

      return {question: questionEl, answer: answerEl};
    },
    saveToLocalStorage: function(questionID) {
      var savedCards = this.getFromLocalStorage();

      // Not sure if there's a better way to do this without if/ else.
      if ( savedCards && (savedCards.indexOf(questionID) === -1) && !isNaN(questionID) ) {
        localStorage.savedQuestions = savedCards + ',' + questionID;
      } else if ( !savedCards && !isNaN(questionID) ) {
        localStorage.savedQuestions = questionID;
      }
    },
    getFromLocalStorage: function() {
      // Used to avoid JS errors. Not sure if this is the best way to do this.
      if (!localStorage.savedQuestions) { return; }

      var savedQuestions = localStorage.savedQuestions.split(',');
      var savedQuestionsInt = savedQuestions.map(function(el) { return parseInt(el, 10); });
      return savedQuestionsInt;
    },
    clearLocalStorage: function(saveButtonSelector) {
      delete localStorage.savedQuestions;
      this.updateSaveButtonCopy(saveButtonSelector);
    },
    updateSaveButtonCopy: function(saveButtonSelector) {
      if (this.getFromLocalStorage()) {
        $(saveButtonSelector).html("Saved: " + this.getFromLocalStorage().length + " question");
      } else {
        $(saveButtonSelector).html("Save Question");
      }
    }
  };
})(this);