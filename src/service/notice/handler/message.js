const wsSever = require('../socket');
const messageHandler={
	'setUserId':(message,ws)=>{ // 设置用户id
		const wsSever = require('../socket');
		console.log(wsSever)
		const oldWsIndex = wsSever.clientWs.findIndex(item=>item.userId===message.content.userId)
		if(oldWsIndex>-1){
			wsSever.clientWs[oldWsIndex].close()
			sSever.clientWs.splice(oldWsIndex,1);
		}
		const curWs = wsSever.clientWs.find(item=>item.ws===ws)
		if(curWs){
			curWs.userId = message.content.userId
		}
	}
}
module.exports = messageHandler;