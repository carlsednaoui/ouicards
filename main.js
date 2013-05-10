function createRandomQuestion() {
  var num = Math.floor(Math.random() * questions.length );
  $('.question').attr({id: num + ''}); // set question ID to num
  $('.answer').hide();
  $('.question').html(askQuestion(num));
  $('.answer').html("Answer: <br/><br/>" + getAnswer(num).replace(/\n/g,"<br>"));
}

function askQuestion(questionNumber) {
  return questions[questionNumber][0];
}

function getAnswer(questionNumber) {
  return questions[questionNumber][1];
}

$(document).ready(function() {
  $('.generate').on('click', function() {
    $('.answer').css('display') !== "none" ? createRandomQuestion() : $('.answer').show();
  });

  $('.question').on('click', function() {
    $('.answer').show();
  });

  var saved = [];
  $('.save').on('click', function() {
    var questionID = $('.question').attr('id');
    saved.indexOf(questionID) == -1 && questionID !== undefined ? saved.push(questionID) : saved;
    $('.save').html("Saved: " + saved.length + " question.");
  });
});