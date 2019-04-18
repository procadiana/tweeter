/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

//-------->Creates the html structure of the tweet

function createTweetElement({ user: { avatars, name, handle }, content, created_at }) {
  let $tweet = $("<article>").addClass("tweet");
  let $header = $("<header>").addClass("tweet-header");
  let $avatar = $("<img>").addClass("profile").attr("src",avatars.small).appendTo($header);
  let $name = $("<h3>").addClass("name").text(name).appendTo($header);
  let $handler = $("<address>").addClass("handler").text(handle).appendTo($header);
  $header.appendTo($tweet);
  let $p = $("<p>").addClass("littletweet").text(content.text).appendTo($tweet);
  let $footer = $("<footer>").addClass("footer");
  let $timestamp = $("<div>").addClass("timestamp").text(moment(created_at).fromNow()).appendTo($footer);
  let $icons = $("<div>").addClass("icons");
  let $flag =$("<i>").addClass("far fa-flag").appendTo($icons);
  let $heart =$("<i>").addClass("far fa-heart").appendTo($icons);
  let $share =$("<i>").addClass("fas fa-retweet").appendTo($icons);
  $icons.appendTo($footer);
  $footer.appendTo($tweet);
  return $tweet;
}

//-------->Adds the tweets to the #tweet-countainer
function renderTweets (tweets){
  tweets.forEach(element =>{
    $('#tweets-container').prepend(createTweetElement(element));}
)};


//-------->Adds new tweets
$(document).ready(function(){
  $('form').on('submit', function(event) {
    event.preventDefault();
    let data = $(this).serialize();
    $.ajax({
      url: '/tweets',
      method: 'POST',
      data: data
    }).then(
      (res) => {
        loadTweets();
        let form = document.getElementById('form');
        let counter = document.getElementById('counter');
        form.reset();
        counter.textContent = '140';
      },
      (err) => { console.log('Error') }
    )
  });

//-------->Loads new tweet without refreshing the window
  function loadTweets(){
    $.ajax('/tweets',{ method: 'GET' })
      .then(function(res){
        renderTweets(res);
      });
    }
    loadTweets();

//-------->Function toggling the Compose Tweet section when clicking the Compose button
  $('#compose').on('click', function toggle() {
    $('.new-tweet').slideToggle('fast', (function() {
      $('#tweet').select();
    }));
  });
});



