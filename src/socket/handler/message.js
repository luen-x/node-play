const wsSever = require('../socket');
const messageHandler={
	'setUserId': (message, ws)=>{ // 设置用户id
		// eslint-disable-next-line global-require
		const wsSever = require('../socket');
		const oldWsIndex = wsSever.clientWs.findIndex(item=>item.userId===message.content.userId);
		if (oldWsIndex>-1) {
			wsSever.clientWs[oldWsIndex].close();
			wsSever.clientWs.splice(oldWsIndex, 1);
		}
		const curWs = wsSever.clientWs.find(item=>item.ws===ws);
		if (curWs) {
			curWs.userId = message.content.userId;
		}
	},
	'publish': (message, ws) => {
		// eslint-disable-next-line global-require
		const wsSever = require('../socket');
		wsSever.clientWs.forEach(client=>{
			if (client.userId===message.from) return;
			client.ws.send(JSON.stringify({...message, event: 'imgData'}));
		});
	} 
};
module.exports = messageHandler;