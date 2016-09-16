import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';

import { Channels } from '../channels/collection.js';

class messageCollection extends Mongo.Collection {

  insert(message, callback) {
    message.createdAt = Date.now();
    message.author = message.author ? message.author
      : Meteor.users.findOne({username: 'Zorro'})._id;

    const author = Meteor.users.findOne(message.author);
    message.authorName = author.username;
    const lastMessage = {
      author: author.username,
      text: message.text
    };
    Channels.update(message.channelId, {
      $set: { lastActivity: message.createdAt, lastMessage: lastMessage },
      $inc: { messageCount: 1 }
    });
    return super.insert(message);
  }

  remove(message, callback) {
    const _message = Messages.findOne(message);
    const lastMessage = {
      text: 'Message supprimé.'
    };
    const channel = Channels.findOne(_message.channelId);

    if (channel.lastMessage.text === _message.text) {
      Channels.update(_message.channelId, {
        $set: { lastMessage },
        $inc: { messageCount: -1 }
      });
    } else {
      Channels.update(_message.channelId, {
        $inc: { messageCount: -1 }
      });
    }

    const hasSeenFieldName = 'hasSeen.' + channel._id;
    Meteor.users.update(
      { subscribedChannels : { $in: [channel._id] } },
      { $inc: { [hasSeenFieldName] : -1 } },
      { multi : true}
    );

    return super.remove(message, callback);
  }
}

export const Messages = new messageCollection('messages');

if (Meteor.isClient) {
  window.Messages = Messages;
}
