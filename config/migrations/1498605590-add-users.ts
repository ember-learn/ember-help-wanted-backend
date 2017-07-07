import * as knex from 'knex';

export async function up(knex: knex) {
  return knex.schema.createTable('users', (user) => {
    user.increments('id');
    user.text('username');
    user.text('token');
    user.boolean('admin');
  });
}

export async function down(knex: knex) {
  return knex.schema.dropTable('users');
}
