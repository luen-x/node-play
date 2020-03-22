const WebSocket = require('ws');
const messagehandler = require('./handler/message');
const handlers = {...messagehandler};
let webSocketServer;
const wsService = {
	clientWs: [],
	start() {
		if (!webSocketServer) {
			webSocketServer = new WebSocket.Server({ port: 8081 });
			webSocketServer.on('connection', (ws) => {
				this.clientWs.push({userId: '', ws});
				ws.on('message', (message) => {
					console.log('received:', this.clientWs.map(i=>i.userId) );
					// console.log(typeof JSON.parse(message));
					this.handleMessage( JSON.parse(message), ws);
				});
				ws.send(JSON.stringify({event: 'connect', content: 'success'}));
				ws.on('close', ()=>{
					this.clientWs.splice(this.clientWs.findIndex(it=>it.ws===ws, 1));
				});
			});

		} 
	},
	close() {
		webSocketServer.close();

	},
	useHandler(handler) {
		this.handler = { ...this.handler, ...handler };
	},
	handleMessage(message, ws) {
		const handler = this.handler[message.event];
		if (handler) {
			handler(message, ws);
		} else {
			console.error('unkonw message event ', message);
		}
	},
};
wsService.useHandler(handlers);

module.exports = wsService;
