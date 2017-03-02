var React = require('react');
var Backbone = require('backbone');

var LoginLayout = require('./layouts/login.jsx').LoginLayout;

var User = require('../models/user').User;

class LoginContainer extends React.Component {
  constructor(props){
    super(props);
    this.login = this.login.bind(this);
  }
  login(creds){
    User.login(creds, function(user){
      Backbone.history.navigate('coffee/', {trigger: true});
    });
  }
  createAccount(creds){
    // User.signup(creds);
    var user = new User(creds);
    user.save().then(function(data){
      localStorage.setItem('user', JSON.stringify(data));
      Backbone.history.navigate('coffee/', {trigger: true});
    });
  }
  render(){
    return (
      <LoginLayout isUserLoggedIn={true}>
        <div className="col-md-6">
          <h1>Login</h1>
          <LoginForm action={this.login} submitBtn="Login"/>
        </div>
        <div className="col-md-6">
          <h1>Sign Up</h1>
          <SignupForm action={this.createAccount} submitBtn="Create Account"/>
        </div>
      </LoginLayout>
    )
  }
}

class LoginForm extends React.Component {
  constructor(props){
    super(props);

    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

    this.state = {
      username: '',
      password: ''
    };
  }
  handleEmailChange(e){
    this.setState({username: e.target.value});
  }
  handlePasswordChange(e){
    this.setState({password: e.target.value});
  }
  handleSubmit(e){
    e.preventDefault();
    // input data.... this.state
    this.props.action(this.state);
  }
  render(){
    return (
      <form onSubmit={this.handleSubmit}>
        <div className="form-group">
          <label htmlFor="email-login">Email address</label>
          <input onChange={this.handleEmailChange} className="form-control" name="email" id="email-login" type="email" placeholder="email" />
        </div>

        <div className="form-group">
          <label htmlFor="password-login">Password</label>
          <input onChange={this.handlePasswordChange} className="form-control" name="password" id="password-login" type="password" placeholder="Password Please" />
        </div>

        <input className="btn btn-primary" type="submit" value={this.props.submitBtn} />
      </form>
    )
  }
}


class SignupForm extends LoginForm {

}

module.exports = {
  LoginContainer
}
