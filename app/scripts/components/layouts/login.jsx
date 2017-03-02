var React = require('react');

var BaseLayout = require('./base.jsx').BaseLayout;

function LoginLayout(props){
  return (
    <BaseLayout {...props}>
        <div className="well">{props.children}</div>
    </BaseLayout>
  );
}

module.exports = {
  LoginLayout
};
