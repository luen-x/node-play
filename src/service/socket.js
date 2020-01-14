const WebSocket = require('ws');
let webSocketServer;
let tankList = [];
let bulletList = []
const wsService = {
	start() {
		if (!webSocketServer) {
			webSocketServer = new WebSocket.Server({ port: 8081 });
			webSocketServer.on('connection', (ws) => {
				ws.on('message', (message) => {
					console.log('received: %s', message);
					this.handleMessage(message, ws)
				});
				ws.send(JSON.stringify({event:'connect',msg:'success'}));
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
		const handler = this.handler[message.event];
		console.log(this.handler)
		if (handler) {
			handler(message, ws)
		} else {
			console.error('unkonw message event ', message)
		}
	},
	handler: {
		// test(message, ws) {
		// 	ws.send('hello, you send me ' + message.content)
		// },
		updateTank(message,ws){
			message && console.log(message)

		}
	},


}
module.exports = wsService
