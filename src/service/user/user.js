const User = require('../../dataBase/models/user')
/***
 * service主要用来封装会公用的，复杂的，独立的，低耦合的服务，主要被控制层调用，
 * 
 */
const service = {
	async getUserByAccount(account){
		return User.findOne({
			where:{
				account
			}
		}).then(res=>res && res.get());
		
	},
	async addUser({account,userName,password}){

		return User.create({
			account,
			userName,
			password
		}).then(res=>res.get());
	},
	async updateUser({account,userName,password}) {
		return User.update({
			account,
			userName,
			password
		}).then(res=>res && res[0])
	},
	async deleteUser(id) {
		return User.destroy({
			where:{
				id
			}
		})
	}

}
module.exports = service;