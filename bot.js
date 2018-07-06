var HTTPS = require('https');

var botID = process.env.BOT_ID;

var request = require("request");

function respond() {
  var request = JSON.parse(this.req.chunks[0]),
      botRegex =  /^bro/i;

  if(request.text && botRegex.test(request.text)) {
    this.res.writeHead(200);
    postMessage();
    
    module.exports = function (bot, message) {
      //request("http://api.giphy.com/v1/gifs/search?q=fail&api_key=dc6zaTOxFJmzC", function (error, response, body){
      request("http://api.giphy.com/v1/gifs/search?q=fail&api_key=dc6zaTOxFJmzC", function (error, response, body){
      var data = JSON.parse(body);

   //   var max = data.data.length;
    //  var min = 0;

   //   var randomNumber = Math.floor(Math.random() * (max - min)) + min;

   //   gifUrl = data.data[randomNumber].images.downsized.url;

      replyMessage = "I don't think you know what you're saying\n" + "https://media.giphy.com/media/4FIj8fevJkFNK/giphy.gif";

      bot.reply(message, replyMessage);
});
      
      //Remove "working on it" reaction
    bot.api.reactions.remove({timestamp: message.ts, channel: message.channel, name: 'thinking_face'},function(err,res) {
      if (err) {
        bot.botkit.log("Failed to remove emoji reaction :(",err);
      }
    });

    
    //Add "sorry it failed" reaction
    bot.api.reactions.add({timestamp: message.ts, channel: message.channel, name: 'slightly_frowning_face'},function(err,res) {
      if (err) {
        bot.botkit.log("Failed to add emoji reaction :(",err);
      }
    });
};
    
    this.res.end();
  } else {
    console.log("don't care");
    this.res.writeHead(200);
    this.res.end();
  }
}

function postMessage() {
  var botResponse, options, body, botReq;

  botResponse = "Hell yeah, brother!!";

  options = {
    hostname: 'api.groupme.com',
    path: '/v3/bots/post',
    method: 'POST'
  };

  body = {
    "bot_id" : botID,
    "text" : botResponse
  };

  console.log('sending ' + botResponse + ' to ' + botID);

  botReq = HTTPS.request(options, function(res) {
      if(res.statusCode == 202) {
        //neat
      } else {
        console.log('rejecting bad status code ' + res.statusCode);
      }
  });

  botReq.on('error', function(err) {
    console.log('error posting message '  + JSON.stringify(err));
  });
  botReq.on('timeout', function(err) {
    console.log('timeout posting message '  + JSON.stringify(err));
  });
  botReq.end(JSON.stringify(body));
}


exports.respond = respond;
