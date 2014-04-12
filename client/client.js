Session.set('channel_id', null);

/**
* Templates
*/
Template.messages.messages = function () {
	var channel_id = document.getElementById('channel_id');
	if (channel_id == '') {
		channel_id = 0;	// default channel id
	}
	return Messages.find({channel_id : channel_id}, { sort: { time: -1}});
}

Template.body.logged_in = function () {
	if (Meteor.user())
		return true;
	return false;
	//return Session.get("logged_in");
}

Template.body.body_select = function () {
	
	return Session.get("body_select");
}

Template.body_select.logged_in = function () {
	if (Meteor.user())
		return true;
	return false;
	//return Session.get("logged_in");
}

Template.body_select.body_select = function () {
	return Session.get("body_select");
}

Template.login.logged_in = function () {
	if (Meteor.user())
		return true;
	return false;
	//return Session.get("logged_in");
}

Template.input.events({

	// 'keydown input#name' : function (event) {
	// 	if (event.which == 13) { // 13 is enter key event
	// 		Session.set("name", document.getElementById('name').value);
	// 	}
	// },

	'keydown input#message' : function (event) {
		if (event.which == 13) { // 13 is enter key event
			Session.set("name", document.getElementById('name').value);
			var name = Session.get("name");
			if (name == '') {
				name = "Anonymous";
			}
			var channel_id = document.getElementById('channel_id');
			if (channel_id == '') {
				channel_id = 0;	// default channel id
			}
			var message = document.getElementById('message');
			if (message.value != '') {
				Messages.insert({
					name: name,
					message: message.value,
					time: Date.now(),
					channel_id: channel_id,
				});

				document.getElementById('message').value = '';
				message.value = '';
			}
		}
	},

	'click input#send' : function () {
		Session.set("name", document.getElementById('name').value);
		var name = Session.get("name");
		var message = document.getElementById('message');
		if (name == '') {
			name = "Anonymous";
		}
		var channel_id = document.getElementById('channel_id');
		if (channel_id == '') {
			channel_id = 0;	// default channel id
		}
		if (message.value != '') {
			Messages.insert({
				name: name,
				message: message.value,
				time: Date.now(),
				channel_id: channel_id,
			});
		}
		document.getElementById('message').value = '';
		message.value = '';
		//Meteor.call('clearchat');
	},

});

Template.clearall.events({
	'click input#clear_chat' : function () {
		Meteor.call('clearchat');
	},
})

Template.login.events({
	'click input.clicked' : function () {
		Session.set("logged_in", true);
		//window.alert("working");
	},
})

Template.body_select.events({
	'click input.tutor' : function () {
		Session.set("body_select", true);
		Session.set("tutor", true);
	}
})

Template.body_select.events({
	'click input.learn' : function () {
		Session.set("body_select", true);
		Session.set("tutor", false);
	}
})

//window.alert("hello");