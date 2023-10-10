/* eslint-disable no-undef */
$(document).on('ready', () => {
  $('#tweet-text').on('input', function() {
    const defaultColor = '#545149';
    const exceededCharsColor = '#DD4C31';

    let currLength = $(this).val().length;
    let counterElement = $(this).parent().parent().children('div.button-text-layer').children('output.counter');
    counterElement.val(140 - currLength);
    if (counterElement.val() < 0) {
      counterElement.css('color', exceededCharsColor);
      return;
    }

    // From negative character count back to positive, we change back to default color.
    if (counterElement.css('color') !== defaultColor)
      counterElement.css('color', defaultColor);
  });
});