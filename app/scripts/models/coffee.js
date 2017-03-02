var Backbone = require('backbone');

var parse = require('../setup');

var Coffee = Backbone.Model.extend({
  idAttribute: 'objectId',
  save: function(attributes, options){
    delete this.attributes.createdAt;
    delete this.attributes.updatedAt;

    return Backbone.Model.prototype.save.apply(this, arguments);
  }
});

var CoffeeCollection = Backbone.Collection.extend({
  model: Coffee,
  url: function(){
    return parse.BASE_API_URL + '/classes/Coffee';
  },
  parse: function(data){
    return data.results;
  }
});

module.exports = {
  Coffee,
  CoffeeCollection
};
