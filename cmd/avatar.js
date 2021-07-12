const Discord = require("discord.js");

module.exports = {
  show: async function(msg, m){

    msg.react("📸");

    if(!msg.mentions.users.size){
      const avatarUser = new Discord.MessageEmbed()
        .setColor("#d3d3d3")
        .setAuthor(`Avatar de ${msg.author.username}`)
        .setImage(`${msg.author.displayAvatarURL({ format: "png", dynamic: true })}`);

      try{
        return msg.channel.send(avatarUser);
      }
      catch(error){
        console.error(error);
        msg.channel.send(`Houve um pequeno problema técnico...\n**Erro:** \`${error.message}\`\nExperimente esperar alguns segundos e tente de novo.`);
      }

      const avatarList = msg.mentions.users.map(user =>{
        return userAvatar = new Discord.MessageEmbed()
          .setColor("d3d3d3")
          .setAuthor(`Avatar de ${user.username}`)
          .setImage(`${user.displayAvatarURL({ format: "png", dynamic: true })}`);
      });

      try{
        msg.channel.send(avatarList);
      }
      catch(error){
        console.error(error);
        msg.channel.send(`Houve um pequeno problema técnico...\n**Erro:** \`${error.message}\`\nExperimente esperar alguns segundos e tente de novo.`);
      }
    }
  }
} 