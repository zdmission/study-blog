# 服务端客户端双向数据通信

### 1. 基于nodejs的，使用net
客户端：
```js
var net = require('net')
var port = 9000
var host = '127.0.0.1'
var client = new net.Socket()
// 连接服务端
client.connect(port, host, function () {
  client.write('您好')
})
// 接收服务端的数据
client.on('data', function (data) {
  console.log('服务端传来：' + data);
  say()
})
// 捕获错误
client.on('error', function (err) {
  console.log(err);
})
// 监听服务端关闭
client.on('close', function () {
  console.log('connection closed');
})
// if (true) {
//   require('./abc.js')
// } else {
//   require('./def.js')
// }

// 引入命令行输入的包 readline，并初始化
var readline = require('readline')
var r1 = readline.createInterface({
  input: process.stdin,
  output: process.stdout
})
function say() {
  r1.question('请输入：', function (inputStr) {
    if (inputStr == 'bye') {
      client.destroy() // 关闭连接
      r1.close()
    } else {
      client.write(inputStr + '\n')
    }
  })
}
```

服务端：
```js
var net = require('net')
var chatServer = net.createServer()
var clientMap = new Object()
var i = 0 //连接名称的流水号
chatServer.on('connection', function (client) {
  console.log('客户端有人连接上来了');
  client.name = ++i
  clientMap[client.name] = client
  // 监听客户端发送来的消息
  client.on('data', function (data) {
    console.log('客户端传来：' + data);
    broadcast(data, client)
  })
  // 数据传输错误的处理
  client.on('error', function (e) {
    console.log('client error:' + e);
    client.end()
  })
  // 客户端关闭的监听
  client.on('close', function (data) {
    delete clientMap[client.name]
    console.log(client.name + '下线了');
    broadcast(client.name + '下线了', client)
  })
})
function broadcast(data, client) {
  for (var key in clientMap) {
    if (clientMap.hasOwnProperty(key)) {
      clientMap[key].write(client.name + '说: ' + data + '\n')
    }
  }
}
chatServer.listen(9000)
```

### 2. h5中的websocket
客户端：
```js
var ws = new WebSocket('ws://127.0.0.1:9000')
ws.onopen = function () {
  ws.send('大家好')
}
ws.onmessage = function (event) {
  var chatroom = document.querySelector('#chatroom')
  chatroom.innerHTML += '<br/>' + event.data
}
ws.onclose = function () {
  console.log('Closed');
}
ws.onerror = function (err) {
  console.log(err);
}
```

服务端：
```js
var WebSocketServer = require('ws').Server
var wss = new WebSocketServer({port: 9000})
var clientMap = new Object()
var i = 0
wss.on('connection', function (ws) {
  console.log('有人上线了')
  ws.name = ++i
  clientMap[ws.name] = ws
  ws.on('message', function (message) {
    broadcast(message, ws)
  })
  ws.on('close', function () {
    // global.gc()
    console.log(ws.name + '离开')
  })
  ws.on('error', function () {
    console.log(err);
  })
})
function broadcast(msg, ws) {
  for (var key in clientMap) {
    if (clientMap.hasOwnProperty(key)) {
      clientMap[key].send(ws.name + '说' + msg)
    }
  }
}
```

页面显示交互：
```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title>ws client</title>
</head>
<body>
<h1>WebSocket</h1>
<div id="chatroom" style="width:400px;height:300px;overflow:auto;border:1px solid blue"></div>
<input type="text" name="sayinput" id="sayinput" value="" />
<input type="button" name="send" id="send" value="发送" />
<script src="WsClient.js"></script>
<script>
  var send = document.querySelector('#send')
  var sayinput = document.querySelector('#sayinput')
  send.onclick = function() {
    ws.send(sayinput.value)
    sayinput.value = ''
  }
  document.body.onkeyup = function(event){
    if(event.keyCode == 13) {
      ws.send(sayinput.value)
      sayinput.value = ''
    }
  }
</script>
</body>
</html>
```


3. 兼容，第三方socket.io
对于客户端和服务端都需要引入socket.io.js
```bash
// npm安装
npm install socket.io --save
```

页面交互显示：
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <script src="socket.io.js"></script>
  <title>Socket.io</title>
</head>
<body>
  <h1>Socket.io</h1>
  <div id="chatroom" style="width:400px;height:300px;overflow:auto;border:1px solid blue"></div>
  <input type="text" name="sayinput" id="sayinput" value="" />
  <input type="button" name="send" id="send" value="发送" />
  <script>
    window.onload = function() {
      var socketio = io.connect('http://localhost:9000')
      socketio.on('news', function(data){
        var chatroom = document.querySelector('#chatroom')
        chatroom.innerHTML += data + "<br/>"
      })
      socketio.emit('message', '你好')
      var send = document.querySelector('#send')
      var sayinput = document.querySelector('#sayinput')
      send.onclick = function() {
        socketio.emit('message', sayinput.value)
        sayinput.value = ''
      }
      document.body.onkeyup = function(event){
        if(event.keyCode == 13) {
          socketio.emit('message', sayinput.value)
          sayinput.value = ''
        }
      }
    }
  </script>
</body>
</html>

服务server：
```js
var app = require('express')()
var http = require('http').Server(app)
var io = require('socket.io')(http)
var fs = require('fs')
app.get('/', function (req, res) {
  console.log(0);
  fs.readFile('./socketIoClient.html', function (err, data) {
    if (err) {
      console.log(err);
    } else {
      res.append('Content-Type', 'text/html; charset=utf-8')
      res.send(data)
    }
  })
})
app.get('/socket.io.js', function (req, res) {
  fs.readFile('./socket.io.js', function (err, data) {
    if (err) {
      console.log(err);
    } else {
      res.append('Content-Type', 'text/plain; charset=utf-8')
      res.send(data)
    }
  })
})
http.listen(9000, function () {
  console.log('listening on *:9000');
})

// socket.io 设置
// 在线用户
var onlineUsers = {}
// 当前在线的人数
var onlineCount = 0
var i = 0
io.on('connection', function (socket) {
  console.log('有人连上来了~');
  //监听新用户的加入
  socket.name = ++i;
  onlineUsers[socket.name] = socket
  //监听用户退出
  socket.on('disconnect', function () {
    console.log('有人退出');
    delete onlineUsers[socket.name]
  })
  // 监听用户发送的数据
  socket.on('message', function (msg) {
    broadcast(msg, socket)
  })
})
function broadcast(msg, socket) {
  for (var key in onlineUsers) {
    if (onlineUsers.hasOwnProperty(key)) {
      onlineUsers[key].emit('news', socket.name + '说：' + msg);
    }
  }
}
```
