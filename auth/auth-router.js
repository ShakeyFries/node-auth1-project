
const router = require('express').Router();

const bcrypt = require('bcryptjs');

const Users = require('../users/users-model');


router.post('/register', ( req, res ) => {
  let user = req.body;
  
  const hash = bcrypt.hashSync(user.password, 8);
  user.password = hash;

  Users.add(user)
    .then(saved => {
      res.status(201).json(saved);
    })
    .catch(error => {
      res.status(500).json(error);
    });
});

router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  Users.findBy({ username })
      .first()
      .then(log => {
          if (log && bcrypt.compareSync(password, log.password)) {
            
              res.status(200).json({ message: `Welcome ${log.username}!` });
          } else {
              res.status(401).json({ message: 'where????' });
          }
      })
      .catch (err => {
      res.status(500).json({ message: 'id10t error', err });
  });

});


module.exports = router;