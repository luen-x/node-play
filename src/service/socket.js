const WebSocket = require('ws');
const SocketMessage = require('../model/SocketMessage');
let webSocketServer;
const wsService = {
	start() {
		if (!webSocketServer) {
			webSocketServer = new WebSocket.Server({ port: 8081 });
			webSocketServer.on('connection', (ws) => {
				ws.on('message', (message) => {
					console.log('received: %s', message);
					// this.handleMessage(message, ws)
				});
				ws.send('connect success');
			});

		}
	},
	close(){
		webSocketServer.close();

	},
	useHandler(handler) {
		this.handler = { ...this.handler, ...handler }
	},
	handleMessage(message, ws) {
		socketMessage = SocketMessage.getInstance(message);
		const handler = this.handler[socketMessage.event];
		// if (handler) {
		// 	handler(socketMessage, ws)
		// } else {
		// 	console.error('unkonw socketMessage event ', socketMessage)
		// }
	},
	handler: {
		test(message, ws) {
			ws.send('hello, you send me ' + message.content)
		}
	},


}
module.exports = wsService
