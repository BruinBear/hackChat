Meteor.startup(function () {
	Channels.insert({id : 0});
};

Meteor.methods({
	
	//allows client to clear their chat window
	clearchat : function() {
			return Messages.remove({});
		},

	//finds a teacher match for the student based on their subjects
	//returns the teacher's id or -1 for no match
	findMatch : function() {
		var student = Active_Students.find({id : this.id});
		if (user.count != 1) {
			return -1; 
		}

		var teachers = Active_Teachers.findOne({subjects : {$in : student.subjects},
						      {available : true});
	
		if (teachers.count == 1) 
			return teachers.id;
		else 
			return -1; 
	},
	
	//create a new channel(channelId is returned)   
	createChannel : function(type,name) {
		var channels = Channels.find({});
		var max_cid = channels.count;
		
		Channels.insert({ id : max_cid+1, 
				  name : name 
				  type : type
				  num_users : 0});  
		return max_cid; 
	},
	
	//returns the number of channels that were updated(should be 1)
	joinChannel : function(cid) {
		
		return Channels.update({id : cid},{$inc : {num_users : 1}});
	},

	leaveChannel : function(cid) {	
		Channels.update({id : cid},{$inc : {num_users : -1}});
		if (Channels.find({id : cid}).num_users == 0)
			Channels.remove({id : cid}
	}

});  
	
