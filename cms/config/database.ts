import path from 'node:path';

export default ({ env }) => {
  const client = env('DATABASE_CLIENT', 'sqlite');
  const connections = {
    postgres: {
      connection: {
        connectionString: env('DATABASE_URL'),
        ssl: env.bool('DATABASE_SSL', false) && { rejectUnauthorized: env.bool('DATABASE_SSL_REJECT_UNAUTHORIZED', false) },
      },
      pool: { min: env.int('DATABASE_POOL_MIN', 0), max: env.int('DATABASE_POOL_MAX', 10) },
    },
    sqlite: {
      connection: { filename: path.join(__dirname, '..', '..', env('DATABASE_FILENAME', '.tmp/data.db')) },
      useNullAsDefault: true,
    },
  };
  return { connection: { client, ...connections[client as keyof typeof connections], acquireConnectionTimeout: 60000 } };
};
