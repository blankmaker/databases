CREATE DATABASE chat;

USE chat;

CREATE TABLE messages (
  `objectId` int(100) NOT NULL AUTO_INCREMENT,
  `text` varchar(255) DEFAULT NULL,
  `timestamp` varchar(50) DEFAULT NULL,
  `userID` varchar(100) DEFAULT NULL,
  `roomname` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`objectId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/* Create other tables and define schemas for them here! */
CREATE TABLE users (
  `name` varchar(40) DEFAULT NULL,
  `ID` int(100) NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE friends (
  `ID` int(255) NOT NULL AUTO_INCREMENT,
  `userID1` int(100) DEFAULT NULL,
  `userID2` int(100) DEFAULT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/*  Execute this file from the command line by typing:
 *    mysql < schema.sql
 *  to create the database and the tables.*/




