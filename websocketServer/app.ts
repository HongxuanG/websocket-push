// const { createServer } = require('http')
// const { Server } = require('socket.io')
const port = 5173
// const httpServer = createServer(app)
// const io = new Server(httpServer, {
//   cors: {
//     origin: 'http://127.0.0.1:5173',
//   },
// })

// io.on('connection', (socket) => {
//   console.log('socket id', socket.id)
//   socket.on('chat message', (e) => {
//     console.log('e', e)
//     socket.emit('send message', e)
//   })
//   setInterval(() => {
//     socket.emit('send message', '怎么不回复我，渣男')

//   }, 5000);
// })

// httpServer.listen(port, () => {
//   console.log(
//     `Example app listening on port ${port}, http://127.0.0.1:${port}/`
//   )
// })

import WebSocket, { WebSocketServer } from 'ws'
const wss = new WebSocket.Server({ host: '127.0.0.1', port: port })
// const ws = new WebSocket(`ws://127.0.0.1:${port}`)
wss.on('connection', function connection(ws) {
  console.log('connected')
  ws.on('message', (data) => {
    console.log('received: ', data)
    ws.send(data, (err) => {
      if (err) {
        console.log(`[SERVER] error: ${err}`)
      }
    })
  })
})
const interval = setInterval(() => {
  wss.clients.forEach((client) => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(`怎么不回复我，${Math.random() - 0.5 > 0 ? '暖男' : '渣男'}`)
    }
  })
}, 5000)
wss.on('open', () => {
  console.log('open connected')
  wss.send('something')
})

wss.on('close',() => {
  clearInterval(interval)
  console.log('disconnected')
})
