exports.up = function(knex, Promise) {
  return knex.schema.createTable('restaurants', function(table){
    table.increments();
    table.string('name');
    table.string('street1');
    table.string('street2');
    table.string('city');
    table.string('state');
    table.integer('zip');
    table.string('cuisine');
    table.string('img_url');
    table.integer('rating');
    table.integer('neighborhood_id');
    table.text('description');
    table.timestamps();
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('restaurants');
};
