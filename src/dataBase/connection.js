// 已使用sequelize替代
const mysql = require("mysql2/promise");
const defaultConfig = require("./config");
const pool=mysql.createPool({
	...defaultConfig,
	// ...config
});

// class ConnectionPool {
//     constructor(config = {}) {
//         this.pool = mysql.createPool({
//             ...defaultConfig,
//             ...config
// 		});
//     }
//     async query(sql,option={connection:undefined}) {


//         return new Promise((resolve, reject) => {
// 			if(option.connection)
//             this.pool.getConnection((err, connection) => {
//                 if (err) {
//                     reject(err);
//                 } else {
//                     connection.query(sql, (err2, rows) => {
//                         if (err2) {
//                             reject(err2);
//                         } else {
//                             resolve(rows);
//                         }
//                         connection.release();
//                     });
//                 }
//             });
//         });
// 	}
	
//     transaction(sqlArr) {
//         return new Promise((resolve, reject) => {
//             this.pool.getConnection((err, connection) => {
//                 if (err) {
//                     reject(err);
//                 } else {
//                     connection.beginTransaction(err2 => {
//                         if (err2) {
//                             reject(err2);
//                         } else {
//                             this._queryTran(
//                                 connection,
//                                 0,
//                                 sqlArr,
//                                 resolve,
//                                 reject
//                             );
//                         }
//                     });
//                 }
//             });
//         });
//     }
//     _queryTran(connection, index, arr, resolve, reject) {
//         connection.query(arr[index], (err, row) => {
//             if (err) {
//                 connection.rollback(err2 => {
//                     if (err2) {
//                         reject({ err, err2 });
//                         connection.release();
//                     } else {
//                         reject(err);
//                         connection.release();
//                     }
//                 });
//             } else if (index + 1 < arr.length) {
//                 this._queryTran(connection, index + 1, arr, resolve, reject);
//             } else {
//                 connection.commit(err3 => {
//                     if (err3) {
//                         connection.rollback(err3 => {
//                             if (err4) {
//                                 reject({ err3, err4 });
//                                 connection.release();
//                             } else {
//                                 reject(err3);
//                                 connection.release();
//                             }
//                         });
//                     } else {
//                         resolve("success");
//                         connection.release();
//                     }
//                 });
//             }
//         });
//     }
//     end() {
//         this.pool.end(err => {
//             if (err) {
//                 console.error(err);
//             }
//         });
//     }
// }
module.exports = pool;
