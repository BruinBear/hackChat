Session.set('channel_id', null);

/**
* Templates
*/
Template.messages.messages = function () {
	var uid = Meteor.userId();
	var channel_id = Active_Users.find({id: uid},{}).fetch()[0].channel_id;
	//window.alert(channel_id);
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

Template.body.body_info = function () {
	
	return Session.get("body_info");
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

Template.body_info.logged_in = function () {
	if (Meteor.user())
		return true;
	return false;
}

Template.body_info.body_select = function () {
	return Session.get("body_select");
}

Template.body_info.body_info = function () {
	return Session.get("body_info");
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
			var uid = Meteor.userId();
			var channel_id = Active_Users.find({id: uid},{}).fetch()[0].channel_id;

			// FIXME: ensure channel_id is set correctly w/ server code
			// if (channel_id == '') {
			// 	channel_id = 0;	// default channel id
			// }
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
		var uid = Meteor.userId();
		var channel_id = Active_Users.find({id: uid},{}).fetch()[0].channel_id;
		window.alert(channel_id);

		// FIXME: ensure channel_id is set correctly w/ server code
		//window.alert(channel_id);
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

Template.body_info.events({
	'click input.info' : function () {
		Session.set("body_info", true);
		var subject = document.getElementById('subject').value;
		var role = '';
		if(Session.get("tutor"))
			role = "Tutor";
		else
			role = "Student";

		if(Meteor.user() && role != '' && subject != '')
		{
			Active_Users.insert({
				role: role,
				subject: subject,
				id: Meteor.userId(),
				channel_id: 0,
				available: true,
			});
			var ret = Meteor.call("findMatch");
			window.alert(ret);
			//window.alert(Active_Tutors.find({},{}).fetch()[0].subject);
		}
	},

})

//window.alert("hello");