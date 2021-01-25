/**
 * @Author: abbeymart | Abi Akindele | @Created: 2020-12-14
 * @Company: Copyright 2020 Abi Akindele  | mConnect.biz
 * @License: All Rights Reserved | LICENSE.md
 * @Description: SQL-DB Connection test cases - error testing | TODO: review error-test-cases
 */

import { mcTest, assertEquals, postTestResult } from "@mconnect/mctest";
import {checkDb, DbConfigType} from "../src";
import { newDbConnect } from "../src";
import {dbs} from "./config/secure/dbConfig";

// test-data: db-configuration settings
const myDb = {
    host    : "localhost",
    username: "postgres",
    password: "ab12testing2",
    port    : 5400,
    dbName  : "mcdev-null",
    filename: "",
    poolSize: 20,
    secureOptions: {
        secureAccess: false,
        secureCert: "",
        secureKey: "",
    },
    uri     : "localhost:5400",
    options : {},
};

const sqliteDb = {
    filename: "",
};

(async () => {
    // pre-testing setup
    const dbc = newDbConnect(dbs.postgres, "postgres");
    const dbOpen = await dbc?.openDb();

    const dbc2 = newDbConnect(dbs.sqlite, "sqlite");
    const dbOpen2 = await dbc?.openDb();

    // perform db-connection testing
    await mcTest({
        name    : "should report connection-error to the PostgreSQL DB (dv-name-error)",
        testFunc: async () => {
            console.log("pg-db: ", dbOpen)
            const dbRes = checkDb(dbOpen)
            assertEquals(dbRes.code, "validateError", "response-code should be: validateError")
            assertEquals(dbRes.message.includes("valid database connection/handler is required"), true, "response-message should be: true")
        },
    });

    await mcTest({
        name    : "should report connection-error to the SQLite3 DB (filename-error)",
        testFunc: async () => {
            console.log("sqlite-db: ", dbOpen2)
            const dbRes = checkDb(dbOpen2)
            assertEquals(dbRes.code, "validateError", "response-code should be: validateError")
            assertEquals(dbRes.message.includes("valid database connection/handler is required"), true, "response-message should be: true")
        },
    });

    postTestResult()

    // close resources / avoid memory leak
    await dbc?.closeDb();
    await dbc2?.closeDb();
})()


