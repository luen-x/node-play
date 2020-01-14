const User = require('./models/user');

// User.create({
// 	account:'123456',
// 	userName:'luen',
// 	password:'123456'
// }).then(u=>console.log(u.get())) // 返回新增的数据

// User.findAll({
// 	where:{
// 		account:'123456'
// 	}
// }).then(res=>res.map(re=>re.get())).then(console.log) // 返回查询结果数组

// User.destroy({
// 	where: {
// 		account: "123456"
// 	}
// }).then(console.log); // 返回被删除的数量

User.update({ userName: "lawrence" }, {
	where: {
		account: "123456"
	}
}).then(res=>console.log(res[0])); // 返回被更新的数量（返回的是数组，数组里就一个数字）