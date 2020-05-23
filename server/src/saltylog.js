// Responsible for picking out the relevant data and forwarding
// It to be submitted to the DB
const tmi = require('tmi.js');
const db = require('./db/db.js');

const channelName = 'saltybet';
const refBotName = 'WAIFU4u';

// strings for identifying when to process a message
const openMatchStr = 'Bets are OPEN';
const lockMatchStr = 'Bets are locked.';
const endMatchStr = 'wins!';
const modeSwitchStr = 'will start shortly.';

const client = new tmi.Client({
  connection: {
    secure: true,
    reconnect: true,
  },
  channels: [channelName],
});

client.connect();

let lastMessage = 'none';

client.on('message', (channel, tags, message, self) => {
  if (tags['display-name'] === refBotName) {
    console.log(`${tags['display-name']}: ${message}`);

    if(message.match(openMatchStr)) {
      lastMessage = message;
    } else if(message.match(lockMatchStr)) {
      lastMessage = message;
    } else if(message.match(endMatchStr)) {
      lastMessage = message;
    } else if(message.match(modeSwitchStr)) {
      lastMessage = message;
    }
  }
});

const getLastMessage = () => {
  return lastMessage;
};

const getOrCreateFighterID = async (name, tier) => {
  const id = await db.getFighterID(name, tier)
      .then((result) => {
        if(result) {
          return result;
        }
        return db.createFighter(name, tier);
      })
      .catch((err) => {
        throw err;
      });
  return id;
};

module.exports = {
  getLastMessage,
  getOrCreateFighterID,
};
