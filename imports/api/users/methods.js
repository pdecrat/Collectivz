import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';

Meteor.methods({
  'users.changeAvatar'(url) {
    const userId = this.userId;

    if (!userId) {
      throw new Meteor.Error('not-logged-in',
        "Vous devez être connecté pour changer d'avatar.");
    }

    check(url, String);

    Meteor.users.update(userId, {
      $set: { 'profile.avatar' : url }
    });
  },

  'users.changeBackground'(url) {
    const userId = this.userId;

    if (!userId) {
      throw new Meteor.Error('not-logged-in',
        "Vous devez être connecté pour changer d'avatar.");
    }

    check(url, String);

    Meteor.users.update(userId, {
      $set: { 'profile.background' : url }
    });
  }
});