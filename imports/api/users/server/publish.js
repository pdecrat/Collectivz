import { Meteor } from 'meteor/meteor';

import { Channels } from '../../channels/collection.js';
import { Messages } from '../../messages/collection.js';
import { History } from '../../history/collection.js';
import { Guilds } from '../../guilds/collection.js';

Meteor.publish('user', function() {
  if (this.userId) {
    let zorro = Meteor.users.findOne({username: 'Zorro'});
    return [
      Meteor.users.find({_id: { $in: [ this.userId,  zorro._id ] }}, {fields: {
        username: 1,
        subscribedGuilds: 1,
        subscribedConversations: 1,
        subscribedChannels: 1,
        connections: 1,
        profile: 1,
        history: 1,
        repertory: 1,
        lastReadAt: 1
      }}),
      History.find({ userId: this.userId })
    ];
  } else {
    this.ready();
  }
});

Meteor.publish('userProfile', function(userId) {
  if (this.userId) {
    const user = Meteor.users.findOne(userId);

    return [
      Meteor.users.find(userId),
      Channels.find({ _id: { $in: user.subscribedChannels } }),
      Guilds.find({ _id: { $in: user.subscribedGuilds } }),
      History.find({ userId: user._id })
    ];
  } else {
    this.ready();
  }
});

Meteor.publish('unread-count', function() {
  if (this.userId) {
    const self = this;
    let initializing = true;
    const user = Meteor.users.findOne(this.userId, { fields: {
      subscribedChannels: 1,
      subscribedConversation: 1,
      lastReadAt: 1
    } });
    const userChannels = user.subscribedChannels.concat(user.subscribedConversation);
    const unreadCounts = [];
    const handle = Messages.find(
      { channelId: { $in: userChannels } }
    ).observeChanges({
      added(id, fields) {
        if (fields.createdAt > user.lastReadAt[fields.channelId]) {
          const unreadObjectIndex = unreadCounts.findIndex(doc => {
            if (doc && doc.channelId === fields.channelId) {
              return true;
            }
            return false;
          });

          if (unreadObjectIndex === -1) {
            unreadCounts.push({
              channelId: fields.channelId,
              count: 1
            });
          } else {
            unreadCounts[unreadObjectIndex].count++;
          }
        }
      }
    });

    unreadCounts.forEach((count, index) => {
      self.added('unread-count', index, count);
    });
    self.ready();
    self.onStop(() => {
      handle.stop();
    });

  } else {
    this.ready();
  }
});
