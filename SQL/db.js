var mysql = require('mysql');
var mysql = require('mysql');
/* If the node mysql module is not found on your system, you may
 * need to do an "sudo npm install -g mysql". */

/* You'll need to fill the following out with your mysql username and password.
 * database: "chat" specifies that we're using the database called
 * "chat", which we created by running schema.sql.*/
var dbConnection = mysql.createConnection({
  user: "root",
  password: "superman",
  database: "chat"
});

dbConnection.connect();
/* Now you can make queries to the Mysql database using the
 * dbConnection.query() method.
 * See https://github.com/felixge/node-mysql for more details about
 * using this module.*/




exports.findAllMessages = function(cb){
  dbConnection.query('select * from messages', function(err, results) {

    if (err) { throw err; }
    cb(err, results);
  });
};

exports.findUser = function(username, cb){
  dbConnection.query('select * from users where name="'+ username+'"', function(err, results) {
      if(err) {
        throw err;
      }
      // console.log("Find User results:", results);

      cb(err, results);
  });

};

exports.saveUser = function(username, cb){
  console.log(username);
  dbConnection.query('insert into users (name) values ("'+ username+'")');
  dbConnection.query('select last_insert_id()', function(err, results) {
    if(err) {
      throw err;
    }
    results[0]['id'] = results[0]['last_insert_id()'];
    cb(results);
  });
};

exports.saveMessage = function(message, userid, roomname, cb){
  dbConnection.query('insert into messages (text, userID, roomname) values ("' + message + '", "' + userid + '" , "' + roomname + '");', cb);

};




