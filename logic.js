// dispatcher to send 100 ajax requests and show the progress
//
// notes: basic simple.
//
var dispatcher = (function($, win) {
	var
	// hold list of users and activity status
	users = {},

	// hold current position
	current_user = null,

	init = function() {
		// init 100 users object
		var i = 0;
		current_user = 0;
		while (i < 100) {
			users[i++] = {status: null};
		}
		$('#btn-start').on('click', push_request);
	},

	// I dont know if you want me simply to use async:false from $.ajax to achive this or implement it myself,
	// so I mentioning that there is simpler way with async false and yet I'm implementing it manualy.
	//
	// achieving serial seq requests by issuing new request at the end of the previous one.
	push_request = function() {
		$.ajax({
			url: 'is_online.php',
			data: {i: current_user}
		}).done(function(data) {
				users[current_user].status = parseInt(data,10);
				append_status(current_user, users[current_user].status);
		}).fail(function() {
			users[current_user].status = null;
			append_status(current_user, users[current_user].status);
		}).always(function() {
			// move to next user
			if (current_user++ < 100) {
				push_request();
			} else {
			// send all results to somewhere
				sum_result();
			}
		});
	},

	append_status = function(idx, user_status) {
		var $txt = $('<span>');
		if (user_status === 1) {
			$txt.addClass('online').text(idx + ': Online');
		} else if (user_status === 0) {
			$txt.addClass('offline').text(idx + ': Offline');
		} else {
			$txt.addClass('fail').text(idx + ': Network fail');
		}

		$('#progress-list').append($txt);
	},

	sum_result = function() {
		$('#progress-list').append($('span').addClass('done').text('Done. Submiting results...'));
		$.ajax({
			url: 'dummy.php',
			data: users
		});
	},

	// we could have a reset functionality and resend the requests again
	reset = function() {
	};

	return {
		init: init
	};
})(jQuery, window);