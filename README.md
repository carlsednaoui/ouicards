# Ouicards - Fancy Schmancy Flashcards
Easy to use flashcards to study for... whatever. The example provided is for the New York State Immigration Naturalization test.

## Using Ouicards
The first thing you'll need is an array of Question/ Answer objects.

Example:
    
    var flashcards = [
      {question: "Who build this?", answer: "Carl Sednaoui"}, 
      {question: "Where was Ouicards made?", answer: "In NYC, during Hacker School"}
    ]

You can then use the functions outlined below.

## Functions Available

    ouicards.changeQuestion(arrayForRdnNm, flashcards, qSelector, aSelector)
      // arrayForRdnNm: This can either be your entire set of flashcards or an array of saved question numbers
      // flashcards: These are the flashcards you are trying to learn
      // qSelector: Your html question selector. This will be used by jQuery to find and replace your question html content.
      // aSelector: Your html answer selector. This will be used by jQuery to find and replace your answer html content.

    ouicards.clearLocalStorage(saveButtonSelector)
      // Clears saved ouicards from localstorage.
      // saveButtonSelector: The html selector for your save button. This will be used to update the button copy
      //  and will read as follows: "Saved: 1 question"
    
    ouicards.saveToLocalStorage(questionID)
      // Save a given question to ouicards localstorage
    
    ouicards.getFromLocalStorage()
      // Get saved ouicards from localstorage

    ouicards.updateSaveButtonCopy(saveButtonSelector)
      // Updates your save button copy. Similar to ouicards.clearLocalStorage(saveButtonSelector)


### Other functions available - which you probably won't use

    ouicards.generateRandomNumber(arrayForRdnNm, flashcards)
      // Generate a random number. Used by ouical.changeQuestion(arrayForRdnNm, flashcards, qSelector, aSelector)

    ouicards.buildQuestionHTML(questionNumber, flashcards)
      // Builds your questions/ answer html. Also used by ouical.changeQuestion(arrayForRdnNm, flashcards, qSelector, aSelector)
    
## To Do
- Implement the [Leitner System](http://en.wikipedia.org/wiki/Leitner_system)