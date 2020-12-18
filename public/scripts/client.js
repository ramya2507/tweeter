$(document).ready(function(){
  $('.error-message').hide();
  //function to convert milliseconds from 1970 to time in the past from today
  const millisecondsToOthers = milliseconds => {
    const timeDifference = Date.now() - milliseconds;
    let result = 0;
    if (timeDifference < 1000) {
      return "Moments";
    } else if (timeDifference < 60000) {
      result = Math.floor(timeDifference / 1000);
      if (result > 1) {
        return result + " seconds";
      } else {
        return result + " second";
      }
    } else if (timeDifference < 3600000) {
      result = Math.floor(timeDifference / 60000);
      if (result > 1) {
        return result + " minutes";
      } else {
        return result + " minute";
      }
    } else if (timeDifference < 86400000) {
      result = Math.floor(timeDifference / 3600000);
      if (result > 1) {
        return result + " hours";
      } else {
        return result + " hour";
      }
    } else if (timeDifference < 31536000000) {
      result = Math.floor(timeDifference / 86400000);
      if (result > 1) {
        return result + " days";
      } else {
        return result + " day";
      }
    } else {
      result = Math.floor(timeDifference / 31536000000);
      if(result > 1){
        return result + " years";
      } else {
        return result + " year";
      }
    }
  }
  //function to make html text safe
  const escape =  function(str) {
    let p = document.createElement('p');
    p.appendChild(document.createTextNode(str));
    return p.innerHTML;
  }
  
  //to get the data on submission of form
  $('.new-tweet form').on('submit',function(e){
    e.preventDefault();
    const data = $(this).serialize();
    //data is alway equal to text= so char length is 140+5
    if (data === 'text=') {
      $('#error-text').children().text('Enter a valid message');
      $('.error-message').fadeIn();
      return;
    } else if (data.length > 145) {
      $('#error-text').children().text('Your tweet is too long to submit');
      $('.error-message').fadeIn();
      return;
    } else {
      //console.log(data);
      $.ajax('/tweets',{
        method:'POST',
        data,
        success: function() {
          loadTweets();
          $('.error-message').hide();
          $('#tweet-text').val('');         
          $('.counter').text('140');
        }
      });
    }
  });
  //function to get the /tweets/ using ajax
  const loadTweets = function() {
    $.ajax('/tweets',{
      method:'GET',
      dataType:'JSON',
      success: tweets => renderTweets(tweets),
    });   
  }

  loadTweets();

  //function to render all the objects of the array
  const renderTweets = function(tweets) {
   for(const tweet of tweets){
    $('#tweets-container').prepend(createTweetElement(tweet));
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
       ${escape(tweet.content.text)}
      </div>            
      <footer>
        <div><p>${millisecondsToOthers(tweet.created_at)}</p></div>
        <div style='color:blue'>
         <i class="fas fa-flag"></i>
         <i class="fas fa-retweet"></i>
         <i class="fas fa-heart"></i>
        </div>
      </footer>
    </article>`;
    return $indTweet;  
  };
});