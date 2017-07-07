import * as knex from 'knex';

export async function up(knex: knex) {
  return knex.schema.createTable('repos', (repo) => {
    repo.increments('id');
    repo.text('repo_name');
    repo.text('full_name');
  });
}

export async function down(knex: knex) {
  return knex.schema.dropTable('repos');
}
