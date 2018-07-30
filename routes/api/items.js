const express = require('express');
const router = express.Router();

// item model
const Item = require('../../models/Item');


// @route GET api/items
// @desc GET All Items
// @access public
router.get('/', (req, res)=> {
  Item.find()
    .sort({date: -1})
    .then(items => res.json(items));
});

// @route Post api/items
// @desc create one item
// @access public
router.post('/', (req, res)=> {
  //create new post
    const newItem = new Item({
      name: req.body.name
    });

//save item to db and then get json object
    newItem.save().then(item => res.json(item));
});


// @route delete api/items/:id
// @desc delete one item
// @access public
router.delete('/:id', (req, res)=> {
  Item.findById(req.params.id)
    .then(item => item.remove().then(()=> res.json({success: true})))
    .catch(err => res.status(404).json({success: false}));
})



module.exports = router;
