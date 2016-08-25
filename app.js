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

//default...
/*
bot.dialog('/', [
    function (session) {
        builder.Prompts.text(session, 'Hi! What is your name?');
    },
    function (session, results) {
        session.send('Hello %s!', results.response);
    }
]);
*/

var ticketData = {
    "jan": {
        inflow: 2821,
        resolved: 2464,
        backlog: 1358
    },
    "feb": {
        inflow: 2997,
        resolved: 2717,
        backlog: 1638
    },
    "mar": {
        inflow: 3037,
        resolved: 2922,
        backlog: 1753
    },
    "apr": {
        inflow: 3374,
        resolved: 3442,
        backlog: 1685
    },
    "may": {
        inflow: 2731,
        resolved: 3143,
        backlog: 1273
    },
    "jun": {
        inflow: 2467,
        resolved: 2517,
        backlog: 1223
    },
    "jul": {
        inflow: 2247,
        resolved: 2424,
        backlog: 1046
    }
};

bot.dialog('/', [
    function (session) {
        builder.Prompts.choice(session, "Hi. I am your tiketbot to help you with theticket metrics. Which month would you like ticket metrics for?", ticketData); 
    },
    function (session, results) {
        if (results.response) {
            var month = ticketData[results.response.entity];
            session.send("For the month of %(results.response.entity)s, there was an inflow of %(inflow)d tickets. Team resolved %(resolved)d and ended up with a backlog of %(backlog)d.", month); 
        } else {
            session.send("ok");
        }
    }
]);


server.get('/', restify.serveStatic({
 directory: __dirname,
 default: '/index.html'
}));