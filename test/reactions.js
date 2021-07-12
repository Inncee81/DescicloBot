//adicionar mais reações no futuro.
module.exports = {
  execute: async function(message){
    //Id: 863686392864571392
    if((message.channel.id === "863686392864571392") && (message.content.toLowerCase() === "umanydad" || message.content.toLowerCase() === "xerox" || 
    message.content.toLowerCase() === "smalkade")){
      try{
        await message.react("🇬");
        await message.react("🇦");
        await message.react("🇾");
      } catch(error){
        console.error("Falha em adicionar reações.")
      }
    }
  }
}