import { Polls } from "./polls/collection";
import { Beers } from "./beers/collection";
import { Channels } from "./channels/collection";
import { Coins } from "./coins/collection";
import { Messages } from "./messages/collection";

export const Collections = {
  poll: Polls,
  beer: Beers,
  channel: Channels,
  group: Channels,
  conversation: Channels,
  coin: Coins,
  message: Messages
};
