;(function(exports) {
  function loadFromArray(array) {
    ouicards.flashcards = array;
    resetBuckets();
  }

  function loadFromBrowser(selector, delimiter) {
    var flashcards = [],
        userInput  = $(selector).val().split('\n');

    // Get rid of empty questions
    userInput = userInput.filter(function(card) {
       return card !== "";
     });

    if (userInput.length === 0) {
      console.log('There are no flashcards to upload.');
      return;
    }

    userInput.forEach(function(card) {
      var parsedCard = card.split(delimiter);
      flashcards.push({question: parsedCard[0], answer: parsedCard[1]});
    });

    ouicards.flashcards = flashcards;
    resetBuckets();
    return getFromLS();
  }

  function next() {
    var newQuestion,
        bigInterval   = Math.ceil(ouicards.flashcards.length / 3) + 1,
        smallInterval = Math.ceil(ouicards.flashcards.length / 6) + 1;

    // Show an answer from bucket C once every bigInterval 
    // So long as Bucket C it's not empty
    if (ouicards.counter % bigInterval === 0 && ouicards.bucketC.length !== 0) {
      newQuestion = getQuestion(ouicards.bucketC);
      ouicards.currentBucket = ouicards.bucketC;

    // Show an answer from bucket B once every smallInterval
    // So long as Bucket B it's not empty
    } else if (ouicards.counter % smallInterval === 0 && ouicards.bucketB.length !== 0) {
      newQuestion = getQuestion(ouicards.bucketB);
      ouicards.currentBucket = ouicards.bucketB;

    // Show an answer from Bucket A, so long as it's not empty
    } else if (ouicards.bucketA.length !== 0) {
      newQuestion = getQuestion(ouicards.bucketA);
      ouicards.currentBucket = ouicards.bucketA;

    // Show an answer from Bucket B, so long as it's not empty
    } else if (ouicards.bucketB.length !== 0) {
      newQuestion = getQuestion(ouicards.bucketB);
      ouicards.currentBucket = ouicards.bucketB;

    // Show a question from Bucket C, so long as it's not empty
    } else if (ouicards.bucketC.length !== 0) {
      newQuestion = getQuestion(ouicards.bucketC);
      ouicards.currentBucket = ouicards.bucketC;
    } else {
      console.log('There was a serious problem with ouicards. You should never see ');
    }

    // Reset ouicards.counter if it's greater than flashcard count, otherwise ++ it
    ouicards.counter >= ouicards.flashcards.length ? ouicards.counter = 1 : ouicards.counter++;
    return newQuestion;
  }

  function correct() {
    if (ouicards.currentBucket === ouicards.bucketA) {
      moveQuestion(ouicards.bucketA, ouicards.bucketB);
    } else if (ouicards.currentBucket === ouicards.bucketB) {
      moveQuestion(ouicards.bucketB, ouicards.bucketC);
    } else if (ouicards.currentBucket === ouicards.bucketC) {
      moveQuestion(ouicards.bucketC, ouicards.bucketC);
    } else
      console.log('Hmm, you should not be here.');
    saveToLS();
  }

  function wrong() {
    moveQuestion(ouicards.currentBucket, ouicards.bucketA);
    saveToLS();
  }

  function moveQuestion(fromBucket, toBucket) {
    toBucket.push(fromBucket.shift());
  }

  function getQuestion(bucket) {
    // Prevent from looping thru an empty bucket
    if (!bucket || bucket.length === 0) {
      console.log("You can't load an empty set of questions.");
      return;
    }

    return buildQuestionHTML(bucket[0]);
  }

  function buildQuestionHTML(rawQuestion) {
    var questionEl, answerEl;

    questionEl = document.createElement('p');
    questionEl.innerHTML = rawQuestion.question;

    answerEl = document.createElement('p');
    answerEl.innerHTML = rawQuestion.answer.replace(/\n/g, '<br>');

    return {question: questionEl, answer: answerEl};
  }

  function saveToLS() {
    localStorage.flashcards = JSON.stringify(ouicards.flashcards);
    localStorage.bucketA    = JSON.stringify(ouicards.bucketA);
    localStorage.bucketB    = JSON.stringify(ouicards.bucketB);
    localStorage.bucketC    = JSON.stringify(ouicards.bucketC);
  }

  function getFromLS() {
    ouicards.flashcards    = JSON.parse(localStorage.flashcards || '[]');
    ouicards.bucketA       = JSON.parse(localStorage.bucketA    || '[]');
    ouicards.bucketB       = JSON.parse(localStorage.bucketB    || '[]');
    ouicards.bucketC       = JSON.parse(localStorage.bucketC    || '[]');
    ouicards.currentBucket = ouicards.bucketA.length ? ouicards.bucketA :
                         ouicards.bucketB.length ? ouicards.bucketB :
                         ouicards.bucketC.length ? ouicards.bucketC : [];

    ouicards.counter = 1;
    return {flashcards: ouicards.flashcards, bucketA: ouicards.bucketA, bucketB: ouicards.bucketB, bucketC: ouicards.bucketC};
  }

  function resetBuckets() {
    ouicards.bucketA       = ouicards.flashcards.slice(0);
    ouicards.currentBucket = ouicards.bucketA;
    ouicards.bucketB       = [];
    ouicards.bucketC       = [];
    ouicards.counter       = 1;
    saveToLS();
  }

  exports.ouicards = {
    currentBucket:      [],
    flashcards:         [],
    bucketA:            [],
    bucketB:            [],
    bucketC:            [],
    counter:            1,
    loadFromArray:      loadFromArray,
    loadFromBrowser:    loadFromBrowser,
    next:               next,
    correct:            correct,
    wrong:              wrong,
    moveQuestion:       moveQuestion,
    getQuestion:        getQuestion,
    buildQuestionHTML:  buildQuestionHTML,
    saveToLS:           saveToLS,
    getFromLS:          getFromLS,
    resetBuckets:       resetBuckets
  };

// jQuery magic
  var showNext = function() {
    var result = next();
    $('#current-question').first().html(result['question']);
    $('#current-answer').first().hide().html(result['answer']);
  };

  $.fn.ouicards = function() {
    var result = [];
    this.find('ul').hide().children().each(function() {
      result.push({
        question: $(this).find('.question').text(),
        answer: $(this).find('.answer').text()
      });
    });
    
    loadFromArray(result);

    $('a#correct').click(function(event) {
      event.preventDefault();
      correct();
      showNext();
    });

    $('a#wrong').click(function(event) {
      event.preventDefault();
      wrong();
      showNext();
    });

    $('a#show-answer').click(function(event){
      event.preventDefault();
      $('#current-answer').first().show();
    });

    showNext();
  };

})(this);
