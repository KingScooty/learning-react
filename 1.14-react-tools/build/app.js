/** @jsx React.DOM */

var MessageBox = React.createClass({displayName: "MessageBox",

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
      return React.createElement(SubMessage, {message: message, onDelete: this.deleteMessage, bacon: this.bacon})
    }.bind(this));

    return (
      React.createElement("div", {className: "container jumbotron", style: inlineStyles}, 
        React.createElement("h1", null, "Hello, World!"), 
        React.createElement("input", {ref: "newMessage", type: "text"}), 
        React.createElement("button", {className: "btn btn-primary", onClick: this.handleAdd}, "Add"), 
        messages 
      )
    )
  }
});

var SubMessage = React.createClass({displayName: "SubMessage",

  handleDelete: function (e) {
    //console.log(this.props.message);
    this.props.onDelete(this.props.message);
  },

  propTypes: {
    message: React.PropTypes.string.isRequired
  },

  getDefaultProps: function () {
    return {
      message: 'Its good to see you'
    }
  },

  render: function () {
    return (
      React.createElement("div", null, 
        this.props.message, 
        React.createElement("button", {onClick: this.handleDelete, className: "btn btn-danger"}, "×")
      )
    );
  }
})

var message = 'Yo!';

var reactComponent = React.renderComponent(
  React.createElement(MessageBox, null),
  document.getElementById('jsx')
);
