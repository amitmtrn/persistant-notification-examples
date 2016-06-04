const readline = require('readline');
const ws = require('nodejs-websocket')

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

var server = ws.createServer(function(conn) {
    console.log('New connection')

    function sendMessage() {
        rl.question('your massage ', (answer) => {
            if (conn) {
                conn.sendText(answer);
            }
            sendMessage();
        });
    }

    sendMessage();

    conn.on('close', function(code, reason) {
        console.log('Connection closed')
    });

}).listen(3000)
