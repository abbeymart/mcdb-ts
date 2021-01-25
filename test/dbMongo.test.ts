/**
 * @Author: abbeymart | Abi Akindele | @Created: 2020-12-14
 * @Company: Copyright 2020 Abi Akindele  | mConnect.biz
 * @License: All Rights Reserved | LICENSE.md
 * @Description: MongoDB Connection test cases
 */


import { mcTest, assertEquals, postTestResult } from "@mconnect/mctest";
import { checkDb, newDbMongo } from "../src";

// test-data: db-configuration settings
const myDb = {
    host    : "localhost",
    username: "abbeymart",
    password: "ab12testing",
    port    : 27017,
    dbName  : "mcdev",
    filename: "testdb.db",
    poolSize: 20,
    url     : "mongodb://localhost:27017",
    options : {}
};

(async () => {
    let dbc = newDbMongo(myDb, {checkAccess: false});
    let dbOpen = await dbc.openDb("mccentral");

    // perform db-connection testing
    await mcTest({
        name    : "should successfully connect to the Mongo DB ",
        testFunc: async () => {
            const dbRes = checkDb(dbOpen)
            assertEquals(dbRes.code, "success", "response-code should be: success")
            assertEquals(dbRes.message.includes("valid database connection/handler"), true, "response-message should be: true")
        },
    });

    postTestResult()

    // close resources / avoid memory leak
    await dbc?.closeDb();

})()
