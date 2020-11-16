const express = require('express');
const knex = require('knex')

const knexfile = require('../knexfile')

const router = require('express').Router();
const db = knex(knexfile.development);


db.on('query', (toSqlObject) => {
  console.log(toSqlObject)
})

// router.get('/', (req, res) => {
//     db('car-dealer')
//     .then(cars => {
//       res.json(cars); 
//     })
//     .catch (err => {
//       res.status(500).json({ message: 'Failed to retrieve cars' });
//     });
//   });

router.get('/', async (req, res) => {
try {
  const cars = await db('car-dealer')
  res.json(cars)
} catch (err) {
  console.log(err)
  res.status(500).json({ message: "Server error"})
}
});

router.get('/:id', (req, res) => {
  db('car-dealer')
  .where({ id: req.params.id})
  .first()
  .then(car => {
      if (car) {
          res.status(200).json(car);
      } else {
          res.status(404).json({ message: "car-dealer not found." });
      }
  })
})

router.post('/', async (req, res) => {
  const carData = req.body;

    try {
      const car = await db.insert(carData).into('car-dealer')
      res.status(201).json({ message: `You created an entry with the id: ${car}.` })
    } catch (err) {
      console.log(err);
      res.status(500).json({ message: "Can't POST. Check VIN #", error: err})
    }

  })

  // router.post('/', (req, res) => {
  //     if (validateCar(req.bod)) {
  //     db('car-dealer')
  //         .insert(req.body, 'id')
  //         .then(([id]) => id)
  //         .then(id => {
  //             db('car-dealer')
  //                 .where({ id })
  //                 .first()
  //                 .then(car => {
  //                     res.status(201).json(car-dealer)
  //                 })
  //         })

  // }
  // })
  
  // db('car-dealer').insert(carData)
  //   .then(car => {
  //     db('car-dealer').where({  })
  //     .then(newCarData => {
  //       res.status(201).json(newCarData)
  //     })
  //   })
  //   .catch(err => {
  //     console.log('Entry error', err);
  //     res.status(500).json ({ message: "Failed to store data", error: err })
  //   })




router.put('/:id', (req, res) => {
  const { id } = req.params;
  const changes = req.body;

  db('car-dealer')
      .where({ id })
      .update(changes)
      .then(update => {
          if (update) {
              res.status(200).json({ updated: `You updated ${update} car-dealer.` })
          } else {
              res.status(404).json ({ message: 'invalid id' })
          }
      })
      .catch(err => {
          console.log(err);
          res.status(500).json({ message: 'Our bad!', error: err})
      })
})

router.delete('/:id', async (req, res) => {
  const { id } =  req.params;

  try {
      const count = await db.del().from('car-dealer').where({ id });
      count ? res.status(200).json({ message: `You deleted ${count} car-dealer.`})
          : res.status(404).json({ message: "Can't delete car-dealer. Maybe the Id is wrong?"})
  } catch (err) {
      console.log(err)
      res.status(500).json({ message: 'Our bad! SomethiNG went wrong', message: error})
  }
})




module.exports = router;