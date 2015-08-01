jQuery(document).ready(function($) {
  var $inner_wrap = $('.inner-wrap');

  $('.off-canvas-toggle__button').on('click', function(event) {
    event.preventDefault();
    $inner_wrap.toggleClass('is-open');
  });

  $('.off-canvas--close').on('click',function(event){
    event.preventDefault();
    $inner_wrap.removeClass('is-open');
  });
});

// Insert your JS MAGIC HERE :)
