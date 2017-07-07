import * as knex from 'knex';

export async function up(knex: knex) {
  return knex.schema.createTable('issues', (issue) => {
    issue.increments('id');
    issue.text('title');
  });
}

export async function down(knex: knex) {
  return knex.schema.dropTable('issues');
}
