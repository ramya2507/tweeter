$(document).ready(function() {
  $('#tweet-text').on('keyup',function(){
    const remainingChar = 140 - $(this).val().length;
    const remainingCharText = $('#under-new-tweet .counter');
    remainingCharText.text(remainingChar);
    if (remainingChar < 0) {
      remainingCharText.addClass("over-the-limit");
    } else {
      remainingCharText.removeClass("over-the-limit");
    }
  });
});