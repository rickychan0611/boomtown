const { Pool } = require('pg');

module.exports = (app) => {
  /**
   * @TODO: Configuration Variables
   *
   *  Retrieve the necessary information to connect to Postgres
   *  For example: app.get('PG_DB')
   */
  return new Pool({
    /**
     *  @TODO: Supply the correct configuration values to connect to postgres
     */
    host: app.get('PG_HOST'),
    users: app.get('PG_USER'),
    password: app.get('PG_PASSWORD'),
    database: app.get('PG_DB'),
    connectionTimeoutMillis: 3000,
    idleTimeoutMillis: 2000
  });
};
