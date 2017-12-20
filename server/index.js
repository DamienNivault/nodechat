const server = require('http').createServer()
const io = require('socket.io')(server, {path: '/'})

server.listen(50437)
io.on('connection', clientSocket => {
    console.log('Hello', clientSocket.id)

    clientSocket.on('message', message => {
        console.info(`[message] ${message.author} écrit : ${message.text}`)

        // le serveur redistribue le message à tous les autres clients connectés
        clientSocket.broadcast.emit('message', message)
    })
})

