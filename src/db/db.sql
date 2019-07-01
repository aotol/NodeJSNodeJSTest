create database NodeJSTest;
use NodeJSTest;
CREATE TABLE users (
   id            bigint      NOT NULL   PRIMARY KEY   AUTO_INCREMENT,
   username      VARCHAR(32)      NOT NULL,
   password         VARCHAR(32)   NOT NULL,
   level   int
);