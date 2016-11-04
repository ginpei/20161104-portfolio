/* global $ */

/**
 * Setup Flip Box UI.
 */
var flipBoxTurned = false;
$(document).on('click', '.flipBox', function(event) {
	flipBoxTurned = true;
	var $flip = $(event.currentTarget);
	var $back = $flip.find('.flipBox-surface-back');

	// do nothing when a link is clicked
	if ($(event.target).closest('a').length > 0) {
		return;
	}

	// flip
	$flip.toggleClass('flipBox--active');

	// expand area to see article
	if ($flip.hasClass('flipBox--active')) {
		var curHeight = $back.prop('clientHeight');
		var scrollHeight = $back.prop('scrollHeight');
		var realHeight = scrollHeight - 0;
		if (realHeight > curHeight) {
			var offset = 2;  // ?
			var height = scrollHeight + offset;
			$flip.animate({ height: height });
		}
	}
	// collapse area
	else {
		$flip.stop();
		$flip.height('');
	}
});

// Flip the first one automatically
(function() {
	var $box = $('.flipBox:first');
	var bottom = $box.prop('offsetTop') + $box.prop('offsetHeight');
	var screenHeight = document.documentElement.clientHeight;
	var offset = 100;

	// wait that the box appears inside screen
	function onscroll() {
		var scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
		var scrollBottom = scrollTop + screenHeight;

		// remove after execution
		if (flipBoxTurned) {
			$(document).off('scroll', onscroll);
		}
		// not executed and it appears
		else if (scrollBottom > bottom + offset) {
			$('.flipBox:first').click();
		}
	}

	$(document).on('scroll', onscroll);
})();

/**
 * Contact form.
 */
$('.js-contactForm').on('submit', function(event) {
	event.preventDefault();
	var $form = $(event.currentTarget);
	var $controls = $form.find('input, textarea');
	var $msgProcessing = $('.js-contactForm-msgProcessing');
	var $msgSuccess = $('.js-contactForm-msgSuccess');
	var $msgError = $('.js-contactForm-msgError');

	enableContactForm($form, false);

	// create a data
	var data =
		$controls.toArray()
		.map(function(el) {
			return [el.name, el.value];
		})
		.reduce(function(row, pair) {
			row[pair[0]] = pair[1];
			return row;
		}, {});

	// send the data
	var url = $form.prop('action');
	$.ajax({
		url: url,
		data: data,
		beforeSend: function() {
			$msgProcessing.removeClass('hidden');
			$msgSuccess.addClass('hidden');
			$msgError.addClass('hidden');
		},
		success: function(responseData, status, jqXhr) {
			if (jqXhr.status === 200) {
				$msgSuccess.removeClass('hidden');
			}
			else {
				$msgError.removeClass('hidden');
			}
		},
		error: function() {
			$msgError.removeClass('hidden');
		},
		complete: function() {
			enableContactForm($form, true);
			$msgProcessing.addClass('hidden');
		},
	});
});

/**
 * Handle contact form enabled.
 * @param {boolean} enabled
 */
function enableContactForm($form, enabled) {
	var $controls = $form.find('input, textarea, button');
	$controls.prop('disabled', !enabled);
}

/**
 * Show funny message for developer.
 */
(function() {
	let style = `
		background-image: url("${location.href}image/myface.jpg");
		background-size: 200px 200px;
		background-repeat: no-repeat;
		color: #f00;
		font-size: 10px;
		line-height: 10px;
		padding: 100px 200px;
	`;
	let message = `
  (・Θ・)

 __/|________________________________
/                                     \\
|  Hi! I'm waiting for your contact!!  |
\\_____________________________________/`;

	console.log(`\n\n\n\n\n\n\n%c\n\n\n\n\n${message}`, style);
})();
