
// VIN, make, model, and mileage,transmission type and status of the title

exports.up = function(knex) {
    return knex.schema.createTable('car-dealer', tbl => {
        tbl.increments();
        tbl.decimal('VIN')
        tbl.string('make', 20)
        tbl.string('model', 20)
        tbl.decimal('mileage', 6)
        tbl.string('transmission_type', 1);
        tbl.string('title_status', 20)

    })
  
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('car-dealer');
};
