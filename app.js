// Add your requirements
var restify = require('restify'); 
var builder = require('botbuilder'); 

var appId = process.env.MY_APP_ID || "Missing your app ID";
var appPassword = process.env.MY_APP_PASSWORD || "Missing your app password";

// Setup Restify Server
var server = restify.createServer();
server.listen(process.env.PORT || 3000, function() 
{
   console.log('%s listening to %s', server.name, server.url); 
});

// Create chat bot
var connector = new builder.ChatConnector
({ appId: process.env.MY_APP_ID, appPassword: process.env.MY_APP_PASSWORD }); 

var bot = new builder.UniversalBot(connector);
server.post('/api/messages', connector.listen());

bot.dialog('/', [
    function (session) {
        builder.Prompts.text(session, 'Hi! What is your name?');
    },
    function (session, results) {
        session.send('Hello %s!', results.response);
    }
]);

server.get('/', restify.serveStatic({
 directory: __dirname,
 default: '/index.html'
}));