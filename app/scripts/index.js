var $ = require('jquery');
var Backbone = require('backbone');

require('./router');

// Wait for DOM ready
$(function(){
  Backbone.history.start();
});
