var React = require('react');


function BaseLayout(props){
  return (
    <div className="container">
      <div className="row">
        <div className="col-md-12">

          {props.isUserLoggedIn ? <Header /> : <AnonHeader />}

          {props.children}

        </div>
      </div>
    </div>
  );
}

function Header(props){
  return (
    <h1>Welcome to Coffee Imports Inc</h1>
  );
}

function AnonHeader(props){
  return (
    <h1>Login to Coffee Imports Inc</h1>
  );
}

module.exports = {
  BaseLayout
}
