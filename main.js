function createRandomQuestion(questions) {
  var randomNumber = Math.floor(Math.random() * questions.length);
  $('.question').attr({id: randomNumber + ''}); // set question ID to randomNumber
  $('.answer').hide();
  $('.question').html(askQuestion(randomNumber));
  $('.answer').html("<b>Answer:</b> <br/>" + getAnswer(randomNumber).replace(/\n/g,"<br>"));
}

function askQuestion(questionNumber) {
  return flashcards[questionNumber].question;
}

function getAnswer(questionNumber) {
  return flashcards[questionNumber].answer;
}

function createRandomQuestionFromArrayIDS(arrayIDS) {
  var randomNumber = Math.floor(Math.random() * arrayIDS.length);
  $('.question').html(askQuestion(arrayIDS[randomNumber]));
  $('.answer').html("<b>Answer:</b> <br/>" + getAnswer(arrayIDS[randomNumber]).replace(/\n/g,"<br>"));
}

$(document).ready(function() {
  $('.generate').on('click', function() {
    $('.answer').css('display') !== "none" ? createRandomQuestion(flashcards) : $('.answer').show();
  });

  $('.question').on('click', function() {
    $('.answer').show();
  });

  var saved = [];
  $('.save').on('click', function() {
    var questionID = $('.question').attr('id');
    saved.indexOf(questionID) == -1 && questionID !== undefined ? saved.push(questionID) : saved;
    $('.save').html("Saved: " + saved.length + " question");
  });

  $('.loop-thru-saved-questions').on('click', function() {
    $('.answer').css('display') !== "none" ? createRandomQuestionFromArrayIDS(saved) : $('.answer').show();
  });
});