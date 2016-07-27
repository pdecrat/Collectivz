import React, { Component, PropTypes } from 'react';
import { Meteor } from 'meteor/meteor';
import ReactDOM from 'react-dom';

import './GuildPage.css';

class GuildPage extends React.Component {
  handleClick() {
    Meteor.call('joinGuild', this.props.guild._id);
  }
  render() {
    console.log(this.props.guild);
    return (
      <div className="view-container">
        <div className="header-wrapper-guild">
          <div className="user-bg-wrapper" style={{background: "url('/img/ugly.jpg')"}}>
          </div>
          <div className="info">
            <img className="avatar" src='/img/ugly.jpg'/>
            <h2 className='username'>{this.props.guild.name}</h2>
          </div>
        </div>
        <div>
          <button onClick={this.handleClick.bind(this)}>Join guild</button>
        </div>
      </div>
      );
  }
};

GuildPage.propTypes = {
  guild: PropTypes.object.isRequired
}

export default GuildPage;
