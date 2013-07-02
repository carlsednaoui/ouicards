# Ouicards - Fancy Schmancy Flashcards
Easy to use flashcards to study for... whatever. Ouicards uses a 3-bucket [Leitner System](http://en.wikipedia.org/wiki/Leitner_system) and relies on [jQuery](http://jquery.com/) and [localStorage](http://diveintohtml5.info/storage.html).

The example provided is for the New York State Immigration Naturalization test. __Note:__ This example was built in June 2013 and may be outdated by the time you see it.

## Example
You can find a [live example here ](http://carlsednaoui.github.io/ouicards/Example/index.html).

## Using Ouicards
The first thing you'll need is an array of Question/ Answer objects.

Example:
    
    var flashcards = [
      {question: "Who build this?", answer: "Carl Sednaoui"}, 
      {question: "Where was Ouicards made?", answer: "In NYC, during Hacker School"}
    ]

You can then use the functions outlined below.

## Functions Available
  
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

### Everything You Have Access To
    
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
    ouicards.reset()
      // Resets ouicards buckets. 
      // Bucket A will equal your flashcards array. Bucket B and C will be empty arrays.  
      // Your currentBucket will also be empty and all of this will get saved to localStorage.

## Contact
Have feedback or suggestions? I'd love to hear from you, feel free to contact me here via [Github](https://github.com/carlsednaoui) or via [Twitter](https://twitter.com/carlsednaoui). 

## License
[MIT](http://opensource.org/licenses/MIT)