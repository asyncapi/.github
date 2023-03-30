const { WebClient } = require('@slack/web-api');

const slackBot = {
  client: null,
  init: function(token) {
    this.client = new WebClient(token);
  },
  postMessage: async function(message) {
    if (this.client) {
      const result = await this.client.chat.postMessage({
        channel: '#general', // Replace with your desired channel name or ID
        text: message
      });
      console.log(`Message sent: ${result.ts}`);
    } else {
      console.error('Slack bot client is not initialized.');
    }
  }
};

module.exports = slackBot;
