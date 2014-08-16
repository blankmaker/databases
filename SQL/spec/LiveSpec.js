/* You'll need to have MySQL running and your Node server running
 * for these tests to pass. */

var mysql = require('mysql');
var request = require("request"); // You might need to npm install the request module!
var expect = require('../../node_modules/chai/chai').expect;

describe("Persistent Node Chat Server", function() {
  var dbConnection;

  beforeEach(function(done) {
    dbConnection = mysql.createConnection({
      // TODO: Fill this out with your mysql username
      user: "root",
      // and password.
      password: "superman",
      database: "chat"
    });
    dbConnection.connect();

    var tablename = "messages"; // TODO: fill this out

    /* Empty the db table before each test so that multiple tests
     * (or repeated runs of the tests) won't screw each other up: */
    dbConnection.query("truncate " + tablename, done);
  });

  afterEach(function() {
    dbConnection.end();
  });

  it("Should insert posted messages to the DB", function(done) {
    // Post a message to the node chat server:
    request({method: "POST",
             uri: "http://127.0.0.1:3000/classes/messages",
             json: {username: "Valjean",
                    message: "In mercys name, three days is all I need.",
                    roomname: "Hello"}
            },
            function (err, response, json) {
              /* Now if we look in the database, we should find the
               * posted message there. */
               console.log("message posted: ", json);
              var queryString = 'select * from users u, messages m where u.name = ? and u.ID = m.userID and m.roomname = ?';
              var queryArgs = [json.results.username, json.results.roomname];
              /* TODO: Change the above queryString & queryArgs to match your schema design
               * The exact query string and query args to use
               * here depend on the schema you design, so I'll leave
               * them up to you. */
              dbConnection.query( queryString, queryArgs,
                function(err, data) {

                  // Should have one result:
                  expect(data.length).to.equal(1);
                  expect(data[0].text).to.equal("In mercys name, three days is all I need.");
                  /* TODO: You will need to change these tests if the
                   * column names in your schema are different from
                   * mine! */

                  done();
                });
            });
  });

  it("Should output all messages from the DB", function(done) {
    // Let's insert a message into the db
    // request({method: "POST",
    //          uri: "http://127.0.0.1:3000/classes/messages",
    //          json: {username: "Bob",
    //                 message: "Men like you can never change!",
    //                 roomname: "Hello"}
    //         },
    //         function(err, res, body) {
    //           if (err) { throw err;}
    //           console.log('body posted! here it is: ', body);
    //         });
    var queryString = "insert into messages (userID, text, roomname) " +
                      "values (1, 'Men like you can never change!', 'main')";
    var queryArgs = [];
    /* TODO - The exact query string and query args to use
     * here depend on the schema you design, so I'll leave
     * them up to you. */

    dbConnection.query( queryString, queryArgs,
      function(err) {
        if (err) { throw err; }
        /* Now query the Node chat server and see if it returns
         * the message we just inserted: */
        request("http://127.0.0.1:3000/classes/messages",
          function(error, response, body) {
            var messageLog = JSON.parse(body);
            console.log('messageLog: ', messageLog);
            expect(messageLog.results[0].text).to.equal("Men like you can never change!");
            expect(messageLog.results[0].roomname).to.equal("main");
            done();
          });
      });
  });
});
