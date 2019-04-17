/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */


// obj destructuring
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


// Test / driver code (temporary). Eventually will get this from the server.
// const data = [
//   {
//     "user": {
//       "name": "Newton",
//       "avatars": {
//         "small":   "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_50.png",
//         "regular": "https://vanillicon.com/788e533873e80d2002fa14e1412b4188.png",
//         "large":   "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_200.png"
//       },
//       "handle": "@SirIsaac"
//     },
//     "content": {
//       "text": "If I have seen further it is by standing on the shoulders of giants"
//     },
//     "created_at": 1461116232227
//   },
//   {
//     "user": {
//       "name": "Descartes",
//       "avatars": {
//         "small":   "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc_50.png",
//         "regular": "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc.png",
//         "large":   "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc_200.png"
//       },
//       "handle": "@rd" },
//     "content": {
//       "text": "Je pense , donc je suis"
//     },
//     "created_at": 1461113959088
//   },
//   {
//     "user": {
//       "name": "Johann von Goethe",
//       "avatars": {
//         "small":   "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1_50.png",
//         "regular": "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1.png",
//         "large":   "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1_200.png"
//       },
//       "handle": "@johann49"
//     },
//     "content": {
//       "text": "Es ist nichts schrecklicher als eine tätige Unwissenheit."
//     },
//     "created_at": 1461113796368
//   }
// ];



function renderTweets (tweets){
  tweets.forEach(element =>{
    $('#tweets-container').append(createTweetElement(element));}
)};


$(document).ready(function(){
  function loadTweets(){
    $.ajax('/tweets',{ method: 'GET' })
      .then(function(res){
        console.log(res);
        renderTweets(res);
      });
    }
  loadTweets();
});



