/* 引入express框架 */
const express = require('express');
const app = express();
/* 引入cors */
const cors = require('cors'); 
app.use(cors());
/* 引入body-parser */
const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.all('*', function (req, res, next) {
  if (!req.get('Origin')) return next();
  // use "*" here to accept any origin
  res.set('Access-Control-Allow-Origin', '*');
  res.set('Access-Control-Allow-Methods', 'GET');
  res.set('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type');
  // res.set('Access-Control-Allow-Max-Age', 3600);
  if ('OPTIONS' == req.method) return res.send(200);
  next();
});

//连接数据库
var mysql  = require('mysql');  
var connection = mysql.createConnection({     
  host     : 'localhost',       
  user     : 'root',              
  password : 'fl123456',       
  port: '3306',                   
  database: 'test' 
}); 
connection.connect();
//查询用户列表
var  sql = 'SELECT * FROM websites';
connection.query(sql,function (err, result) {
        if(err){
          console.log('[SELECT ERROR] - ',err.message);
          return;
        }
       console.log('--------------------------SELECT----------------------------');
       console.log(result);
	   
	   return result
       console.log('------------------------------------------------------------\n\n');  
});
app.get('/api/list', (req, res) => {
	     res.json({
	       code: 200,
	       message: '成功',
	       data: {
	         list: sql,
	       }
	     });
	   })
app.get('/', (req, res) => {
	     res.send('aaaa');
	   })
//新增数据
// var  addSql = 'INSERT INTO websites(Id,name,url,alexa,country) VALUES(0,?,?,?,?)';
// var  addSqlParams = ['菜鸟工具', 'https://c.runoob.com','23453', 'CN'];
// connection.query(addSql,addSqlParams,function (err, result) {
//         if(err){
//          console.log('[INSERT ERROR] - ',err.message);
//          return;
//         }        
 
//        console.log('--------------------------INSERT----------------------------');
//        //console.log('INSERT ID:',result.insertId);        
//        console.log('INSERT ID:',result);        
//        console.log('-----------------------------------------------------------------\n\n');  
// });

//修改数据
// var modSql = 'UPDATE websites SET name = ?,url = ? WHERE Id = ?';
// var modSqlParams = ['菜鸟移动站', 'https://m.runoob.com',6];
// //改
// connection.query(modSql,modSqlParams,function (err, result) {
//    if(err){
//          console.log('[UPDATE ERROR] - ',err.message);
//          return;
//    }        
//   console.log('--------------------------UPDATE----------------------------');
//   console.log('UPDATE affectedRows',result.affectedRows);
//   console.log('-----------------------------------------------------------------\n\n');
// });

//删除数据
// var delSql = 'DELETE FROM websites where id=6';
// connection.query(delSql,function (err, result) {
//         if(err){
//           console.log('[DELETE ERROR] - ',err.message);
//           return;
//         }        
 
//        console.log('--------------------------DELETE----------------------------');
//        console.log('DELETE affectedRows',result.affectedRows);
//        console.log('-----------------------------------------------------------------\n\n');  
// });
 
connection.end();

/* 监听端口 */
app.listen(3000, () => {
  console.log('listen:3000');
})