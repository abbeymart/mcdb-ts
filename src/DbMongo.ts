/**
 * @Author: abbeymart | Abi Akindele | @Created: 2020-07-17
 * @Company: Copyright 2020 Abi Akindele  | mConnect.biz
 * @License: All Rights Reserved | LICENSE.md
 * @Description: mc: db connection for mongoDB
 */

import { MongoClient } from "mongodb";
import { DbConfigType, DbSecureType, DbConnectOptions, MongoDbOptionsType } from "./types";

export class DbMongo {
    private readonly host: string;
    private readonly username: string;
    private readonly password: string;
    private readonly database: string;
    private readonly location: string;
    private readonly port: number;
    private readonly poolSize: number;
    private readonly secureOption: DbSecureType;
    private serverUrl: string;
    private readonly dbUrl: string;
    private readonly options: MongoDbOptionsType;
    private readonly checkAccess: boolean;
    private readonly user: string;
    private readonly pass: string;
    private mcDb: any;

    constructor(dbConfig: DbConfigType, options?: MongoDbOptionsType) {
        this.host = dbConfig?.host || "";
        this.username = dbConfig?.username || "";
        this.password = dbConfig?.password || "";
        this.database = dbConfig?.database || "";
        this.location = dbConfig?.location || "";
        this.port = Number(dbConfig?.port) || Number.NEGATIVE_INFINITY;
        this.poolSize = dbConfig?.poolSize || 20;
        this.secureOption = dbConfig?.secureOption || {secureAccess: false, secureCert: "", secureKey: ""};
        this.checkAccess = options?.checkAccess || false;
        this.user = encodeURIComponent(this.username);
        this.pass = encodeURIComponent(this.password);
        this.dbUrl = this.checkAccess ? `mongodb://${this.user}:${this.pass}@${dbConfig.host}:${dbConfig.port}/${dbConfig.database}` :
            `mongodb://${dbConfig.host}:${dbConfig.port}/${dbConfig.database}`;
        this.serverUrl = this.checkAccess ? `mongodb://${this.user}:${this.pass}@${dbConfig.host}:${dbConfig.port}` :
            `mongodb://${dbConfig.host}:${dbConfig.port}`;
        this.options = {
            poolSize          : options?.poolSize || this.poolSize,
            // reconnectTries    : options?.reconnectTries || Number.MAX_VALUE,
            // reconnectInterval : options?.reconnectInterval || 1000,
            useNewUrlParser   : options?.useNewUrlParser || true,
            useUnifiedTopology: options?.useUnifiedTopology || true,
        };
    }

    async connectServer() {
        return await this.mgServer();
    }

    async openDb(dbName = "") {
        return await this.mgDb(dbName);
    }

    async closeDb() {
        if (this.mcDb) {
            await this.mcDb?.close();
        }
    }

    async mgServer() {
        const dbenv = process.env.NODE_ENV || "development";
        if (dbenv === "production" && process.env.MONGODB_URI) {
            this.serverUrl = process.env.MONGODB_URI;
        }
        try {
            const client = new MongoClient(this.serverUrl, this.options);
            this.mcDb = await client.connect();
            return this.mcDb;
        } catch (err) {
            if (this.mcDb) {
                await this.mcDb.close();
            }
            console.error("MongoDB server connection error:" + err.stack);
            return {
                code   : "error",
                message: "Error connecting to mongoDB server."
            }
        }

    }

    async mgDb(dbName = "") {
        let client;
        try {
            // connect to the server (pool connections)
            client = await this.mgServer();
            return await client.db(dbName || this.database);
        } catch (err) {
            if (this.mcDb) {
                await this.mcDb.close();
            }
            console.error("MongoDB connection error:" + err.stack);
            return {
                code   : "error",
                message: "Error opening/creating a mongo database handle"
            }
        }
    }
}

export function newDbMongo(dbConfig: DbConfigType, options?: DbConnectOptions) {
    return new DbMongo(dbConfig, options);
}
