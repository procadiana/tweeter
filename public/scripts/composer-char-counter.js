$(document).ready(function() {
  let elem = document.getElementById('tweet');
  let button = document.getElementById('button');
  elem.addEventListener('keyup', countCharacters, false);
  button.addEventListener('click', countCharacters, false);
  button.addEventListener('click', emptyTweetValidation);



//--------> Function validating if a tweet is empty and showing error
  function emptyTweetValidation(){
    let value = document.getElementById('tweet').value;
    if (value.length === 0){
      event.preventDefault();
      $( "#empty_tweet" ).slideDown( "slow");
    }
  }

//--------> Function counting characters and displaying errors if the case
  function countCharacters(event) {
    let input = document.getElementById('tweet').value;
    let counter = (140 - (input.length));
    let countRemaining = document.getElementById('counter');
    if (counter >= 0){
      countRemaining.textContent = counter;
      $( "#empty_tweet" ).slideUp( "slow", function() {
      });
      $( "#long_tweet" ).slideUp( "slow", function() {
      });
      countRemaining.style.color = '#244751';

    }
    else if(counter < 0) {
      event.preventDefault();
      event.stopPropagation();
      countRemaining.textContent = counter;
      countRemaining.style.color = 'red';
      $( "#long_tweet" ).slideDown( "slow");
    }
  };
});

