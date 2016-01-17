exports.up = function(knex, Promise) {
  return knex.schema.createTable('employees', function(table){
    table.increments();
    table.integer('restaurant_id');
    table.string('first_name');
    table.string('last_name');
    table.integer('position');
    table.timestamps();
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('employees');
};
