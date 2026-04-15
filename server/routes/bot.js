const express = require("express");
const router = express.Router();
const archiver = require("archiver");

let commands = [];

// Save commands
router.post("/add", (req, res) => {
  commands.push(req.body);
  res.json({ success: true, commands });
});

// Get commands
router.get("/", (req, res) => {
  res.json(commands);
});

// Generate & download bot
router.get("/publish", (req, res) => {

  res.setHeader("Content-Type", "application/zip");
  res.setHeader("Content-Disposition", "attachment; filename=bot.zip");

  const archive = archiver("zip");

  archive.pipe(res);

  // BOT FILE
  let botCode = `
const { Client, GatewayIntentBits } = require('discord.js');

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent
  ]
});

client.on('messageCreate', message => {
  if (message.author.bot) return;
`;

  commands.forEach(cmd => {
    botCode += `
  if (message.content === "${cmd.name}") {
    message.reply("${cmd.response}");
  }
`;
  });

  botCode += `
});

client.login("YOUR_BOT_TOKEN");
`;

  archive.append(botCode, { name: "bot.js" });

  // package.json for bot
  archive.append(JSON.stringify({
    name: "generated-bot",
    version: "1.0.0",
    main: "bot.js",
    dependencies: {
      discord.js: "^14.0.0"
    }
  }, null, 2), { name: "package.json" });

  archive.finalize();
});

module.exports = router;
