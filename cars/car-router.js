const router = require('express').Router();
const db = require('../data/db-config.js');


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
  res.status(500).json({ message: "Server error" })
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
      res.status(201).json(car-dealer)
  } catch (err) {
      console.error(err);
      res.status(500).json({ message: "our bad! couldn't add car-dealer"})
  }
  // if (validateCar(req.bod)) {
  //     db('car-dealer')
  //         .insert(req.body, 'id')
  //         .then(([id]) => id)
  //         .then(id => {
  //             db('car-dealer')
  //                 .where({ id })
  //                 .first()
  //                 .then(car-dealer => {
  //                     res.status(201).json(car-dealer)
  //                 })
  //         })

  // }
})

router.put('/:id', (req, res) => {
  const { id } = req.params;
  const changes = req.body;

  db('car-dealer')
      .where({ id })
      .update(changes)
      .then(update => {
          if (update) {
              res.status(200).json({ updated: `You updated ${update} car-dealer.`})
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



function validateCar({ name, VIN }) {
  return name && typeof VIN == 'number' && VIN == 17;
}



module.exports = router;