/**
 * @Author: abbeymart | Abi Akindele | @Created: 2020-12-14
 * @Company: Copyright 2020 Abi Akindele  | mConnect.biz
 * @License: All Rights Reserved | LICENSE.md
 * @Description: SQL-DB Connection test cases
 */

import { mcTest, assertEquals, postTestResult } from "@mconnect/mctest";
import {checkDb, DbConfigType} from "../src";
import { newDbConnect } from "../src";

// test config/data

// test-data: db-configuration settings
const myDb = {
    host    : "localhost",
    username: "postgres",
    password: "ab12testing",
    port    : 5432,
    dbName  : "mcdev",
    filename: "testdb.db",
    poolSize: 20,
    secureOptions: {
        secureAccess: false,
        secureCert: "",
        secureKey: "",
    },
    uri     : "localhost:5432",
    options : {},
};

const sqliteDb = {
    filename: "testdb.db",
};

(async () => {
    // pre-testing setup
    const dbc = newDbConnect(myDb, "postgres");
    const dbOpen = await dbc?.openDb();

    const dbc2 = newDbConnect(sqliteDb, "sqlite");
    const dbOpen2 = await dbc?.openDb();

    // perform db-connection testing
    await mcTest({
        name    : "should successfully connect to the PostgreSQL DB ",
        testFunc: async () => {
            const dbRes = checkDb(dbOpen)
            assertEquals(dbRes.code, "success", "response-code should be: success")
            assertEquals(dbRes.message.includes("valid database connection/handler"), true, "response-message should be: true")
        },
    });

    await mcTest({
        name    : "should successfully connect to the SQLite3 DB ",
        testFunc: async () => {
            const dbRes = checkDb(dbOpen2)
            assertEquals(dbRes.code, "success", "response-code should be: success")
            assertEquals(dbRes.message.includes("valid database connection/handler"), true, "response-message should be: true")
        },
    });

    postTestResult()

    // close resources / avoid memory leak
    await dbc?.closeDb();
    await dbc2?.closeDb();
})()


