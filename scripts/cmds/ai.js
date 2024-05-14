const axios = require('axios');


const Prefixes = [

'gpt',

'Ai',

'ask',

];


module.exports = {

config: {

name: 'ai',

version: '2.5.4',

author: 'cliff',//credits owner of this api

role: 0,

category: 'ai',

shortDescription: {

en: 'Asks an AI for an answer.',

},

longDescription: {

en: 'Asks an AI for an answer based on the user prompt.',

},

guide: {

en: '{pn} [prompt]',

},

},

langs: {

en: {

final: "🤖|Test|",

loading: "🤖|Test|\n━━━━━━━━━━━━━━━\n⏳ | 𝑃𝑙𝑒𝑎𝑠𝑒 wait..."

}

},

onStart: async function () {},

onChat: async function ({ api, event, args, getLang, message }) {

try {

const prefix = Prefixes.find((p) => event.body && event.body.toLowerCase().startsWith(p));


if (!prefix) {

return;

}


const prompt = event.body.substring(prefix.length).trim();


if (prompt === '') {

await message.reply(

"Kindly provide the question at your convenience and I shall strive to deliver an effective response. Your satisfaction is my top priority."

);

return;

}


const loadingMessage = getLang("loading");

const loadingReply = await message.reply(loadingMessage);

const url = "https://hercai.onrender.com/v3/hercai"; // Replace with the new API endpoint

const response = await axios.get(`${url}?question=${encodeURIComponent(prompt)}`);


if (response.status !== 200 || !response.data) {

throw new Error('Invalid or missing response from API');

}


const messageText = response.data.reply.trim(); // Adjust according to the response structure of the new API

const userName = getLang("final");

const finalMsg = `${userName}\n━━━━━━━━━━━━━━━\n${messageText}\n━━━━━━━━━━━━━━━\n`;

api.editMessage(finalMsg, loadingReply.messageID);


console.log('Sent answer as a reply to user');

} catch (error) {

console.error(`Failed to get answer: ${error.message}`);

api.sendMessage(

`${error.message}.\n\nYou can try typing your question again or resending it, as there might be a bug from the server that's causing the problem. It might resolve the issue.`,

event.threadID

);

}

},

};