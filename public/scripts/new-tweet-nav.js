/* eslint-disable no-undef */
const initNewTweetHeaderHandlers = function() {
  const $newTweetToggle = $('nav>div.header-new-tweet');
  const initOnHover = function($element) {
    $element.on('mouseover', function() {
      $(this).find('i').addClass('fa-bounce');
    });
    $element.on('mouseout', function() {
      $(this).find('i').removeClass('fa-bounce');
    });
  };

  const initToggle = function($element) {
    let isToggled = true;
    $element.on('click', function() {
      const $newTweetElement = $('.new-tweet');
      if (isToggled) {
        $newTweetElement.hide('slow');
      } else {
        $newTweetElement.show('fast', function() {
          this.querySelector('textarea').focus();
        });
      }
      isToggled = !isToggled;
    });
  };

  initOnHover($newTweetToggle);
  initToggle($newTweetToggle);
};

$(function() {
  initNewTweetHeaderHandlers();
});