module.exports = {
 config: {
  name: "my-eyes",
  version: "1.0",
  author: "AceGun",
  countDown: 5,
  role: 0,
  shortDescription: "no prefix",
  longDescription: "no prefix",
  category: "no prefix", },
 onStart: async function(){}, 
 onChat: async function({ event, message, getLang }) {
 if (event.body && event.body.toLowerCase() === "eyes") {
 return message.reply({
 body: "👾",
 attachment: await global.utils.getStreamFromURL("https://i.imgur.com/d4DBLl3.mp4")
 });
 }
 }
   }
