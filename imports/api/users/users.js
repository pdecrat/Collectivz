import { Accounts } from 'meteor/accounts-base';

Accounts.onLogin(function() {
  // updates lastLogin date on succesful login
  const lastLogin = Meteor.user().lastLogin;
  const date = Date.now();

  if (lastLogin < date) {
    Meteor.users.update(Meteor.userId(), {$set: {lastLogin: date }})
  }
});

if (Meteor.isServer) {
  Accounts.onCreateUser(function(options, user) {
    user.profile = options.profile || {};
    user.profile.background = '/img/ugly.jpg';
    user.profile.avatar = '/img/no-user.png';
    user.lastLogin = Date.now();
    user.subscribedGuilds = [];
    user.subscribedChannels = [];
    user.subscribedConversations = [];
    user.connections = {};
    user.coinz = 100;
    return user;
  });
}

Meteor.users.deny({
  insert() { return true; },
  update() { return true; },
  remove() { return true; },
});

if (Meteor.isClient) {
  window.Users = Meteor.users;
}
