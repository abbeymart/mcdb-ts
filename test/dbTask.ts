/**
 * @Author: abbeymart | Abi Akindele | @Created: 2020-07-17
 * @Company: Copyright 2020 Abi Akindele  | mConnect.biz
 * @License: All Rights Reserved | LICENSE.md
 * @Description: mc-central-ts: mongodb testing
 */

const collRecords: any = {
    name    : "Abi",
    desc    : "Testing only",
    url     : "localhost:9000",
    priority: 1,
    cost    : 1000.00
};
const newCollRecords: any = {
    name    : "Abi Akindele",
    desc    : "Testing only - updated",
    url     : "localhost:9900",
    priority: 1,
    cost    : 2000.00
};

export const dbTaskRecord = {
    collName   : 'users',
    collRecords: collRecords,
    logType    : 'create',
    logBy      : 'abbeycity-testing-db-task',
    logDate    : new Date(),
};
