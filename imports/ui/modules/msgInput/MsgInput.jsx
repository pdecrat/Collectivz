import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { Meteor } from 'meteor/meteor';

// import { Chans } from '../../api/channels.js';
// import Channel from '../channel/Channel.jsx';
import './MsgInput.css';

export default class MsgInput extends Component {

  handleSubmit(event) {
    event.preventDefault();
    const msg = ReactDOM.findDOMNode(this.refs.textInput).value.trim();

    console.log(msg);
    ReactDOM.findDOMNode(this.refs.textInput).value = '';
  }

  render() {
    return (

      <div className="bar-stable bar bar-footer has-tabs item-input-inset">
        <button type="button" name="button">
          <i className="fa fa-plus-circle" aria-hidden="true"></i>
        </button>
        <label className="item-input-wrapper">
          <form className="new-msg" onSubmit={this.handleSubmit.bind(this)} >
            <input type="text" name="name" ref="textInput" defaultValue="hello"/>
          </form>
        </label>
        <button type="button" name="button">
          <i className="fa fa-paper-plane" aria-hidden="true"></i>
        </button>
      </div>
    );
  }
}

// MsgInput.propTypes = {
//   channel: PropTypes.object.isRequired,
// };
