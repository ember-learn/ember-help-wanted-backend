import * as knex from 'knex';

export async function up(knex: knex) {
  return knex.schema.createTable('events', (event) => {
    event.increments('id');
    event.text('title');
    event.integer('host_id').references('users.id');
  });
}

export async function down(knex: knex) {
  return knex.schema.dropTable('events');
}
