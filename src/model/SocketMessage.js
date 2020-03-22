class SocketMessage {
	constructor(event, content, option) {
		if (event===null||event===undefined||event==='') {
			console.error("socketMessage'event is required ", {event, content, option});
		}
		this.event = event;
		this.content = content;
		this.option = option;
	}
	static getInstance(message) {
		let json = JSON.parse(message);
		return new SocketMessage(json.event, json.content, json.option);
	}
}
module.exports = SocketMessage;