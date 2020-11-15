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



module.exports = router;