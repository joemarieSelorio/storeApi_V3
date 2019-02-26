require('app-module-path').addPath(require('app-root-path').toString());

const express = require('express');
const router = new express.Router();
const {getSupplyList, getSpecificSupply, addNewSupply,
  removeSupply, addNewRating} = require('api/controllers/SuppliesController');

router.get('/', getSupplyList);

router.get('/:id', getSpecificSupply);


router.post('/', addNewSupply);

router.post('/ratings/:id', addNewRating);


router.delete('/:id', removeSupply);

module.exports = router;
