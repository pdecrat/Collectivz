import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';
import { Chans } from '../../api/collections.js';

import ChanPage from '../pages/ChanPage.jsx';

export default createContainer(() => {
  // Meteor.subscribe('users');
  return {
    channels: Chans.find({}).fetch(),
  };
}, ChanPage);
