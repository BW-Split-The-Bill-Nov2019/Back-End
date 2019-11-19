///////////
BILLS TABLE
///////////
exports.up = function(knex) {
    return knex.schema.createTable("bills", bills => {
      bills.increments();
  
      bills.string("numofFriend", 128).notNullable();
      bills.string("total", 128).notNullable();
      bills.date("date", 128).notNullable();
      bills.string("split", 128).notNullable();
    });
  };
  
  exports.down = function(knex, Promise) {
    return knex.schema.dropTableIfExists("bills");
  };


///////////
/KNEX FILE/
///////////
module.exports = {

  development: {
    client: 'postgres',
    connection: {
      host: process.env.DB_HOST,
      database: process.env.DB_NAME,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD
    },
    migrations: {
      directory: './data/migrations'
    },
    seeds: {
      directory: './data/seeds'
    }
  },

  staging: {
    client: 'postgresql',
    connection: {
      database: 'my_db',
      user:     'username',
      password: 'password'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      directory: './data/migrations'
    },
    seeds: {
      directory: './data/seeds'
    },
  },

  production: {
    client: 'postgres',
    connection: process.env.DATABASE_URL,
    migrations: {
      directory: './data/migrations'
    },
    seeds: {
      directory: './data/seeds'
    }
  },

};