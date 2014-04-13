Meteor.startup(function () {
	Channels.insert({id : 0});
});

Meteor.methods({
	
	//allows client to clear their chat window
	clearchat : function() {
			return Messages.remove({});
		},

	//finds a teacher match for the student based on their subjects
	//if a match is found, place the teacher and student in a new channel
	findMatch : function() {
	
		//get the caller's record
		var caller = Active_Users.findOne({id : this.id}); 
		
		//if the caller was a student try to find a suitable teacher
		//otherwise find a suitable student 
		if (caller.role == "student")
			var other_id = Active_Users.findOne({role : "teacher"},{available : true},
						{cid : 0},{subject : caller.subject});

		else 
			var other_id = Active_Users.findOne({role : "student"},{available : true},
						{cid : 0});  
		
		if (other_id.count != 1)
			return -1; 
		
		//create an empty channel
		var channels = Channels.find({});
		var max_cid = channels.count;
		
		Channels.insert({ id : max_cid+1, 
				  name : "Private Help Session", 
				  type : "private",
				  num_users : 2});

		 //add matched users to the channel
		 Active_Users.update({id : this.id},{$set : {cid : max_cid}});
		 Active_Users.update({id : other_id},{$set : {cid : max_cid}}); 

		//return channel id
		return max_cid;  
	},
	
	//create a new channel(channelId is returned)   
	createChannel : function(ctype,cname) {
		var channels = Channels.find({});
		var max_cid = channels.count;
		
		Channels.insert({ id : max_cid+1, 
				  name : cname, 
				  type : ctype,
				  num_users : 0});  
		return max_cid; 
	},
	
	//returns the number of channels that were updated(should be 1)
	joinChannel : function(chanid) {

		//update the user's channel id 
		Active_Users.update({id : this.id},{$set : {cid : chanid}});
		
		//update channel count 
		return Channels.update({id : chanid},{$inc : {num_users : 1}});
	},

	leaveChannel : function(chanid) {
		//change the user's channel id to 0(default channel) 
		Active_Users.update({id : this.id},{$set : {cid : 0}});
		
		//update channel counts
		Channels.update({id : chanid},{$inc : {num_users : -1}});
		if (Channels.find({id : chanid}).num_users == 0 && (chanid != 0)
			Channels.remove({id : chanid});
	}

});  
	
