import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';

class GuildCollection extends Mongo.Collection {
  insert(guild, callback) {
    const userId = Meteor.userId();

    guild.members = [userId];
    guild.leaders = [userId];
    guild.createdAt = new Date();

    if (!super.findOne({name: guild.name})) {
      return super.insert(guild, callback);
    } else {
      throw new Meteor.Error('guild-exists',
        "Une guilde portant ce nom existe déjà");
    }
  }
}

export const Guilds = new GuildCollection('guilds');

if (Meteor.isClient) {
  window.Guilds = Guilds;
}