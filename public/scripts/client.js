/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

 // Test / driver code (temporary). Eventually will get this from the server.
 const data = [
  {
    "user": {
      "name": "Newton",
      "avatars": "https://i.imgur.com/73hZDYK.png"
      ,
      "handle": "@SirIsaac"
    },
    "content": {
      "text": "If I have seen further it is by standing on the shoulders of giants"
    },
    "created_at": 1461116232227
  },
  {
    "user": {
      "name": "Descartes",
      "avatars": "https://i.imgur.com/nlhLi3I.png",
      "handle": "@rd" },
    "content": {
      "text": "Je pense , donc je suis"
    },
    "created_at": 1461113959088
  }
]



$(document).ready(function(){
  $('.new-tweet form').on('submit',function(e){
    e.preventDefault();
    $.ajax('/tweets/',{
      method:'POST',
      data:$(this).serialize(),
    });
  });

  //function to render all the objects of the array
  const renderTweets = function(tweets) {
   for(const tweet of tweets){
     $('#tweets-container').append(createTweetElement(tweet));
   }
  };
  //function to create html article dynamically
  const createTweetElement = function(tweet) {
    let $indTweet = `<article class='tweet'>
      <header>
        <div class='tweet-icon'>
          <div class='icon-img'><img src= ${tweet.user.avatars}></div>
          <div class='icon-text'>${tweet.user.name}</div>
        </div>
        <div class="username">
          <p>${tweet.user.handle}</p>
        </div>
      </header>
      <div class="tweet-content">
       <p>${tweet.content.text}</p>
      </div>            
      <footer>
        <div><p>${tweet.created_at}</p></div>
        <div><p>icons</p></div>
      </footer>
    </article>`;
    return $indTweet;  
  };
  renderTweets(data);  

});

