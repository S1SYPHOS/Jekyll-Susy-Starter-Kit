document.addEventListener('DOMContentLoaded', function() {
  // simple JS feature detection
  var className, html;
  html = document.documentElement;
  className = html.className.replace('no-js', 'js');
  html.className = className;

  // off-canvas-navigation
  var toggle = document.getElementById('toggle');
  toggle.addEventListener('click', function(e) {
    e.preventDefault();
    var innerWrap = document.querySelector('.inner-wrap');
    innerWrap.classList.toggle('is-open');
  });
});

// Insert your JS MAGIC HERE :)
