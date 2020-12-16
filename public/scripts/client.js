/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
 
$(document).ready(function(){
  $('.new-tweet form').on('submit',function(e){
    e.preventDefault();
    const data = $(this).serialize();
    //data is alway equal to text= so char length is 140+5
    if(data === 'text='){
      return alert('You cannot post empty tweet');
    } else if(data.length > 145){
      return alert('Your tweet is too long to submit');
    } else {
      //console.log(data);
      $.ajax('/tweets/',{
        method:'POST',
        data,
      });
    }
  });
  //function to get the /tweets/ using ajax
  const loadTweets = function(){
    $.ajax('/tweets/',{
      method:'GET',
      dataType:'JSON',
      success: tweets => renderTweets(tweets),
    });   
  }

  loadTweets();

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

});

