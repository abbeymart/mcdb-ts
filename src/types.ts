/**
 * @Author: abbeymart | Abi Akindele | @Created: 2020-07-14
 * @Company: Copyright 2020 Abi Akindele  | mConnect.biz
 * @License: All Rights Reserved | LICENSE.md
 * @Description: mc-central-ts: db types for sequelize package
 */

import { Sequelize } from "sequelize";
import { Db } from "mongodb";

// types
export interface DbSecureType {
    secureAccess: boolean;
    secureCert?: string;
    secureKey?: string;
}

export type DbConnectType = Sequelize;

export type MongoDbConnectType = Db;

export type DbType = "postgres" | "sqlite" | "mysql" | "mariadb" | "mssql";

export interface DbConfigType {
    host?: string;
    username?: string;
    password?: string;
    database?: string;
    filename?: string;
    location?: string;
    port?: number | string;
    poolSize?: number;
    secureOption?: DbSecureType;
    uri?: string;
}

export interface DbConfigsType {
    [key: string]: DbConfigType;
}

export interface DbConnectOptions {
    [key: string]: string | number | object | boolean;
}

export interface MongoDbOptionsType {
    checkAccess?: boolean;
    poolSize?: number;
    reconnectTries?: number;
    reconnectInterval?: number;
    useNewUrlParser?: boolean;
    useUnifiedTopology?: boolean;
}

export interface DatabaseType {
    dbType: DbType;
    postgres: DbConfigsType;
    mongodb: DbConfigsType;
    redis: DbConfigsType;
    mysql: DbConfigsType;
    mariadb: DbConfigsType;
    mssql: DbConfigsType;
    sqlite: DbConfigsType;
}

export interface RoleServiceType {
    serviceId: string;
    groupId: string;
    serviceCategory: string;
    canRead: boolean;
    canCreate: boolean;
    canUpdate: boolean;
    canDelete: boolean;
    collAccessPermitted?: boolean;
}

export interface CheckAccessType {
    userId: string;
    userRole: string;
    userRoles: Array<string>;
    isActive: boolean;
    isAdmin: boolean;
    roleServices: Array<RoleServiceType>;
    collId: string;
}

export interface OkResponseType {
    ok: boolean;
}

export interface RoleFuncType {
    (it1: string, it2: RoleServiceType): boolean;
}

// Exception/error types
export type SaveError = Error;
export type CreateError = Error;
export type UpdateError = Error;
export type DeleteError = Error;
export type ReadError = Error;
export type AuthError = Error;
export type ConnectError = Error
export type SelectQueryError = Error
export type WhereQueryError = Error
export type CreateQueryError = Error
export type UpdateQueryError = Error
export type DeleteQueryError = Error
