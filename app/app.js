var loadLocalStorage = function() {
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

	}
	;
};

// var alert = function(message) {
// 	$('#statusLabel').text('Status: ' + message);
// }

//jQuery document ready initialization stuff
////button and form event handlers
// logic for determining action probably needs to go in the event handler
$(document).ready(function() {
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

//dropdown button in nav bar functionality
function dropDown() {
	document.getElementById("myDropdown").classList.toggle("show");
}
//clicking outside dropdown to close it
window.onclick = function(e) {
	if (!e.target.matches('.dropbtn')) {
			var myDropdown = document.getElementById("myDropdown");
			if (myDropdown.classList.contains('show')) {
					myDropdown.classList.remove('show');
			}
	}
}

// deleting reserations
$("#drop_delete").on("click", function() {
	$("#delete_res, #blackout").addClass("active");
});
$("#delete_cancel").on("click", function() {
	$("#delete_res, #blackout").removeClass("active");
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

// creating reservations

// dropdown click
$("#drop_create").on("click", function() {
	$("#create_new_form, #blackout").addClass("active");
});
//cancel button within create new
$("#create_new_cancel").on("click", function() {
	$("#create_new_form, #blackout").removeClass("active");
});
//submit reservation information form
$("#create_new_submit").on("click", function() {
	$("#create_new_form, #blackout").removeClass("active");
	var key = $('#last_name_create').val() + ', ' + $('#first_name_create').val();
	var keyExists = localStorage.getItem(key) !== null;
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
	createEntry(key, value);
	console.log('key created - ' + key);
	loadLocalStorage();
	location.reload();
});


//checkingin/updating
$("#drop_checkin").on("click", function() {
	$("#checkin_search, #blackout").addClass("active");
});

$("#checkin_cancel").on("click", function() {
	$("#checkin_search, #blackout").removeClass("active");
});

$("#checkin_go").on('click', function checkin(){

	var key = $('#checkin_lastName').val() + ', ' + $('#checkin_firstName').val();
var keyExists = localStorage.getItem(key) !== null;
if(keyExists){
	$('#reservation_details').empty();
	$("#reservation_details").addClass('active');
	var tempobj = JSON.parse(localStorage.getItem(key));
	var attendies = tempobj["Attendies"];
	var $attendies = $('<div id= \"res_attenendants\"></div>');
	$attendies.text("+" + attendies);
	$attendies.appendTo('#reservation_details');
	var $checkedin = $('<div id= \"res_detail_checkedin\"></div>');
	$checkedin.appendTo('#reservation_details')

//add buttons
	var updatebtn = $('<button class=\"res_detail_btn\" id=\"update\">Check In</button>');
	updatebtn.appendTo('#reservation_details');
	var cancelbtn = $('<button class=\"res_detail_btn\" id=\"cancel\">Cancel</button>');
	cancelbtn.appendTo('#reservation_details');

	var namedetail = tempobj["First Name"] + " " + tempobj["Last Name"];
	var $namedetail = $('<div id= \"res_detail_name\"></div>');
	$namedetail.text(namedetail);
	$namedetail.appendTo("#reservation_details");

	var numberdetail = tempobj["Phone Number"];
	var $numberdetail = $('<div id= \"res_number\"></div>');
	$numberdetail.text(numberdetail);
	$numberdetail.appendTo("#reservation_details")

	var notesdetail = tempobj["Notes"];
	var $notesdetail = $('<div id= \"res_notes\"></div>');
	$notesdetail.text(notesdetail);
	$notesdetail.appendTo("#reservation_details")
	var checkintime = tempobj["checkedintime"] || "Not Checked In Yet";
	var $checkintime = $('<div id= \"res_checkintime\"></div>');
	$checkintime.text(checkintime);
	$checkintime.appendTo("#reservation_details")

	$("#cancel").on('click', function(){
		$("#reservation_details").removeClass('active');
	})

	$("#update").on('click', function(){
		var time = new Date();
	var value = {};
	value['First Name'] = tempobj['First Name'];
	value['Last Name'] = tempobj['Last Name'];
	value['Phone Number'] = tempobj['Phone Number'];
	value['Attendies'] = tempobj['Attendies'];
	value['Notes'] = tempobj['Notes'];
	value['checkedin'] = "Yes";
	value['checkedintime'] = time;
	updateEntry(key, value);
	location.reload();
		$("#reservation_details").removeClass('active');

	})
//show checkedin status
	if(tempobj['checkedin']=== 'No'){
		$("#res_detail_checkedin").css('background-image', 'url(\"http://www.pngall.com/wp-content/uploads/2016/04/Red-Cross-Mark-Download-PNG.png\")');
	}
}//if reservation doesnt exist
else alert('no reservation found')

$("#checkin_search, #blackout").removeClass("active");
})








//may or may not use this code for update.
// $('#btn-update').on('click', function(e) {
// 	var key = $('#last_name_create').val() + ', ' + $('#first_name_create').val();
// 	var value = {};
// 	var firstname = $('#first_name_create').val();
// 	var lastname = $('#last_name_create').val();
// 	var phonenumber = $('#phone_number_create').val();
// 	var attendies = $('#attendees').val();
// 	var notes = $('#additional_notes').val();
// 	var checkedin = $('#checked_in').val();
// 	value['First Name'] = firstname;
// 	value['Last Name'] = lastname;
// 	value['Phone Number'] = phonenumber;
// 	value['Attendies'] = attendies;
// 	value['Notes'] = notes;
// 	value['checkedin'] = checkedin;
// 	var existingValue = localStorage.getItem(key)
// 	var keyExists = existingValue !== null;

// 	if (value === existingValue) {
// 		alert('key not updated - that value already exists silly! xD')
// 	} else if (keyExists) {
// 		updateEntry(key, value);
// 		alert('key updated - ' + key);
// 	} else if (key === '') {
// 		alert('invalid input!')
// 	} else {
// 		alert('key doesn\'t exist, please use create button instead! :D');
// 	}
// 	location.reload();

// });
