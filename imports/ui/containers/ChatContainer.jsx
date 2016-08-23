import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';

import { Messages } from '../../api/messages/collection.js';
import { Polls } from '../../api/polls/collection.js';
import { Beers } from '../../api/beers/collection.js';
import { Channels } from '../../api/channels/collection.js';

import Chat from '../components/chat/Chat.jsx';

export default createContainer(({ channel }) => {
  const messages = Messages.find({channelId: channel._id}).fetch();
  const polls = Polls.find({channelId: channel._id}).fetch();
  const beers = Beers.find({channelId: channel._id}).fetch();
  const subChannels = Channels.find({parentId: channel._id}).fetch();

  return {
    messages,
    polls,
    beers,
    subChannels,
  };
}, Chat);