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

CREATE INDEX IDX_UUID_TS ON logs (
    uuid,
    timestamp
);

-- Version 3

-- Create signals table

CREATE TABLE signals (
    uid       INTEGER      PRIMARY KEY AUTOINCREMENT
                           UNIQUE
                           NOT NULL,
    timestamp DATETIME     NOT NULL
                           DEFAULT (CURRENT_TIMESTAMP),
    provider  VARCHAR (36) NOT NULL,
    user      VARCHAR (36) NOT NULL,
    exchange  VARCHAR (50) NOT NULL,
    stub      VARCHAR (50) NOT NULL,
    symbol    VARCHAR (50) NOT NULL,
    signal    VARCHAR (50) NOT NULL,
    result    BOOLEAN      NOT NULL,
    message   TEXT         NOT NULL
);

CREATE INDEX IDX_TIMESTAMP ON signals (
    timestamp
);

CREATE INDEX IDX_PROVIDER ON signals (
    provider
);

CREATE INDEX IDX_USER ON signals (
    user
);

CREATE INDEX IDX_RESULT ON signals (
    result
);


-- Update version
INSERT OR REPLACE INTO `settings` (mainkey, subkey, value) VALUES ('core', 'sqlite:dbver', 4);