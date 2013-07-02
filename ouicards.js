(function(exports) {
  exports.ouicards = {
    currentBucket: '',
    flashcards: [],
    bucketA: [],
    bucketB: [],
    bucketC: [],
    counter: 1,

    loadFromArray: function(array) {
      this.flashcards = array;
      this.reset();
      this.currentBucket = this.bucketA;
      this.saveToLS();
    },
    loadFromBrowser: function(selector, delimiter) {
      var flashcards = [],
          userInput = $(selector).val().split('\n');

      // Get rid of empty questions
      userInput = userInput.filter(function(card) {
         return card !== "";
       });

      userInput.forEach(function(card) {
        var parsedCard = card.split(delimiter);
        flashcards.push({question: parsedCard[0], answer: parsedCard[1]});
      });

      this.flashcards = flashcards;
      this.reset();
      this.currentBucket = this.bucketA;
      this.saveToLS();
      return this.getFromLS();
    },
    next: function() {
      var newQuestion;

      if (this.counter % Math.ceil(this.flashcards.length / 3) +1 === 0 && this.bucketC.length !== 0) {
        console.log('in c');
        console.log(this.counter);
        newQuestion = this.getQuestion(this.bucketC);
        this.currentBucket = this.bucketC;
      } else if (this.counter % Math.ceil(this.flashcards.length / 5) +1 === 0 && this.bucketB.length !== 0) {
        newQuestion = this.getQuestion(this.bucketB);
        this.currentBucket = this.bucketB;
      } else if (this.bucketA.length !== 0) {
        newQuestion = this.getQuestion(this.bucketA);
        this.currentBucket = this.bucketA;
      } else if (this.bucketB.length !== 0) {
        newQuestion = this.getQuestion(this.bucketB);
        this.currentBucket = this.bucketB;
      } else {
        newQuestion = this.getQuestion(this.bucketC);
        this.currentBucket = this.bucketC;
      }

      // Reset counter if it's greater than flashcard count, other wise ++ it
      this.counter >= this.flashcards.length ? this.counter = 1 : this.counter++;
      this.currentQuestion = newQuestion;
      return newQuestion;
    },
    correct: function() {
      if (this.currentBucket === this.bucketA) {
        this.moveQuestion(this.bucketA, this.bucketB);
      } else if (this.currentBucket === this.bucketB) {
        this.moveQuestion(this.bucketB, this.bucketC);
      } else if (this.currentBucket === this.bucketC) {
        this.moveQuestion(this.bucketC, this.bucketC);
      } else
        console.log('hmm, you should not be here');
      this.saveToLS();
    },
    wrong: function() {
      if (this.counter === 1)
        return;
      this.moveQuestion(this.currentBucket, this.bucketA);
      this.saveToLS();
    },
    moveQuestion: function(fromBucket, toBucket) {
      toBucket.push(fromBucket.shift());
    },
    getQuestion: function(bucket) {
      // Prevent from looping thru an empty array
      if (!bucket || bucket.length === 0) {
        console.log("You can't load an empty set of questions.");
        return;
      }

      return this.buildQuestionHTML(bucket[0]);
    },
    buildQuestionHTML: function(rawQuestion) {
      var questionEl, answerEl;

      questionEl = document.createElement('p');
      questionEl.innerHTML = rawQuestion.question;

      answerEl = document.createElement('p');
      answerEl.innerHTML = rawQuestion.answer.replace(/\n/g, '<br>');

      return {question: questionEl, answer: answerEl};
    },
    saveToLS: function() {
      localStorage.flashcards = JSON.stringify(this.flashcards);
      localStorage.bucketA = JSON.stringify(this.bucketA);
      localStorage.bucketB = JSON.stringify(this.bucketB);
      localStorage.bucketC = JSON.stringify(this.bucketC);
    },
    getFromLS: function() {
      this.flashcards = JSON.parse(localStorage.flashcards || '[]');
      this.bucketA    = JSON.parse(localStorage.bucketA    || '[]');
      this.bucketB    = JSON.parse(localStorage.bucketB    || '[]');
      this.bucketC    = JSON.parse(localStorage.bucketC    || '[]');
      this.currentBucket = this.bucketA.length ? this.bucketA : this.bucketB.length ? this.bucketB : this.bucketC.length ? this.bucketC : '';
      this.counter = 1;

      return {flashcards: this.flashcards, bucketA: this.bucketA, bucketB: this.bucketB, bucketC: this.bucketC};
    },
    reset: function() {
      this.bucketA = this.flashcards.slice(0);
      this.bucketB = [];
      this.bucketC = [];
      this.counter = 1;
      this.currentBucket = '';
      this.saveToLS();
    }
  };
})(this);
