let autoreactEnabled = true;

module.exports = {
  config: {
    name: "autoreact",
    aliases: ["ar"],
    version: "1.1",
    role: 2,
    author: "Servants of God",
    longDescription: "Useless",
    category: "fun",
    guide: {
      en: "{pn} on/off",
    },
  },
  onChat: async function ({ api, event }) {
    if (!autoreactEnabled) return;

    const message = event.body.toLowerCase();

    if (message.includes("love")) {
      api.setMessageReaction("❤️", event.messageID, handleReactionCallback);
    } else if (message.includes("haha") || message.includes("wkwk") || message.includes("awok")) {
      api.setMessageReaction("😆", event.messageID, handleReactionCallback);
    } else if (message.includes("bodoh") || message.includes("anjing") || message.includes("mmk")) {
      api.setMessageReaction("😠", event.messageID, handleReactionCallback);
    } else if (event.attachments && event.attachments[0]?.type === "sticker" && event.attachments[0]?.stickerID === "369239263222822") {
      api.setMessageReaction("😠", event.messageID, handleReactionCallback);
    } else if (message.includes("cinta")) {
      api.setMessageReaction("❤️", event.messageID, handleReactionCallback);
    }
  },
  onStart: async function ({ api, event, args }) {
    if (args.length === 0) {
      return api.sendMessage("Use 'on' to enable and 'off' to disable autoreact.", event.threadID);
    }

    if (args[0] === "on") {
      autoreactEnabled = true;
      return api.sendMessage("Autoreact is activated.", event.threadID);
    } else if (args[0] === "off") {
      autoreactEnabled = false;
      return api.sendMessage("Autoreact is disabled.", event.threadID);
    }
  },
};

function handleReactionCallback(err) {
  if (err) {
    console.error("Error:", err);
  } else {
    console.log("Reaction added successfully!");
  }
}
