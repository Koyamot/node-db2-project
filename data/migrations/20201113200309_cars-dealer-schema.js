
// VIN, make, model, and mileage,transmission type and status of the title

exports.up = function(knex) {
    return knex.schema.createTable('car-dealer', tbl => {
        tbl.increments('id');
        tbl.decimal('VIN', 17).unique().notNullable();
        tbl.string('make').notNullable();
        tbl.string('model').notNullable();
        tbl.decimal('mileage').notNullable();
        tbl.string('transmission_type');
        tbl.string('title_status');

    })
  
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('car-dealer');
};
