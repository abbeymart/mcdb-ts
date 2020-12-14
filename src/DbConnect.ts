/**
 * @Author: abbeymart | Abi Akindele | @Created: 2020-07-14
 * @Company: Copyright 2020 Abi Akindele  | mConnect.biz
 * @License: All Rights Reserved | LICENSE.md
 * @Description: mc-central-ts: Db-connect class for sequelize package
 */

import { DbConfigType, DbSecureType, DbType, DbConnectOptions, DbConnectType } from "./types";
import { Sequelize } from "sequelize";

export class DbConnect {
    private readonly host: string;
    private readonly username: string;
    private readonly password: string;
    private readonly database: string;
    private readonly filename: string;
    private readonly location: string;
    private readonly port: number;
    private readonly dbType: DbType;
    private readonly poolSize: number;
    private readonly secureOption: DbSecureType;
    private readonly uri: string;
    private mcDb: DbConnectType;
    private readonly connectionPoolOptions: object;

    constructor(dbConfig: DbConfigType, dbType: DbType = "postgres", options: DbConnectOptions = {}) {
        this.host = dbConfig?.host || "";
        this.username = dbConfig?.username || "";
        this.password = dbConfig?.password || "";
        this.database = dbConfig?.database || "";
        this.filename = dbConfig?.filename || "";
        this.location = dbConfig?.location || "";
        this.port = Number(dbConfig?.port) || Number.NEGATIVE_INFINITY;
        this.dbType = dbType;
        this.poolSize = dbConfig?.poolSize || 20;
        this.secureOption = dbConfig?.secureOption || {secureAccess: false, secureCert: "", secureKey: ""};
        this.uri = dbConfig?.uri || "";
        this.mcDb = new Sequelize({dialect: "postgres"});
        this.connectionPoolOptions = options || {
            max    : 20,
            min    : 0,
            acquire: 30000,
            idle   : 10000,
        };
    }

    async openDb(): Promise<DbConnectType> {
        await this.dbConnect();
        return this.mcDb;
    }

    async closeDb() {
        await this.mcDb?.close();
    }

    async dbConnect(): Promise<DbConnectType> {
        try {
            switch (this.dbType) {
                case "sqlite":
                    this.mcDb = new Sequelize({
                        dialect: "sqlite",
                        storage: this.location, /*"path/to/database.sqlite"*/
                    });
                    break;
                case "postgres":
                    // dbURI = `postgres://${this.username}:${this.password}@${this.host}:${this.port}/${this.database}`;
                    this.mcDb = new Sequelize(this.database, this.username, this.password, {
                        host   : this.host,
                        port   : this.port,
                        dialect: this.dbType, /* one of "mysql" | "mariadb" | "postgres" | "mssql" */
                        pool   : this.connectionPoolOptions,
                    });
                    break;
                case "mariadb":
                    this.mcDb = new Sequelize(this.database, this.username, this.password, {
                        host   : this.host,
                        port   : this.port,
                        dialect: this.dbType, /* one of "mysql" | "mariadb" | "postgres" | "mssql" */
                        pool   : this.connectionPoolOptions,
                    });
                    break;
                case "mysql":
                    this.mcDb = new Sequelize(this.database, this.username, this.password, {
                        host   : this.host,
                        port   : this.port,
                        dialect: this.dbType, /* one of "mysql" | "mariadb" | "postgres" | "mssql" */
                        pool   : this.connectionPoolOptions,
                    });
                    break;
                case "mssql":
                    this.mcDb = new Sequelize(this.database, this.username, this.password, {
                        host   : this.host,
                        port   : this.port,
                        dialect: this.dbType, /* one of "mysql" | "mariadb" | "postgres" | "mssql" */
                        pool   : this.connectionPoolOptions,
                    });
                    break;
                default:
                    throw new Error("unsupported database type: " + this.dbType);
                    break;
            }
            return this.mcDb;
        } catch (e) {
            console.error("error starting DB server: ", e.message, e);
            throw new Error("error starting DB server: " + e.message);
        }
    }
}

export function newDbConnect(dbConfig: DbConfigType, dbType: DbType = "postgres", options: DbConnectOptions = {}) {
    return new DbConnect(dbConfig, dbType, options);
}
