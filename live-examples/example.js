var start; // used to initialize the app

$(document).ready(function() {
  // Load default questions if no flashcards are found in localStorage
  if (!localStorage.flashcards || localStorage.flashcards === '[]')
    ouicards.loadFromArray(myFlashcards);
  initializeHandlers();
});

function initializeHandlers() {
  // Unbind all events, in case the user loads new flashcard questions
  $('#load-questions').unbind();
  $('.correct').unbind();
  $('.wrong').unbind();
  $('.question').unbind();
  $('.answer').unbind();

  ouicards.getFromLS();
  updateFooter();
  // Load question functionality
  $('.upload label').on('click', function() {
    $('.upload-questions-label').hide();
    $('.upload').css({"padding": " 0 2px 10px 2px"});
    $('#questions-input-area').show(100, function(){
      $('#load-questions').show(400);
    });
  });

  $('#load-questions').on('click', function() {
    initializeHandlers(ouicards.loadFromBrowser('#questions-input-area', ','));
    changeQuestion();
    $('#questions-input-area').hide();
    $('.upload').css({"padding": "10px"});
    $('#load-questions').hide();
    $('.upload-questions-label').text("Upload New Questions");
    $('.upload-questions-label').show();
    start = true;
  });

  // Correct and wrong answer functionality
  $('.correct').on('click', function() {
    if (!start) {
      console.log(start);
      start = true;
      changeQuestion();
      return;
    }

    ouicards.correct();
    changeQuestion();
    updateFooter();
  });

  $('.wrong').on('click', function() {
    if (!start) {
      start = true;
      changeQuestion();
      return;
    }

    ouicards.wrong();
    changeQuestion();
    updateFooter();
  });

  function changeQuestion() {
    var newQuestion = ouicards.next();

    if (newQuestion === undefined) {
      console.log('Trying to load an undefined question into the DOM.');
      return;
    }

    $('.question').html(newQuestion.question);
    $('.answer').html(newQuestion.answer);
    $('.answer').children().hide();
  }

  $('.question').on('click', function() {
    $('.answer p').show();
  });

  $('.answer').on('click', function() {
    $('.answer p').show();
  });

  // Update footer info
  function updateFooter() {
    $('.questions-count').html(ouicards.flashcards.length + ' questions');
    $('#stat-details').text(ouicards.bucketA.length + ' - ' +
                            ouicards.bucketB.length + ' - ' +
                            ouicards.bucketC.length);
  }
}
