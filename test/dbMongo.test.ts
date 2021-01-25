/**
 * @Author: abbeymart | Abi Akindele | @Created: 2020-12-14
 * @Company: Copyright 2020 Abi Akindele  | mConnect.biz
 * @License: All Rights Reserved | LICENSE.md
 * @Description: MongoDB Connection test cases
 */


import { mcTest, assertEquals, postTestResult } from "@mconnect/mctest";
import { checkDb, newDbMongo } from "../src";
import { myDbAccess, myDbPa } from "./config/secure/dbConfig";

// test-data: db-configuration settings

(async () => {
    // let dbc = newDbMongo(myDbAccess, {checkAccess: true});
    let dbc = newDbMongo(myDbPa, {checkAccess: true});
    // let dbc = newDbMongo(myDbAccess, {checkAccess: false});
    // let dbOpen = await dbc.openDb("mccentral");
    // let dbOpen = await dbc.openDb("mcaccess");
    let dbOpen = await dbc.openDb("mcpa");

    // perform db-connection testing
    await mcTest({
        name    : "should successfully connect to the Mongo DB ",
        testFunc: async () => {
            const dbRes = checkDb(dbOpen)
            console.log('db-res: ', dbRes)
            assertEquals(dbRes.code, "success", "response-code should be: success")
            assertEquals(dbRes.message.includes("valid database connection/handler"), true, "response-message should be: true")
        },
    });

    postTestResult()

    // close resources / avoid memory leak
    await dbc?.closeDb();

})()
