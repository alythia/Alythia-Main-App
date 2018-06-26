const router = require('express').Router()
const {Client} = require('../db/models')
const jwt = require('jsonwebtoken');
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const clients = await Client.findAll()
    res.json(clients)
  } catch (error) {
    next(error)
  }
})

router.post('/new-project', async (req, res, next) => {
  try {
    console.log(req.body)
    const result = await Client.create(req.body)
    res.json(result)
  } catch (err) {
    next(err)
  }
})

router.post('/verify', async (req, res, next) => {
  const {public_key, token} = req.body;

  try {
    const result = await Client.findOne({where: {public_key}})
    console.log(result);
    // if public key exists, veryfy token using secret key
    if (result){
      const { secret_key, website, projectName } = result;
      jwt.verify(token, secret_key, (err, decoded) => {
        if(!err){
          jwt.sign({
            website,
            projectName
          }, secret_key, (err, data) => {
            if(!err){
              setTimeout(() => {
                res.send({
                  website,
                  projectName
                });
              }, 3000)
            }
          });
          
        }else{
          res.status(401).send('Invalid token')
        }
      });
    
    }
    else res.status(401).send('Invalid token')
  } catch (error) {
    console.log('/client/verify', error.message)
    next(error)
  }
})

router.get('/:client_id', async (req, res, next) => {
  const { client_id } = req.params;
  try {
    const client = await Client.findOne({
      where: {client_id}
    })
    const result = { 
      projectName: client.projectName, 
      website: client.website 
    };
    res.json(result)
  } catch (error) {
    next(error)
  }
})
