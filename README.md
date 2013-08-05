# Ouicards - Fancy Schmancy Flashcards
Ouicards allows you to easily build flashcards to study for... everything! 

Ouicards uses a 3-bucket [Leitner System](http://en.wikipedia.org/wiki/Leitner_system) and relies on [jQuery](http://jquery.com/) and [localStorage](http://diveintohtml5.info/storage.html).

[Here is the official OuiCards page](http://carlsednaoui.github.io/ouicards/).

## About the Leitner System
From the [Wikipedia page](http://en.wikipedia.org/wiki/Leitner_system): 

The Leitner system is a widely used method to efficiently use flashcards that was proposed by the German science journalist Sebastian Leitner in the 1970s. __It is a simple implementation of the principle of spaced repetition, where cards are reviewed at increasing interval.__

In this method flashcards are sorted into groups according to how well you know each one in the Leitner's learning box. This is how it works: you try to recall the solution written on a flashcard. If you succeed, you send the card to the next group. But if you fail, you send it back to the first group. __Each succeeding group has a longer period of time before you are required to revisit the cards.__


## Example

[Here's a ouicards example](http://carlsednaoui.github.io/ouicards/live-examples/index.html), created for the New York State Immigration Naturalization test. 

__Note:__ This example was built in June 2013 and may be outdated by the time you see it.

## Using Ouicards

### > As a jQuery plugin

If you'd like to quickly get running with OuiCards, you can simply create a \<ul> with the right CSS Classes and OuiCards will take care of the rest.

Requirements:

- A div containing a \<ul> where you'll create your questions and answers. In the example below this is this div: \<div id='flashcards'>
- \<li>'s holding 2 divs. One for the question (with a class of 'question') and one for the answer (with a class of 'answer')
- A div with an id of 'current-question', to show the question
- A div with an id of 'current-answer', to show the answer
- A link with an id of 'show-answer', to reveal the answer (by default you'll only see the question at first)
- A link with an id of 'correct', which a user will click if they get the question right
- A link with an id of 'wrong', which a user will click if they get the question wrong

Here's some example code ([also available here](http://carlsednaoui.github.io/ouicards/live-examples/ouicards-jquery-example.html)):

    <html>
    <head>
      <title>Welcome</title>
      <script src="http://ajax.googleapis.com/ajax/libs/jquery/2.0.0/jquery.min.js"></script>
      <script src="../ouicards.js"></script>
      <script>
        $(function() { 
          $('#flashcards').ouicards(); 
        });
      </script>
    </head>

    <body>
      <h1>Ouicards jQuery!</h1>
      <div id='flashcards'>
        <div id='current-question'></div>
        <div id='current-answer'></div>
        <ul>
          <li>
            <div class='question'>Question 1</div>
            <div class='answer'>Answer 1</div>
          </li>
          <li>
            <div class='question'>Question 2</div>
            <div class='answer'>Answer 2</div>
          </li>
          <li>
            <div class='question'>Question 3</div>
            <div class='answer'>Answer 3</div>
          </li>
        </ul>
        <a id='show-answer' href='#'>Show answer</a>
        <a id="correct" href="#">Correct</a>
        <a id="wrong" href="#">Wrong</a>
      </div>
    </body>
    </html>

### > As a JavaScript Library
Welcome to the big leagues! The first thing you'll need is an array of Question/ Answer objects.

Example:
    
    var flashcards = [
      {question: "Who build this?", answer: "Carl Sednaoui"}, 
      {question: "Where was Ouicards made?", answer: "In NYC, during Hacker School"}
    ]

You can then use the functions outlined below.

#### Functions Available
  
    ouicards.loadFromArray(flashcardArray)
      // [{question: q1, answer: a1}, {question: q2, answer: a2}]
    ouicards.loadFromBrowser(jQuerySelector, Delimiter)
      // Your delimeter will most likely be ',' or '\t'
    ouicards.getFromLS()
      // Get the questions and buckets from localStorge
    ouicards.correct()
      // Call this when the current question was answered correctly
    ouicards.wrong()
      // Call this when the current question was answered incorrectly
    ouicards.next()
      // Call this to receive a new Question/ Answer object

#### Everything You Have Access To
    
    ouicards.currentBucket: The bucket from which the current card is being pulled.
    ouicards.flashcards: Your array of flashcards.
    ouicards.bucketA: All questions available in Bucket A.
    ouicards.bucketB: All questions available in Bucket B.
    ouicards.bucketC: All questions available in Bucket C.
    ouicards.counter: A running counter. Used to know which bucket to get the next question from.

    ouicards.loadFromBrowser(selector, delimiter) 
      // Uses jQuery to load the value of a given selector.
      // This saves the questions into ouicards, localStorage AND 
        // returns an object with Flashcards, Bucket A, B and C.
    ouicards.loadFromArray(array)
      // Loads the array of questions provided into ouicards and localStorage.
    ouicards.getQuestion(bucket)
      // Gets a question for a given bucket and returns the built question HTML for it.
    ouicards.buildQuestionHTML(rawQuestion)
      // Returns a question/ answer HTML object {question: questionEl, answer: answerEl}.
    ouicards.moveQuestion(fromBucket, toBucket)
     // Moves a question from a given bucket to another given bucket.

    ouicards.next()
      // Returns a new question/ answer object.
    ouicards.correct()
      // Moves the current question to the next appropriate bucket.
    ouicards.wrong()
      // Moves the current question to Bucket A.
    ouicards.saveToLS()
      // Saves your flashcards, Bucket A, Bucket B and Bucket C to localStorage.
    ouicards.getFromLS()
      // Gets your flashcards, Bucket A, Bucket B and Bucket C from localStorage. 
      // This also sets ouicards.currentBucket and ouicards.counter.
    ouicards.resetBuckets()
      // Resets ouicards buckets. 
      // Bucket A will equal your flashcards array. Bucket B and C will be empty arrays.  
      // Your currentBucket will also be empty and all of this will get saved to localStorage.

## Contact
Have feedback or suggestions? I'd love to hear from you, feel free to contact me here via [Github](https://github.com/carlsednaoui) or via [Twitter](https://twitter.com/carlsednaoui). 

## License
[MIT](http://opensource.org/licenses/MIT)

## Completed while attending [Hacker School](https://www.hackerschool.com/)