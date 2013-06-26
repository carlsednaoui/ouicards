(function(exports) {
  exports.ouicards = {
    changeQuestion: function(arrayForRdnNm, flashcards, qSelector, aSelector) {
      // Prevent user from looping thru an empty arrayForRdnNm or empty flashcards
      if (!arrayForRdnNm || arrayForRdnNm.length === 0 || !flashcards || flashcards.length === 0 ) {
        console.log('what are you doing?');
        return;
      }

      var randomNumber = this.generateRandomNumber(arrayForRdnNm, flashcards);
      var currentQuestionId = parseInt($('.question p').attr('id'), 10);

      // Ensure same question is not displayed twice in a row
      // Do this only if we have more than 1 question in our arrayForRdnNm
      while (randomNumber === currentQuestionId && arrayForRdnNm.length > 1) {
        randomNumber = this.generateRandomNumber(arrayForRdnNm, flashcards);
      }

      var questionObject = this.buildQuestionHTML(randomNumber, flashcards);

      $(aSelector).hide();
      $(qSelector).html(questionObject.question);
      $(aSelector).html(questionObject.answer);
    },
    generateRandomNumber: function(arrayForRdnNm, flashcards) {
      // If the arrayForRdnNm passed is === flashcards, just create a random number
      // otherwise extract a random number from the arrayForRdnNm.
      var randomNumber = arrayForRdnNm === flashcards ?
          Math.floor(Math.random() * arrayForRdnNm.length) :
          arrayForRdnNm[Math.floor(Math.random() * arrayForRdnNm.length)];
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