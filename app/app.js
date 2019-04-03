
var loadLocalStorage = function () {
	var keys = Object.keys(localStorage);
	for (var i = 0; i < keys.length; i++) {
		var tempobj = JSON.parse(localStorage.getItem(keys[i]));
		var $reservation = $('<div class = \"reservation\"></div>');
		var $checkedin = $('<div class=\"res_checked_in\"></div>');
			$checkedin.text(tempobj['checkedin']);
			$checkedin.appendTo($reservation)
		var $firstname = $('<div class=\"res_first_name\"></div>');
			$firstname.text(tempobj['First Name']);
			$firstname.appendTo($reservation)
		var $lastname = $('<div class=\"res_last_name\"></div>');
			$lastname.text(tempobj['Last Name']);
			$lastname.appendTo($reservation);
		var $phonenumber = $('<div class=\"res_phone_number\"></div>');
			$phonenumber.text(tempobj["Phone Number"]);
			$phonenumber.appendTo($reservation);
	$reservation.attr('title', keys[i]);
	$reservation.appendTo('#res_wrapper');

};
};

var alert = function(message) {
	$('#statusLabel').text('Status: ' + message);
}

 //jQuery document ready initialization stuff
 ////button and form event handlers
 // logic for determining action probably needs to go in the event handler
$(document).ready(function () {
	loadLocalStorage();

	// $('#btn-create').on('click', function(e) {
	// 	var key = $('#key').val();
	// 	var value = $('#value').val();
	// 	var keyExists = localStorage.getItem(key) !== null;

	// 	if (keyExists) {
	// 		alert('key already exists, please use update button instead! :D');
	// 	} else if (key === '') {
	// 		alert('invalid input!')
	// 	}else {
	// 		createEntry(key, value);
	// 		alert('key created - ' + key);
	// 	}

	// 	loadLocalStorage();
	// });

	$('#btn-update').on('click', function(e) {
		var key = $('#last_name_create').val() + ', ' + $('#first_name_create').val();
		var value = {};
		var firstname = $('#first_name_create').val();
		var lastname = $('#last_name_create').val();
		var phonenumber = $('#phone_number_create').val();
		var attendies = $('#attendees').val();
		var notes = $('#additional_notes').val();
		var checkedin = $('#checked_in').val();
		value['First Name'] = firstname;
		value['Last Name'] = lastname;
		value['Phone Number'] = phonenumber;
		value['Attendies'] = attendies;
		value['Notes'] = notes;
		value['checkedin'] = checkedin;
		var existingValue = localStorage.getItem(key)
		var keyExists = existingValue !== null;

		if (value === existingValue) {
			alert('key not updated - that value already exists silly! xD')
		} else if (keyExists) {
			updateEntry(key, value);
			alert('key updated - ' + key);
		} else if (key === '') {
			alert('invalid input!')
		} else {
			alert('key doesn\'t exist, please use create button instead! :D');
		}
		location.reload();

	});

	$('#btn-delete').on('click', function(e) {
		var key = $('#delete_lastName').val() + ', ' + $('#delete_firstName').val();

		var keyExists = localStorage.getItem(key) !== null;

		if (keyExists) {
			removeEntry(key);
			alert('key removed - ' + key);
		} else if (key === '') {
			alert('invalid input!')
		} else {
			alert('key doesn\'t exist, nothing removed. :|');
		}
		location.reload();

	});

});
/*
When an input element is given a name, that name becomes a property of the owning form element's HTMLFormElement.elements property. That means if you have an input whose name is set to guest and another whose name is hat-size, the following code can be used:
let form = document.querySelector("form");
let guestName = form.elements.guest;
let hatSize = form.elements["hat-size"];
*/

/*
PAGE CONTENT STUFF
*/
//something to update the table every time localStorage changes

//localStorage stuff
//https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage
////create new entry
//localStorage.setItem(key, value)
var createEntry = function(key, value) {
	return localStorage.setItem(key, JSON.stringify(value));
}

////Update existing entry
//localStorage.setItem(key, value)
var updateEntry = function(key, value) {
	return localStorage.setItem(key, JSON.stringify(value));
}

////delete existing entry
//localStorage.removeItem(key)
var removeEntry = function(key) {
	return localStorage.removeItem(key);
}

function dropDown() {
  document.getElementById("myDropdown").classList.toggle("show");
}

window.onclick = function(e) {
  if (!e.target.matches('.dropbtn')) {
  var myDropdown = document.getElementById("myDropdown");
    if (myDropdown.classList.contains('show')) {
      myDropdown.classList.remove('show');
    }
  }
}
$("#drop_create").on("click", function() {
	$("#create_new_form, #blackout").addClass("active");
});

$("#create_new_cancel").on("click", function() {
	$("#create_new_form, #blackout").removeClass("active");
});

$("#create_new_submit").on("click", function() {

	var key = $('#last_name_create').val() + ', ' + $('#first_name_create').val();

	var keyExists = localStorage.getItem(key) !== null;

		if (keyExists) {
			alert('key already exists, please use update button instead! :D');
		} else if (key === '') {
			console.log('invalid input!')
		}else {
			var value = {};
				var firstname = $('#first_name_create').val();
				var lastname = $('#last_name_create').val();
				var phonenumber = $('#phone_number_create').val();
				var attendies = $('#attendees').val();
				var notes = $('#additional_notes').val();
				var checkedin = $('#checked_in').val();
				value['First Name'] = firstname;
				value['Last Name'] = lastname;
				value['Phone Number'] = phonenumber;
				value['Attendies'] = attendies;
				value['Notes'] = notes;
				value['checkedin'] = checkedin;
			createEntry(key,value);
			console.log('key created - ' + key);
			loadLocalStorage();
			location.reload();
		}
		$("#create_new_form, #blackout").removeClass("active");


});





// deleting reserations
$("#drop_delete").on("click", function() {
	$("#delete_res, #blackout").addClass("active");
});
$("#delete_cancel").on("click", function() {
	$("#delete_res, #blackout").removeClass("active");
});


