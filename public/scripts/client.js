/* eslint-disable no-undef */
// html string-literal highlighting
const html = String.raw;
/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
const createTweetElement = (tweet) => {
  const $tweet = $(html`
    <article>
      <header>
        <div>
          <img src="${tweet.user.avatars}" />
          <p>${tweet.user.name}</p>
        </div>
        <p><strong>${tweet.user.handle}</strong></p>
      </header>

      <p>${tweet.content.text}</p>

      <hr />
      <footer>
        <p>${timeago.format(tweet.created_at)}</p>
        <div>
          <i class="fa-solid fa-flag"></i>
          <i class="fa-sharp fa-solid fa-retweet"></i>
          <i class="fa-solid fa-heart"></i>
        </div>
      </footer>
    </article>`);

  return $tweet;
};

const renderTweets = (tweets) => {
  // Render from reverse to have most recent tweets first.
  $('main .tweets').append(tweets.reverse().map(createTweetElement));
};

const renderCreatedTweet = (tweet) => {
  $('main .tweets').prepend(createTweetElement(tweet.pop()));
};

const loadTweets = (callback) => {
  return $.ajax('/tweets', { method: 'GET' })
    .then(tweetsJSON => callback(tweetsJSON))
    .catch(err => console.error('GET request to /tweets failed.', err));
};

const clearTextArea = ($textArea) => $textArea.val('');

const handleErrorValidation = function(errDescription, $parentElement) {
  const $errorLabel = $(html`
    <label style='display: none;'>
      <i class="fa-solid fa-triangle-exclamation fa-shake" style="color: #dd4c31;"></i>
      ${errDescription}
      <i class="fa-solid fa-triangle-exclamation fa-shake" style="color: #dd4c31;"></i>
    </label >`);
  $errorLabel.addClass('tweet-error');
  $errorLabel.insertAfter('button');

  $errorLabel.fadeIn(400, () => {
    setTimeout(function() {
      $errorLabel.fadeOut(400, () => {
        $errorLabel.remove();
      });
    }, 4000);
  });
};

const initTweetPostHandler = function() {
  $('main form').on('submit', function(e) {
    e.preventDefault();
    // Clone tweet-text element so UI is not effected when escaped value is set.
    const $tweetText = $(this).find('#tweet-text').clone();
    const $escapedInput = $('<div>').text($tweetText.val());
    $tweetText.val($escapedInput.html());

    if ($tweetText.val() === '') {
      handleErrorValidation('C\'mon, you gotta tweet something!', $(this).find('div.button-text-layer'));
      return;
    }

    if ($tweetText.val().length > 140) {
      handleErrorValidation('Please consider summarizing your tweet with chatGPT...', $(this).find('div.button-text-layer'));
      return;
    }

    console.log('posting tweet:', $tweetText.serialize());
    $.ajax({
      type: 'POST',
      url: '/tweets',
      data: $tweetText.serialize(),
      success: function() {
        loadTweets(renderCreatedTweet);
        // Pass original element rather than clone to actually clear UI.
        clearTextArea($('#tweet-text'));
      }
    });
  });
};

$(function() {
  loadTweets(renderTweets);
  initTweetPostHandler();
});
