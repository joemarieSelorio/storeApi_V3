require('app-module-path').addPath(require('app-root-path').toString());
const {map, pick} = require('lodash');
const {createNewSupply, createNewRating, getAllSupply, getSupplyByName,
  getSupplyById, deleteRating, getRatings, deleteSupply}
  = require('api/repositories/SuppliesRepositories');
const HttpError = require('api/responses/HttpError');
const HttpNotFoundError = require('api/responses/HttpNotFoundError');
const HttpSuccess = require('api/responses/HttpSuccess');
const logger = require('api/utilities/logger');

/**
 * @todo - retrieve list of all supplies in the database
 * @param {*} req - request to the server
 * @param {*} res - response from the server
 * @param {*} next  - next function to be called
 */
async function getSupplyList(req, res, next) {
  try {
    const supplies = await getAllSupply();
    const supplySummary = map(supplies, (row)=>{
      return {
        data: {
          id: row.id,
          name: row.name,
          description: row.description,
          imageUrl: row.imageUrl,
          quantity: row.quantity,
        },
      };
    });
    res.locals.respObj = new HttpSuccess(200,
        'Sucessfully retrived all supplies', supplySummary);
    return next();
  } catch (error) {
    return next(new HttpError(500, 9999, error.message));
  }
}
/**
 * @todo - retrieve specific supply in the database via id
 * @param {*} req - request to the server
 * @param {*} res - response from the server
 * @param {*} next  - next function to be called
 */
async function getSpecificSupply(req, res, next) {
  const {id} = req.params;
  const supplyId = id;
  try {
    const supply = await getSupplyById({id});
    logger.info(supply);
    if (!supply) {
      return next(new HttpNotFoundError('Supplies Not Found'));
    }
    const ratings = await getRatings({supplyId});
    logger.info(ratings);
    res.locals.respObj = new HttpSuccess(200, 'Sucessfully retrived supply',
        {datails: pick(supply,
            ['id', 'name', 'description', 'imageUrl', 'quantity']),
        ratingsDetails: map(ratings, (row)=>{
          return {
            user: row.user,
            rating: row.rating,
          };
        })});
    return next();
  } catch (error) {
    return next(new HttpError(500, 9999, error.message));
  }
}

/**
 * @todo - add new supply to the database
 * @param {*} req - request to the server
 * @param {*} res - response from the server
 * @param {*} next  - next function to be called
 */
async function addNewSupply(req, res, next) {
  const {name, description, imageUrl, quantity} = req.body;
  try {
    const existingSupply = await getSupplyByName({name});
    logger.info(name);
    logger.info(existingSupply);
    if (existingSupply) {
      return next(new HttpError(403, 9999,
          'Supply item is already in the inventory'));
    }
    const newSupply = await createNewSupply(name,
        description, imageUrl, quantity);
    res.locals.respObj = new HttpSuccess(200, 'Sucessfully added new Supply',
        {datails: pick(newSupply,
            ['name', 'description', 'imageUrl', 'quantity'])});
    return next();
  } catch (error) {
    return next(new HttpError(500, 9999, error.message));
  }
}

/**
 * @todo - add new supply to the database
 * @param {*} req - request to the server
 * @param {*} res - response from the server
 * @param {*} next  - next function to be called
 */
async function addNewRating(req, res, next) {
  const {id} = req.params;
  const supplyId = id;
  const {user, rating} = req.body;
  try {
    const existingSupply = await getSupplyById({id});
    if (!existingSupply) {
      return next(new HttpNotFoundError('Supplies Not Found'));
    }
    const newRating = await createNewRating(user, rating, supplyId);
    res.locals.respObj = new HttpSuccess(200, 'Sucessfully added new Supply',
        {newRating: pick(newRating, ['user', 'rating', 'supplyId'])});
    return next();
  } catch (error) {
    return next(new HttpError(500, 9999, error.message));
  }
}
/**
 * @todo - add new supply to the database
 * @param {*} req - request to the server
 * @param {*} res - response from the server
 * @param {*} next  - next function to be called
 */
async function removeSupply(req, res, next) {
  const {id} = req.params;
  const supplyId= id;
  try {
    await deleteRating({supplyId});
    const removedSupply = await deleteSupply({id});
    if (!removedSupply) {
      return next(new HttpNotFoundError('Supply not found'));
    }
    res.locals.respObj = new HttpSuccess(200, 'deleted!');
    return next();
  } catch (error) {
    return next(new HttpError(500, 9999, error.message));
  }
}
module.exports = {
  getSupplyList,
  getSpecificSupply,
  addNewSupply,
  removeSupply,
  addNewRating,
};

