WebSocket 通信传递的数据是字符串，即便浏览器端传给服务端的是个对象，
在服务端接收时也会变成字符串，可以通过 JSON.parse(msg.data) 解析成对象。
