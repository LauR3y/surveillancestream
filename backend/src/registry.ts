import { BuildOptions, Model, Sequelize } from 'sequelize';

// DB
let dbInstance: Sequelize | null = null;
export const db = (): Sequelize => {
  if (dbInstance === null) {
    dbInstance = new Sequelize({
      host: process.env.DATABASE_HOST,
      port: parseInt(process.env.DATABASE_PORT || '3306'),
      database: process.env.DATABASE_NAME,
      username: process.env.DATABASE_USER,
      password: process.env.DATABASE_PASS,
      dialect: 'mysql',
      logging: false,
    });
  }
  return dbInstance;
};

export type DbModel<T> = typeof Model & {
  new (values?: T, options?: BuildOptions): T & Model;
};
