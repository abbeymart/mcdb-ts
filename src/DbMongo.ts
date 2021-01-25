/**
 * @Author: abbeymart | Abi Akindele | @Created: 2020-07-17
 * @Company: Copyright 2020 Abi Akindele  | mConnect.biz
 * @License: All Rights Reserved | LICENSE.md
 * @Description: mc: db connection for mongoDB
 */

import { Db, MongoClient } from "mongodb";
import { DbConfigType, DbSecureType, MongoDbOptionsType } from "./types";

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
    private dbUrl: string;
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
        this.checkAccess = true;
        if (options?.checkAccess === false) {
            this.checkAccess = false;
        }
        this.user = encodeURIComponent(this.username);
        this.pass = encodeURIComponent(this.password);
        // this.user = this.username;
        // this.pass = this.password;
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
        try {
            return await this.mgServer();
        } catch (e) {
            throw new Error("MongoDB server connection error:" + e.message);
        }
    }

    async openDb(dbName = "") {
        try {
            return await this.mgDb(dbName);
        } catch (e) {
            throw new Error("MongoDB opening error:" + e.message);
        }
    }

    async closeDb() {
        if (this.mcDb) {
            await this.mcDb?.close();
        }
    }

    async mgServer(): Promise<MongoClient> {
        const dbenv = process.env.NODE_ENV || "development";
        if (dbenv === "production" && process.env.MONGODB_URI) {
            this.dbUrl = process.env.MONGODB_URI;
        }
        try {
            const client = new MongoClient(this.dbUrl, this.options);
            this.mcDb = await client.connect();
            return this.mcDb;
        } catch (err) {
            if (this.mcDb) {
                await this.mcDb.close();
            }
            console.error("MongoDB server connection error:" + err.stack);
            throw new Error("MongoDB server connection error:" + err.message);
        }

    }

    async mgDb(dbName = ""): Promise<Db> {
        let client: MongoClient;
        try {
            // connect to the server (pool connections)
            client = await this.mgServer();
            return client.db(dbName || this.database);
        } catch (err) {
            if (this.mcDb) {
                await this.mcDb.close();
            }
            console.error("MongoDB connection error:" + err.stack);
            throw new Error("Error opening/creating a mongo database handle | " + err.message);
        }
    }
}

export function newDbMongo(dbConfig: DbConfigType, options?: MongoDbOptionsType) {
    return new DbMongo(dbConfig, options);
}
