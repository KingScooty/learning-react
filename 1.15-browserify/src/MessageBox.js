/** @jsx React.DOM */

var React = require('react');
var SubMessage = require('./SubMessage');

var MessageBox = React.createClass({

  deleteMessage: function (message) {
    var newMessages = _.without(this.state.messages, message);
    this.setState({
      messages: newMessages
    })
  },

  handleAdd: function(e) {
    var newMessage = this.refs.newMessage.getDOMNode().value;
    var newMessages = this.state.messages.concat([newMessage]);
    console.log(this.state);
    this.setState({
      messages: newMessages
    });
  },

  getInitialState: function() {
    return {
      isVisible: true,
      messages: [
        'I like the world',
        'Coffee flavoured ice cream is highly overrated',
        'My spoon is too big',
        'Tuesday is coming. Did you bring your coat?',
        'I am a banana'
      ]
    }
  },

  render: function() {

    var inlineStyles = {
      display: this.state.isVisible ? 'block' : 'none'
    }

    var messages = this.state.messages.map(function(message) {
      return <SubMessage message={message} onDelete={this.deleteMessage} bacon={this.bacon} />
    }.bind(this));

    return (
      <div className="container jumbotron" style={inlineStyles}>
        <h1>Hello, World!</h1>
        <input ref="newMessage" type="text" />
        <button className="btn btn-primary" onClick={this.handleAdd}>Add</button>
        { messages }
      </div>
    )
  }
});


module.exports = MessageBox;
