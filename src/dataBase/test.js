const User = require('./models/user');
const Message = require('./models/message');
const Case = require('./models/case');
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
// sequelize.transaction(async t => {
// 	const tran = { transaction: t };
// 	await User.create({
// 		account: 'ZZZ',
// 		userName: 'ZZZ',
// 		password: 'ZZZ'
// 	}, tran)
// 	await User.create({
// 		account: 'ZZZ2',
// 		userName: 'ZZZ2',
// 		password: 'ZZZ2'
// 	}, tran).then(() => { throw new Error('xxx') }).catch(err => {
// 		// 处理业务 。。。
// 		console.log('继续抛出异常')
// 		throw err;
// 	})
// })

// 多表查询

// Message.create({
// 	fromId:17,
// 	toId:18,
// 	content:'你好18号，我是17号'
// })
// Message.create({
// 	fromId:18,
// 	toId:17,
// 	content:'你好17号，我是18号,666'
// })
// 如果有多个外键指向一个表，在建立关联关系时需要指定外键名和as，在做关联查询时指定对应的as来进行子查询
// Message.belongsTo(User,{foreignKey:'fromId',as:"fromUser"})
// Message.belongsTo(User,{foreignKey:'toId',as:"toUser"})
// Message.findAll({
// 	attributes: ['id', 'content', 'createdAt'],
// 	where: {
// 		[Op.or]: [{ fromId: 17, toId: 18 }, { fromId: 18, toId: 17 }],
// 	},
// 	include: [
// 		{ model: User, required: true, as: 'fromUser', attributes: ['id', 'userName', 'account'] },
// 		{ model: User, required: true, as: 'toUser', attributes: ['id', 'userName', 'account'] },
// 		// {model: User, required: true,as:'toUser',foreignKey:'toId' }


// 	]
// }).then(ms => ms.map(m => {
// 	const msg = m.get();
// 	msg.fromUser = msg.fromUser.get();
// 	msg.toUser = msg.toUser.get();
// 	return msg
// })).then(console.log)

// 批处理
// const arr=[];
// for(let i=0;i<100000;i++){
// 	arr.push({industryId:parseInt( Math.random()*10), 'productTypeId':parseInt( Math.random()*10),'customerTypeId':parseInt( Math.random()*10),'province':parseInt( Math.random()*10),content:"陆小胖爱庄苗条，庄苗条爱陆小胖！"})
// }
// console.log(arr)
// Case.bulkCreate(arr)

const customer = { industryId: 3, productTypeId: 5, customerTypeId: 5, province: 5 }
const keys = ['industryId', 'productTypeId', 'customerTypeId', 'province','aa'];
const t1= (new Date()).getTime()
Case.findAll({
	attributes: ['id', 'industryId', 'productTypeId', 'customerTypeId', 'province'],
	where: {
		[Op.or]: [
			{ industryId: customer.industryId }, 
			{ productTypeId: customer.productTypeId }, 
			{ customerTypeId: customer.customerTypeId }, 
			{ province: customer.province }
		],
	},
}).then(list => {
	const sortList = list.map(i => i.get())
	.sort((i, j) => {
		let lengthi = 0;
		let lengthj = 0;
		keys.forEach(key => {
			if (i[key] === customer[key]) {
				lengthi++;

			}
			if (j[key] === customer[key]) {
				lengthj++;
			}

		})
		i.lengthi = lengthi;
		return lengthj - lengthi
	})
	console.log(sortList.length)
	const t3= (new Date()).getTime()
		console.log(t3-t1)
	
	sortList.length = 10;
	// console.log(sortList)
	Case.findAll({
		where: {
			id: {
				[Op.in]: sortList.map(i => i.id)
			}
		}
	}).then(list=>{
		console.log(list.map(i=>i.get()))
		const t2= (new Date()).getTime()
		console.log(t2-t1)

	})
	

})










