# Ouicards - Fancy Schmancy Flashcards
Easy to use flashcards to study for... whatever. The example provided is for the New York State Immigration Naturalization test.

## Using Ouicards
The first thing you'll need is an array of Question/ Answer objects.

Example:
    
    var flashcards = [
      {question: "Who build this?", answer: "Carl Sednaoui"}, 
      {question: "Where was Ouicards made?", answer: "In NYC, during Hacker School"}
    ]

You can then call:

      initializeOuicardsHandlers(flashcards);

## To Do
- Implement the [Leitner System](http://en.wikipedia.org/wiki/Leitner_system)