/**
 * @Author: abbeymart | Abi Akindele | @Created: 2020-07-14
 * @Company: Copyright 2020 Abi Akindele  | mConnect.biz
 * @License: All Rights Reserved | LICENSE.md
 * @Description: mc-central-ts: sample/default dbConfig param for DbConnect module
 */

import { DbConfigType } from "../../src/types";

export const dbs: DbConfigType = {
    postgres: {
        location: process.env.PGDB_URL || 'postgres://localhost:5432/mc-dev',
        host    : process.env.PGDB_HOST || 'localhost',
        username: process.env.PGDB_USER || 'postgres',
        password: process.env.PGDB_PWD || 'ab12trust',
        database: process.env.PDDB_DBNAME || 'mccentral',
        port    : process.env.PGDB_PORT || 5432,
    },
    mongodb : {
        location: process.env.MONGODB_URL || 'mongodb://localhost:27017/mc-central',
        host    : process.env.MONGODB_HOST || 'localhost',
        username: process.env.MONGODB_USER || 'abbeymart',
        password: process.env.MONGODB_PWD || 'tbd',
        database: process.env.MONGODB_DBNAME || 'mc-central',
        port    : process.env.MONGODB_PORT || 27017,
    },
    redis   : {
        location: process.env.REDISDB_URL || 'redis://localhost:6379',
        host    : process.env.REDISDB_HOST || 'localhost',
        username: process.env.REDISDB_USER || 'abbeymart',
        password: process.env.REDISDB_PWD || 'tbd',
        database: process.env.REDISDB_DBNAME || 'mc-dev',
        port    : process.env.REDISDB_PORT || 6379,
    },
    mysql   : {
        location: process.env.MYSQLDB_URL || 'mysql://localhost:5432/mc-dev',
        host    : process.env.MYSQLDB_HOST || 'localhost',
        username: process.env.MYSQLDB_USER || 'mysql',
        password: process.env.MYSQLDB_PWD || 'ab12trust',
        database: process.env.MYSQLDB_DBNAME || 'mccentral',
        port    : process.env.MYSQLDB_PORT || 3306,
        dbType  : 'mysql',
    },
    mariadb : {
        location: process.env.MARIADB_URL || 'mysql://localhost:5432/mc-dev',
        host    : process.env.MARIADB_HOST || 'localhost',
        username: process.env.MARIADB_USER || 'mysql',
        password: process.env.MARIADB_PWD || 'ab12trust',
        database: process.env.MARIADB_DBNAME || 'mccentral',
        port    : process.env.MARIADB_PORT || 3306,
    },
    mssql   : {
        location: process.env.MSSQLDB_URL || 'mssql://localhost:5432/mc-dev',
        host    : process.env.MSSQLB_HOST || 'localhost',
        username: process.env.MSSQLDB_USER || 'mysql',
        password: process.env.MSSQLDB_PWD || 'ab12trust',
        database: process.env.MSSQLDB_DBNAME || 'mccentral',
        port    : process.env.MSSQLDB_PORT || 3306,
    },
    sqlite  : {
        location: process.env.PGDB_URL || 'sqlite://localhost:5432/mc-dev',
        host    : process.env.PGDB_HOST || 'localhost',
        username: process.env.PGDB_USER || 'sqlite',
        password: process.env.PGDB_PWD || 'ab12trust',
        database: process.env.PDDB_DBNAME || 'mccentral',
        filename: 'testdb.db',
        port    : process.env.PGDB_PORT || 3306,
    },
};
