const express = require('express');
const jwt = require('jsonwebtoken');
const auth = require('./../middleware/auth');
const router = express.Router();

router.get('/', auth, (req, res)=>{
    res.json(req.user);
});

router.post('/', (req, res)=>{
    if(!req.body.user)
        return res.status(400).json({error:{msg:'User can not be empty'}});
    try {
        jwt.sign({user:req.body.user}, 'HackIdeasSecretCode', {expiresIn: 3600}, (err, token)=>{
            if(err)
                throw err;
            res.json(token);
        });
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Server error");
    }
});

module.exports = router;