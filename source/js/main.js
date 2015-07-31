// Insert your JS MAGIC HERE :)
jQuery(document).ready(function($) {
  var $transformer = $('.inner-wrap'),
  $menuToggle = $('.menu-toggle');

  // Attaches event handler when .menu-toggle is clicked
  $menuToggle.on('click', function(event) {
    event.preventDefault();
    $transformer.toggleClass('is-open');
  });
});
