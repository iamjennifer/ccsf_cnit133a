(function() {

window.App = {
	Models: {},
	Collections: {},
	Views: {}
};

window.template = function(id) {
	return _.template( $('#' + id).html() );
};


// Person Model
App.Models.Person = Backbone.Model.extend({
	defaults: {
		name: 'Guest User',
		age: 'age unknown',
		occupation: 'occupation unknown',
        gender: 'gender unknown'
	}
});

// A collection/list of People
App.Collections.People = Backbone.Collection.extend({
	model: App.Models.Person
});



// The View for a Person
App.Views.Person = Backbone.View.extend({
	tagName: 'li',

	template: template('personTemplate'),	
	
	initialize: function(){
		this.model.on('change', this.render, this);
		this.model.on('destroy', this.remove, this);
	},
	
	events: {
	 	'click .editperson' : 'editPerson',
		'click .editage' : 'editAge',
        'click .editoccupation' : 'editOccupation',
        'click .editgender' : 'editGender',
	 	'click .delete' : 'DestroyPerson'
	},
	
	editPerson: function(){
		var newName = prompt("Please enter the new name", this.model.get('name'));
		if (!newName) return;
		this.model.set('name', newName);
	},

    editAge: function(){
        var newAge = prompt("Please enter your age", this.model.get('age'));
        if (!newAge) return;
        this.model.set('age', newAge);
    },

    editOccupation: function(){
        var newOccupation = prompt("Please enter your occupation", this.model.get('occupation'));
        if (!newOccupation) return;
        this.model.set('occupation', newOccupation);
    },

    editGender: function(){
        var newGender = prompt("Please enter your gender", this.model.get('gender'));
        if (!newGender) return;
        this.model.set('gender', newGender);
    },

    DestroyPerson: function(){
		this.model.destroy();
	},
	
	remove: function(){
		this.$el.remove();
	},
	
	render: function() {
		this.$el.html( this.template(this.model.toJSON()) );
		return this;
	}
});



// View for adding a person's name, age, occupation, gender

App.Views.AddPerson = Backbone.View.extend({
	el: '#addPerson',

	events: {
		'submit': 'submit'
	},

	// once press submit, it will collect all the value from the inputs
	submit: function(e) {
		e.preventDefault();
		var newPersonName = $(e.currentTarget).find('input:nth-child(1)').val();
        var newPersonAge = $(e.currentTarget).find('input:nth-child(2)').val();
        var newPersonOccupation = $(e.currentTarget).find('input:nth-child(3)').val();
        var newPersonGender = $(e.currentTarget).find('input[name=toggle]:checked').val();


		// print new person's name, age, occupation, gender
        var person = new App.Models.Person({ name: newPersonName,
											 age: newPersonAge,
											 occupation: newPersonOccupation,
											 gender: newPersonGender });
		this.collection.add(person);

	}
});




// View for all people
    App.Views.People = Backbone.View.extend({
        tagName: 'ul',

        initialize: function() {
            this.collection.on('add', this.addOne, this);
        },

        render: function() {
            this.collection.each(this.addOne, this);

            return this;
        },

        addOne: function(person) {
            var personView = new App.Views.Person({ model: person });
            this.$el.append(personView.render().el);
        }
    });






// hardcoded data
var peopleCollection = new App.Collections.People([
	{
		name: 'Mohit Jain',
		age: 26
	},
	{
		name: 'Taroon Tyagi',
		age: 25,
		occupation: 'web designer'
	},
	{
		name: 'Rahul Narang',
		age: 26,
		occupation: 'Java Developer'
	}
]);


var addPersonView = new App.Views.AddPerson({ collection: peopleCollection });

peopleView = new App.Views.People({ collection: peopleCollection });

$(document.body).append(peopleView.render().el);
})();
