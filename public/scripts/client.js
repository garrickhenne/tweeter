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
  $('main').append(tweets.map(createTweetElement));
  $('main form').on('submit', function(e) {
    e.preventDefault();
    const $tweetText = $(this).find('#tweet-text');
    console.log('posting tweet:', $tweetText.serialize());
    $.ajax({
      type: 'POST',
      url: '/tweets',
      data: $tweetText.serialize()
    });
  });
};

const loadTweets = (callback) => {
  return $.ajax('/tweets', { method: 'GET' })
    .then(tweetsJSON => callback(tweetsJSON))
    .catch(err => console.error('GET request to /tweets failed.', err));
};

$(function() {
  loadTweets(renderTweets);
});
