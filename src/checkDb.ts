/**
 * @Author: abbeymart | Abi Akindele | @Created: 2020-08-07
 * @Company: Copyright 2020 Abi Akindele  | mConnect.biz
 * @License: All Rights Reserved | LICENSE.md
 * @Description: mc-central-ts: check-db connection / handle
 */

import { DbConnectType, MongoDbConnectType } from "./types";
import { getResMessage, ResponseMessage } from "@mconnect/mcresponse";

export function checkDb(dbConnect: DbConnectType | MongoDbConnectType): ResponseMessage {
    if (dbConnect) {
        return getResMessage("success", {
            message: "valid database connection/handler",
        });
    } else {
        return getResMessage("validateError", {
            message: "valid database connection/handler is required",
        });
    }
}
