/* eslint-disable no-undef */
$(function() {
  const $anchor = $('#scroll-to-top');
  const $container = $('<div></div>');
  $container.append('<i class="fa-solid fa-angles-up"></i>');

  // Hide element before rendering and only show once user scrolls past threshold.
  $anchor.hide();
  $anchor.append($container);
  $anchor.on('click', function(e) {
    e.preventDefault();
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
  });

  $(window).on('scroll', function() {
    this.scrollY > 10 ? $anchor.fadeIn('fast') : $anchor.hide();
  });
});