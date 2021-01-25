/**
 * @Author: abbeymart | Abi Akindele | @Created: 2020-12-14
 * @Company: Copyright 2020 Abi Akindele  | mConnect.biz
 * @License: All Rights Reserved | LICENSE.md
 * @Description: MongoDB Connection test cases - error testing | TODO: review error-test-cases
 */

import { mcTest, assertEquals, postTestResult } from "@mconnect/mctest";
import { checkDb, newDbMongo } from "../src";
import { dbs } from "./config/dbConfig";

// test-data: db-configuration settings
const myDb = {
    host    : "localhost",
    username: "abbeymart",
    password: "ab12testing",
    port    : 27017,
    dbName  : "mcdev-null",
    filename: "testdb.db",
    poolSize: 20,
    url     : "mongodb://localhost:10000",
    options : {}
};

(async () => {
    let dbc = newDbMongo(dbs.mongodb, {checkAccess: false});
    let dbOpen = await dbc.openDb("mcdev-null");

    // perform db-connection testing
    await mcTest({
        name    : "should report connection-error to the Mongo DB (db-name-error)",
        testFunc: async () => {
            console.log("mongo-db: ", dbOpen)
            const dbRes = checkDb(dbOpen)
            assertEquals(dbRes.code, "validateError", "response-code should be: validateError")
            assertEquals(dbRes.message, "valid database connection/handler is required", "response-message should be: valid database connection/handler is required")
        },
    });

    postTestResult()

    // close resources / avoid memory leak
    await dbc?.closeDb();

})()

