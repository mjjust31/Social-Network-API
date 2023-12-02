const router = require("express").Router();
const apiRoutes = require('./api');

router.use('/api', apiRoutes);

// router.get("/users", (req, res) => {
//   db.collection("userCollection")
//     .find()
//     .toArray()
//     .then((results) => res.json(results))
//     .catch((err) => {
//       if (err) throw err;
//     });
// });

router.use((req, res) => res.send("Wrong route!"));

module.exports = router;
