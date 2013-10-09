Games = new Meteor.Collection("games");

Template.scratch.events({
    'keyup': function(){
	wd = $('#scratch').val();
	var math = MathJax.Hub.getAllJax("MathDiv")[0];
	MathJax.Hub.Queue(["Text",math,wd]);
    }
});

Template.problem.q = function(){
    var game = Games.findOne({_id:Session.get('game_id')});
    if(game && game.hasOwnProperty('q')){
	console.log(game['q']);
	var math = MathJax.Hub.getAllJax("MathProblem")[0];
	MathJax.Hub.Queue(["Text",math,'y+2']);
    }
}

Meteor.startup(function(){
    var game_id = Games.insert({});
    console.log(game_id);
    Session.set('game_id',game_id);
    Deps.autorun(function () {
	  if (Session.get('game_id')) {
	      Meteor.subscribe('games', game_id);
	      Meteor.call("nextQuestion",Session.get('game_id'));
	  }
    });
});
