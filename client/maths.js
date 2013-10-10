Games = new Meteor.Collection("games");

nextQ = function(){
    $('#scratch').val('');
    var math = MathJax.Hub.getAllJax("MathDiv")[0];
    MathJax.Hub.Queue(["Text",math,'']);
    Meteor.call("nextQuestion",Session.get('game_id'));
}

Template.scratch.events({
    'keyup': function(evt){
	if (evt.which === 13) {
	    nextQ();
	} else {
	    wd = $('#scratch').val();
	    var math = MathJax.Hub.getAllJax("MathDiv")[0];
	    MathJax.Hub.Queue(["Text",math,wd]);
	}
    }
});

Template.buttons.events({
    'click': function(){
	nextQ();
    }
});

Template.problem.game = function(){
    var game = Games.findOne({_id:Session.get('game_id')});
    if(game && game.hasOwnProperty('q')){
	return(game);
    }
}

Template.problem.rendered = function(){
    MathJax.Hub.Queue(["Typeset",MathJax.Hub]);
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
