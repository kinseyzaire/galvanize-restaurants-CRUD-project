exports.up = function(knex, Promise) {
  return knex.schema.createTable('neighborhoods', function(table){
    table.increments();
    table.string('name');
    table.string('center');
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('neighborhoods');
};
