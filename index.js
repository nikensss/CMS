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