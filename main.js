var express = require('express');
var path = require('path');
var templates = require('consolidate');
var app = express();
var http = require('http').Server(app);


var io = require('socket.io')(http);

io.on('connection', function(socket){
    console.log('a user connected');
    socket.on('disconnect', function(){
        console.log('user disconnected');
    });

    socket.on('chat message', function(msg){
        if(msg.length > 0){
            console.log('message: ' + msg);
            io.emit('chat message', msg);
        } else {
            console.log('message: NULL');
        }
    });
});

http.listen(3001, function(){
    console.log('listening on *:3001');
});


app.use(express.static(
    path.join(__dirname, 'public')
));

app.engine('hbs', templates.handlebars);

app.set('view engine', 'hbs');
app.set('views', __dirname + '/views');



app.get('/', function(req, res){
    res.render('index', {
        title: 'Чатегг'
    });
});

app.listen(3000);