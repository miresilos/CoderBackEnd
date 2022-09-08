const { mariaDBOptions } = require("../options/mariaDB");
const { sqliteOptions } = require("../options/sqliteDB");
const mariaDBKnex = require("knex")(mariaDBOptions);
const sqliteKnex = require("knex")(sqliteOptions);

mariaDBKnex.schema
    .createTable("products", (table) => {
        table.increments("id");
        table.string("title");
        table.integer("price");
        table.string("thumbnail");
    })
    .then(() => {
        console.log("Table products successfully created");
    })
    .catch(err => console.error(err))
    .finally(() => {
        mariaDBKnex.destroy();
    });

sqliteKnex.schema
    .createTable("comments", (table) => {
        table.increments("id");
        table.string("username");
        table.string("text");
    })
    .then(() => {
        console.log("Table comments successfully created");
    })
    .catch(err => console.error(err))
    .finally(() => {
        sqliteKnex.destroy();
    });