Games = new Meteor.Collection("games");

inverseFunction = function(){
    var choice = _.random(0, 1);
    var a = _.random(-20,20);
    var b = _.random(0,20);
    var signused = _.shuffle(['+','-']);

    while(a==0){
	a = _.random(-20,20);
    }
    if(choice==1){
	while(b == 0){
	    b = _.random(0,20);
	}
    }
    if(choice == 0){
	str = "f(x) = " + a + "x " + signused + " " + b + ", find f(-1)(x)";
    } else {
	if (signused=="-"){
	    str = "f(x) = " + signused + " " + b + "/x, find f(-1)(x)";
	} else {
	    str = "f(x) = " + b + "/x, find f(-1)(x)";
	}
    }
    
    return (str);
}

Meteor.startup(function(){

});

Meteor.methods({
    nextQuestion: function (game_id){
	var str = inverseFunction();
	Games.update({_id:game_id},{$set:{q:str}});
    }
});
