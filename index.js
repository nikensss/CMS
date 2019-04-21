var bg = function() {
	var delta = 1;
	var upperCap = 180;
	var lowerCap = 76;
	var colors = {
		r: lowerCap,
		g: 0,
		b: upperCap
	}
	return {
		getRGB: function() {
			return "rgb(" + colors.r + "," + colors.g + "," + colors.b + ")";
		},
		increment: function() {
			if (colors.r > upperCap || colors.r < lowerCap) {
				delta = -delta;
				console.log("Change in direction!");
			}
			colors.r += delta;
			colors.b -= delta;
		}

	}
}();

function smoothScrollTo(id){
	document.getElementById(id).scrollIntoView();
}

function changeBackgroundColor() {
	bg.increment();
	document.body.style.backgroundColor = bg.getRGB();
}

function weekPlanSample() {
	alert("Now generating sample!");
}

function toggle() {
	document.getElementById("login-form").classList.toggle("show");
	document.getElementById("login-button").classList.toggle("highlighted");
}

// Close the dropdown menu if the user clicks outside of it
window.onclick = function(event) {
	if (event.target.parentNode.offsetParent && !(event.target.matches('.dropdown-login-button') ||
			event.target.parentNode.offsetParent.matches('.dropdown-login-form'))) {
		if (document.getElementById("login-button").classList.contains('highlighted')) {
			document.getElementById("login-button").classList.remove('highlighted')
		};
		var dropdowns = document.getElementsByClassName("dropdown-login-form");
		var i;
		for (i = 0; i < dropdowns.length; i++) {
			var openDropdown = dropdowns[i];
			if (openDropdown.classList.contains('show')) {
				openDropdown.classList.remove('show');
			}
		}
	}
}

(function($) {
  "use strict"; // Start of use strict

  // Smooth scrolling using jQuery easing
  $('a.js-scroll-trigger[href*="#"]:not([href="#"])').click(function() {
    if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
      var target = $(this.hash);
      target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
      if (target.length) {
        $('html, body').animate({
          scrollTop: (target.offset().top - 48)
        }, 1000, "easeInOutExpo");
        return false;
      }
    }
  });

  // Closes responsive menu when a scroll trigger link is clicked
  $('.js-scroll-trigger').click(function() {
    $('.navbar-collapse').collapse('hide');
  });

  // Activate scrollspy to add active class to navbar items on scroll
  $('body').scrollspy({
    target: '#mainNav',
    offset: 54
  });

  // Collapse Navbar
  var navbarCollapse = function() {
    if ($("#mainNav").offset().top > 100) {
      $("#mainNav").addClass("navbar-shrink");
    } else {
      $("#mainNav").removeClass("navbar-shrink");
    }
  };
  // Collapse now if page is not at top
  navbarCollapse();
  // Collapse the navbar when page is scrolled
  $(window).scroll(navbarCollapse);

})(jQuery); // End of use strict
