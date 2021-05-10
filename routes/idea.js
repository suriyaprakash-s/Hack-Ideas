const express = require('express');
const auth = require('./../middleware/auth');
const Idea = require('./../models/Idea');
const router = express.Router();

router.get('/all', auth, async(req, res)=>{
    try {
        const ideas = await Idea.find();
        res.json(ideas);
      } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
      }
});

router.get('/me', auth, async(req, res)=>{
    try {
        const ideas = await Idea.find({createdBy:req.user});
        res.json(ideas);
      } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
      }
});
router.post('/', auth, async (req, res)=>{
    const {title, description, tags, startDate, duration}= req.body;
    try{
        const newIdea = new Idea({
            title: title,
            description: description,
            tags: tags,
            startDate: startDate,
            duration: duration,
            votes: [],
            createdBy: req.user
        });

        const idea = await newIdea.save();
        res.json(idea);
    }
    catch(error){
        console.error(error.message);
        res.status(500).send('Server Error');
    }
});
router.put('/:id', auth, async(req, res)=>{
    const {title, description, tags, startDate, duration, votes}= req.body;
    try{
        const idea = await Idea.findById(req.params.id);
        if(!idea)
            return res.status(400).json({ msg: 'Idea not found' });
        if(idea.createdBy == req.user)
        {
            idea.title= title,
            idea.description= description,
            idea.tags= tags,
            idea.startDate= startDate,
            idea.duration= duration,
            idea.votes= votes
            await idea.save()
            return res.json(idea);
        }
        else
            return res.status(400).json({ msg: 'User not authorized' });
    }
    catch(error){
        console.error(error.message);
        res.status(500).send('Server Error');
    }
});
router.delete('/:id', auth, async(req, res)=>{
    try {
        const idea = await Idea.findById(req.params.id);
        if(!idea)
            return res.status(400).json({ msg: 'Idea not found' });
        if(idea.createdBy == req.user)
        {
            await idea.remove();
            return res.json({ msg: 'Idea deleted' });
        }
        else
            return res.status(400).json({ msg: 'User not authorized' });
      } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
      }
});
router.post('/vote/:id', auth, async(req, res)=>{
    try{
        const idea = await Idea.findById(req.params.id);
        if(!idea)
            return res.status(400).json({ msg: 'Idea not found' });
        idea.votes.push(req.user);
        idea.save();
        return res.json(idea);
    }
    catch(error){
        console.error(error.message);
        res.status(500).send('Server Error');
    }
});

module.exports = router;