/**
 * @Author: abbeymart | Abi Akindele | @Created: 2020-12-14
 * @Company: Copyright 2020 Abi Akindele  | mConnect.biz
 * @License: All Rights Reserved | LICENSE.md
 * @Description: SQL-DB Connection test cases
 */

import {mcTest} from "@mconnect/mctest";
import {newDbConnect} from "../src";

// test config/data

// test-data: db-configuration settings
const myDb = {
    DbType  : "postgres",
    Host    : "localhost",
    Username: "postgres",
    Password: "ab12testing",
    Port    : 5432,
    DbName  : "mcdev",
    Filename: "testdb.db",
    PoolSize: 20,
    Url     : "localhost:5432",
    options: {}
};

myDb.options = {}

const sqliteDb = {
    DbType: "sqlite3",
    filename: "",
};
sqliteDb.filename = "testdb.db";

(async () => {
    mctest.McTest(mctest.OptionValue{
        Name: "should successfully connect to the PostgresDB",
            TestFunc: func() {
            dbc, err := myDb.OpenDb()
            defer myDb.CloseDb()
            fmt.Println(dbc)
            fmt.Println("*****************************************")
            mctest.AssertEquals(err, nil, "response-code should be: nil")
            //mctest.AssertEquals(t, req.Message, res.Message, "response-message should be: "+res.Message)
        },
    })

    mctest.McTest(mctest.OptionValue{
        Name: "should successfully connect to SQLite3 database",
            TestFunc: func() {
            dbc2, err2 := sqliteDb.OpenDb()
            defer sqliteDb.CloseDb()
            fmt.Println(dbc2)
            mctest.AssertEquals(t, err2, nil, "response-code should be: nil")
            //mctest.AssertEquals(t, req.Message, res.Message, "response-message should be: "+res.Message)
        },
    })

//if dbc != nil || err == nil {
//	myDb.CloseDb()
//}
//if dbc2 != nil || err2 == nil {
//	sqliteDb.CloseDb()
//}

    mctest.PostTestResult()
})()


