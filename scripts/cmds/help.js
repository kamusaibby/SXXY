const fs = require("fs-extra");
const axios = require("axios");
const path = require("path");
const { getPrefix } = global.utils;

if (!global.GoatBot) global.GoatBot = { commands: new Map(), aliases: new Map() };
const { commands, aliases } = global.GoatBot;

module.exports = {
  config: {
    name: "help",
    version: "2.0",
    author: "ntkhang",
    countDown: 5,
    role: 0,
    shortDescription: {
      en: "View command usage",
    },
    longDescription: {
      en: "View command usage and list all commands directly",
    },
    category: "info",
    guide: {
      en: "{pn} / help <command name>",
    },
    priority: 1,
  },

  onStart: async function ({ message, args, event, threadsData, role }) {
    try {
      const { threadID } = event;
      const threadData = await threadsData.get(threadID);
      const prefix = getPrefix(threadID);

      if (args.length === 0) {
        const categories = {};
        let msg = "";

        msg += `╔════════════╗\n 𝗬𝗢𝗨𝗥 𝗕𝗔'𝗕𝗬 くめ♕︎ \n╚════════════╝\n`;

        for (const [name, value] of commands) {
          if (value.config.role > 1 && role < value.config.role) continue;
          const category = value.config.category || "Uncategorized";
          if (!categories[category]) categories[category] = { commands: [] };
          categories[category].commands.push(name);
        }

        Object.keys(categories).forEach((category) => {
          if (category !== "info") {
            msg += `\n╭────────────⭓\n│『 ${category.toUpperCase()} 』`;
            const names = categories[category].commands.sort();
            names.forEach((item) => {
              msg += `\n│${item}`;
            });
            msg += `\n╰────────⭓`;
          }
        });

        const totalCommands = commands.size;
        msg += `\n🌈𝗕𝗮𝗯𝘆 𝘁𝗼𝘁𝗮𝗹 𝗰𝗺𝗱𝘀 : ${totalCommands} \n`;
        msg += `
   ☘︎ 🅐🅓🅜🅘🅝 × 𝐓𝐎𝐌 ☘︎`;

        const helpListImages = [
          "https://i.imgur.com/w7tuinm.gif",
          "https://i.imgur.com/hiKg3xg.gif"
        ];
        const helpListImage = helpListImages[Math.floor(Math.random() * helpListImages.length)];

        let attachment = null;
        try {
          attachment = await global.utils.getStreamFromURL(helpListImage);
        } catch (error) {
          console.error("Image fetch error:", error);
        }

        await message.reply({
          body: msg,
          attachment: attachment,
        });

      } else {
        const commandName = args[0].toLowerCase();
        const command = commands.get(commandName) || commands.get(aliases.get(commandName));

        if (!command) return message.reply(`Command "${commandName}" not found.`);

        const configCommand = command.config;
        const roleText = roleTextToString(configCommand.role);
        const author = configCommand.author || "Unknown";
        const longDescription = configCommand.longDescription?.en || "No description available";
        const guideBody = configCommand.guide?.en || "No guide available.";
        const usage = guideBody.replace(/{p}/g, prefix).replace(/{n}/g, configCommand.name);

        const response =
          `╭───    𝗖𝗢𝗠𝗠𝗔𝗡𝗗    ───╮\n` +
          `• 📌 𝗡𝗮𝗺𝗲: ${configCommand.name}\n` +
          `• 📝 𝗗𝗲𝘀𝗰: ${longDescription}\n` +
          `• 🆔 𝗔𝗹𝗶𝗮𝘀𝗲𝘀: ${configCommand.aliases ? configCommand.aliases.join(", ") : "None"}\n` +
          `• 🔖 𝗩𝗲𝗿𝘀𝗶𝗼𝗻: ${configCommand.version || "1.0"}\n` +
          `• 👤 𝗥𝗼𝗹𝗲: ${roleText}\n` +
          `• ⏳ 𝗖𝗼𝗼𝗹𝗱𝗼𝘄𝗻: ${configCommand.countDown || 1} sec\n` +
          `• 👨‍💻 𝗔𝘂𝘁𝗵𝗼𝗿: ${author}\n` +
          `• 📖 𝗨𝘀𝗮𝗴𝗲: ${usage}\n` +
          `╰──────────────────╯`;

        await message.reply(response);
      }
    } catch (error) {
      console.error("Help command error:", error);
      await message.reply("An error occurred while fetching the help menu.");
    }
  },
};

function roleTextToString(roleText) {
  const roles = {
    0: "🌍 All Users",
    1: "👥 Group Admins",
    2: "👑 Bot Admins"
  };
  return roles[roleText] || `Unknown (${roleText})`;
          }
