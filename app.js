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

var salesData = {
    "jan": {
        orderCount: 2821,
        orderValue: 2464000
    },
    "feb": {
        orderCount: 2997,
        orderValue: 2717000
    },
    "mar": {
        orderCount: 3037,
        orderValue: 2922000
    },
    "apr": {
        orderCount: 3374,
        orderValue: 3442000
    },
    "may": {
        orderCount: 2731,
        orderValue: 3143000
    },
    "jun": {
        orderCount: 2467,
        orderValue: 2517000
    },
    "jul": {
        orderCount: 2247,
        orderValue: 2424000
    }
};

bot.dialog('/', [
    function (session) {
        builder.Prompts.choice(session, "Hi. I am your salesbot to help you with the sales metrics. Which month would you like sales metrics for?", salesData); 
    },
    function (session, results) {
        if (results.response) {
            var month = salesData[results.response.entity];
            session.send("%(orderCount)d were closed for a value of %(orderValue)d.", month); 
        } else {
            session.send("ok");
        }
    }
]);


server.get('/', restify.serveStatic({
 directory: __dirname,
 default: '/index.html'
}));