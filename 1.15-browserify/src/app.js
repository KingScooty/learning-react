/** @jsx React.DOM */

var React = require('react');
var MessageBox = require('./MessageBox');

var message = 'Yo!';

var reactComponent = React.renderComponent(
  <MessageBox />,
  document.getElementById('app')
);
