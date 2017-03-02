var Backbone = require('backbone');
var React = require('react');
var ReactDOM = require('react-dom');

var parse = require('./setup');
var LoginContainer = require('./components/login.jsx').LoginContainer;
var CoffeeListContainer = require('./components/coffee.jsx').CoffeeListContainer;

var User = require('./models/user').User;

var AppRouter = Backbone.Router.extend({
    routes: {
      '': 'login',
      'coffee/': 'coffeeList',
    },
    initialize: function(){
      // Do the parse setup to set headers and configure API url
      parse.setup({
        BASE_API_URL: 'https://tiny-parse-server.herokuapp.com'
      });
    },
    execute: function(callback, args, name) {
      // var isLoggedIn = localStorage.getItem('user');
      var user = User.current()
      if (!user && name != 'login') {
        this.navigate('', {trigger: true});
        return false;
      }

      if(user && name == 'login'){
        this.navigate('coffee/', {trigger: true});
        return false;
      }

      return Backbone.Router.prototype.execute.apply(this, arguments);
    },
    login: function(){
        ReactDOM.render(
          React.createElement(LoginContainer),
          document.getElementById('app')  // $('#app')[0]
        )
    },
    coffeeList: function(){
      console.log('coffeeList called');
      ReactDOM.render(
        React.createElement(CoffeeListContainer),
        document.getElementById('app')  // $('#app')[0]
      )
    }
});

var appRouter = new AppRouter();
