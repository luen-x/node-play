const User = require('./models/user');
const Sequelize = require('sequelize')
const sequelize = require('./sequelize')

// 新增
// User.create({
// 	account:'123456',
// 	userName:'luen',
// 	password:'123456'
// }).then(u=>console.log(u.get())) // 返回新增的数据

// 查询
// User.findAll({
// 	where:{
// 		account:'123456'
// 	}
// }).then(res=>res.map(re=>re.get())).then(console.log) // 返回查询结果数组

// 删除
// User.destroy({
// 	where: {
// 		account: "123456"
// 	}
// }).then(console.log); // 返回被删除的数量

// 更新
// User.update({ userName: "lawrence" }, {
// 	where: {
// 		account: "123456"
// 	}
// }).then(res=>console.log(res[0])); // 返回被更新的数量（返回的是数组，数组里就一个数字）

// 实例

// User.findAll({
// 	where: {
// 		[Sequelize.Op.or]:{
// 			userName: 'zqq',
// 			password:'777'

// 		}
// 	}
// }).then(user => {
// 	console.log(user.map(i=>i.get()));
// 	user.forEach(u=>u.update({password:'999'}))
// 	// return user.destroy()
// })

// 批处理
// const arr=[];
// for(let i=1;i<100000;i++){
// 	arr.push({account:i,userName:'zqq'+i,password:'pw'+i})
// }
// // console.log(arr)
// User.bulkCreate(arr)

// 使用操作符依赖 operatorsAliases
// User.update(
// 	{
// 		userName: 'newName1'
// 	}, {
// 	where: {
// 		// id: {
// 		// 	$between: [10, 20],
// 		// 	$gt: 15,
// 		// 	$lt: 20,
// 		// },
// 		// account: {
// 		// 	$or: [{
// 		// 		$like: '6%',
// 		// 	}, {
// 		// 		$like: '%6',
// 		// 	}]

// 		// },
// 		$or: [{ account: { $like: '7%' } }, { account: { $like: '%7' } }]

// 	}
// }).then(console.log)


// 事务 官方文档写法
// sequelize.transaction(t => {
// 	return User.create({
// 		account: 'ZZZ',
// 		userName: 'ZZZ',
// 		password: 'ZZZ'
// 	}, { transaction: t }).then(() => {
// 		return User.create({
// 			account: 'ZZZ',
// 			userName: 'ZZZ',
// 			password: 'ZZZ'
// 		}, { transaction: t }).then(() => {
// 			throw new Error('eeeee')
// 		})

// 	})
// })
// 事务 同步写法 // 如果只有抛出异常才能回滚事务，因此不要在事务中抓取异常，或者抓取到异常后处理完业务需要把异常继续抛出
sequelize.transaction(async t => {
	const tran = { transaction: t };
	await User.create({
		account: 'ZZZ',
		userName: 'ZZZ',
		password: 'ZZZ'
	}, tran)
	await User.create({
		account: 'ZZZ2',
		userName: 'ZZZ2',
		password: 'ZZZ2'
	}, tran).then(() => { throw new Error('xxx') }).catch(err=>{
		// 处理业务 。。。
		console.log('继续抛出异常')
		throw err;
	})
})









