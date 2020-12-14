/**
 * @Author: abbeymart | Abi Akindele | @Created: 2020-12-14
 * @Company: Copyright 2020 Abi Akindele  | mConnect.biz
 * @License: All Rights Reserved | LICENSE.md
 * @Description: MongoDB Connection test cases
 */


import { mcTest } from "@mconnect/mctest";
import { newDbMongo } from "../src";

// test config/data

// test-data: db-configuration settings
const myDb = {
    DbType  : "mongodb",
    Host    : "localhost",
    Username: "abbeymart",
    Password: "ab12testing",
    Port    : 27017,
    DbName  : "mcdev",
    Filename: "testdb.db",
    PoolSize: 20,
    Url     : "mongodb://localhost:27017",
    options : {}
};

myDb.options = {}

const sqliteDb = {
    DbType  : "sqlite3",
    filename: "",
};
sqliteDb.filename = "testdb.db";

(async () => {
    mctest.McTest(mctest.OptionValue
    {
        Name: "should successfully connect to the mongoDB Host/Server:",
            TestFunc
    :
        func()
        {
            mgServer, _
        :
            = myDb.OpenMongoDb()
            mgServerDb := mgServer.Database(myDb.DbName)
            defer
            myDb.CloseMongoDb()
            fmt.Println(mgServer)
            fmt.Println("********************************")
            fmt.Println(mgServerDb.Name())
            fmt.Println("*********")
            mctest.AssertEquals(t, err, nil, "response-code should be: nil")
            mctest.AssertEquals(t, mgServerDb.Name(), myDb.DbName, "response-message should be: " + myDb.DbName)
        }
    ,
    }
)

    mctest.PostTestResult()

//if dbc != nil || err == nil {
//	myDb.CloseDb()
//}
//if dbc2 != nil || err2 == nil {
//	sqliteDb.CloseDb()
//}

    mctest.PostTestResult()
})()

