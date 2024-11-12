const axios = require('axios');
const { sendMessage } = require('../handles/sendMessage');
const fs = require('fs');

const token = fs.readFileSync('token.txt', 'utf8');

module.exports = {
  name: 'ai',
  description: 'Allow's you to chat the ai',
  author: 'Jay Ar',

  async execute(senderId, args) {
    const pageAccessToken = token;
    const input = (args.join(' ') || 'hi').trim();
    const modifiedPrompt = `${input}, direct answer.`;

    try {
      const response = await axios.get(`https://example-api.com/api?query=${encodeURIComponent(modifiedPrompt)}`);
      const data = response.data;
      const formattedMessage = `JayChat\n・───────────・\n${data.response || 'This is an example response.'}\n・──── >ᴗ< ────・\n Creator : www.facebook.com/JayCantFinddd `;

      await sendMessage(senderId, { text: formattedMessage }, pageAccessToken);
    } catch (error) {
      console.error('Error:', error);
      await sendMessage(senderId, { text: 'Error: Unexpected error.' }, pageAccessToken);
    }
  }
};
