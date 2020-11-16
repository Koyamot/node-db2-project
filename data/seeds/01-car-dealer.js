
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('car-dealer').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('car-dealer').insert([
        {id: 1, VIN: 12345678912345678, make: 'hyundai', model: 'ionic', mileage: 100000, transmission_type: 'a', title_status: 'clear'},
        {id: 2, VIN: 12345678912345677, make: 'subaru', model: 'crosstrek', mileage: 10590, transmission_type: 'a', title_status: 'clear'},
        {id: 3, VIN: 12345678912345679, make: 'hyundai', model: 'ionic', mileage: 100000, transmission_type: 'a', title_status: 'clear'}
      ]);
    });
};
