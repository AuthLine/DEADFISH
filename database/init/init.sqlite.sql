-- Create settings table

CREATE TABLE IF NOT EXISTS settings (
    uid INTEGER PRIMARY KEY AUTOINCREMENT, 
    mainkey VARCHAR (50) NOT NULL, 
    subkey VARCHAR (50) NOT NULL, 
    value TEXT NOT NULL, 
    UNIQUE (mainkey COLLATE NOCASE ASC, subkey COLLATE NOCASE ASC) ON CONFLICT REPLACE
);

-- Insert default settings and whitelist entries

REPLACE INTO "settings" ("mainkey", "subkey", "value") VALUES
	('core', 'build', '1'),
	('core', 'language', '"en"'),
	('whitelist', '52.32.178.7', '{"ip":"52.32.178.7","description":"TradingView Server Address","canDelete":0}'),
	('whitelist', '54.218.53.128', '{"ip":"54.218.53.128","description":"TradingView Server Address","canDelete":0}'),
	('whitelist', '34.212.75.30', '{"ip":"34.212.75.30","description":"TradingView Server Address","canDelete":0}'),
	('whitelist', '52.89.214.238', '{"ip":"52.89.214.238","description":"TradingView Server Address","canDelete":0}'),
	('whitelist', '127.0.0.1', '{"ip":"127.0.0.1","description":"localhost","canDelete":0}'),
	('whitelist', '::1', '{"ip":"::1","description":"localhost","canDelete":0}');

-- Version 0

CREATE TABLE IF NOT EXISTS users (uid INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL, uuid CHAR (36) UNIQUE NOT NULL DEFAULT (lower(hex( randomblob(4)) || '-' || hex( randomblob(2)) || '-' || '4' || substr( hex( randomblob(2)), 2) || '-' || substr('AB89', 1 + (abs(random()) % 4) , 1)  || substr(hex(randomblob(2)), 2) || '-' || hex(randomblob(6))) ), email VARCHAR (100) UNIQUE NOT NULL, password TEXT NOT NULL, enabled BOOLEAN NOT NULL DEFAULT (1), last DATETIME NOT NULL DEFAULT (CURRENT_TIMESTAMP), token VARHCAR(36), expiry DATETIME);
CREATE UNIQUE INDEX IF NOT EXISTS IDX_EMAIL ON `users` (email); CREATE UNIQUE INDEX IF NOT EXISTS IDX_UUID ON `users` (uuid);
DROP TABLE IF EXISTS `cache`;
DROP TABLE IF EXISTS `cron`;
DROP TABLE IF EXISTS `linkedorders`;
DROP TABLE IF EXISTS `exchanges`;


PRAGMA foreign_keys = 0;

CREATE TABLE sqlitestudio_temp_table AS SELECT * FROM settings;

DROP TABLE settings;

CREATE TABLE settings (uid INTEGER PRIMARY KEY AUTOINCREMENT, uuid CHAR (36) NOT NULL DEFAULT ('00000000-0000-0000-0000-000000000000'), mainkey VARCHAR (50) NOT NULL, subkey VARCHAR (50) NOT NULL, value TEXT NOT NULL,UNIQUE (uuid COLLATE NOCASE ASC, mainkey COLLATE NOCASE ASC, subkey COLLATE NOCASE ASC) ON CONFLICT REPLACE);

INSERT INTO settings (
     uid,
     mainkey,
     subkey,
     value
) SELECT 
     uid,
     mainkey,
     subkey,
     value
FROM sqlitestudio_temp_table;

DROP TABLE sqlitestudio_temp_table;

PRAGMA foreign_keys = 1;

INSERT OR REPLACE INTO `settings` (uuid, mainkey, subkey, value) VALUES ('00000000-0000-0000-0000-000000000000', 'whitelist', '::1', '{"ipAddress":"::1","description":"Localhost","canDelete":0}');

UPDATE `settings` SET uuid = (SELECT REPLACE(value,'"','') FROM `settings` WHERE mainkey='core' and subkey='uuid') WHERE mainkey NOT IN ('core','whitelist');

-- Version 1

ALTER TABLE `users` ADD COLUMN `2fa` VARCHAR(20) DEFAULT 'false';

-- Version 2

-- Create logs table

CREATE TABLE logs (
    uid       INTEGER      PRIMARY KEY AUTOINCREMENT
                           NOT NULL
                           UNIQUE,
    uuid      VARCHAR (36) NOT NULL
                           DEFAULT ('00000000-0000-0000-0000-000000000000'),
    timestamp TIMESTAMP    NOT NULL
                           DEFAULT (CURRENT_TIMESTAMP),
    type      VARCHAR (10) NOT NULL,
    message   TEXT         NOT NULL
);

CREATE INDEX IDX_UUID_TS 