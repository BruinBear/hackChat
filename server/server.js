// Startup

Meteor.startup(function() {
	Channels.insert({num : 0});
	return Meteor.methods({
		clearchat : function() {
			return Messages.remove({});
		}
	})
})