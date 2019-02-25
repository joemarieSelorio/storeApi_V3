require('app-module-path').addPath(require('app-root-path').toString());

const express = require('express');
const router = new express.Router();
const {getSupplyList, getSpecificSupply, addNewSupply,
  removeSupply} = require('api/controllers/SuppliesController');

router.get('/', getSupplyList);

router.get('/:id', getSpecificSupply);


router.post('/', addNewSupply);

router.post('/rating/:id', (req, res, next)=>{
  res.send({addRating: 'Add rating to a supply'});
});

router.delete('/:id', removeSupply);

module.exports = router;
