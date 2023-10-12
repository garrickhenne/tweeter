/* eslint-disable no-undef */
const handleErrorValidation = function(errDescription) {
  const $errorLabel = $(html`
    <label style='display: none;'>
      <i class="fa-solid fa-triangle-exclamation fa-shake"></i>
      ${errDescription}
      <i class="fa-solid fa-triangle-exclamation fa-shake"></i>
    </label >`);
  $errorLabel.addClass('tweet-error');
  $errorLabel.insertAfter('.button-text-layer>button');

  $errorLabel.fadeIn()
    .delay(4000)
    .fadeOut(400, function() {
      $errorLabel.remove();
    });
};

$(function() {
  const $tweetText = $('#tweet-text');
  $tweetText.on('tweet-submit-error', function(_, errorMsg) {
    handleErrorValidation(errorMsg);
  });
});