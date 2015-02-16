/** @jsx React.DOM */

var React = require('react');

var SubMessage = React.createClass({

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
      <div>
        {this.props.message}
        <button onClick={this.handleDelete} className="btn btn-danger">&times;</button>
      </div>
    );
  }
});

module.exports = SubMessage;
