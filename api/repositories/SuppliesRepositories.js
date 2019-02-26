
require('app-module-path').addPath(require('app-root-path').toString());
const MysqlService = require('api/service/MysqlService');
require('dotenv').config();
const service = new MysqlService();

/**
 * @todo create new supply
 * @param {string} name - name of the supply
 * @param {string} description - description of the supply
 * @param {string} imageUrl - image URL of the supply
 * @param {integer} quantity - quantity of the supply
 */
const createNewSupply = async (name, description, imageUrl, quantity) => {
  const data = {
    name,
    description,
    imageUrl,
    quantity,
  };
  try {
    return await service.insertIntoTable(process.env.SUPPLIES_TABLE, data);
  } catch (error) {
    throw new Error(error.message);
  }
};


const createNewRating = async (user, rating, supplyId) => {
  const data = {
    user,
    rating,
    supplyId,
  };
  try {
    return await service.insertIntoTable('ratings', data);
  } catch (error) {
    throw new Error(error.message);
  }
};

/**
 * @todo - retrive all supplies in the database
 * @param {string} id - id of the object
 */
const getAllSupply = async () => {
  try {
    const fields = ['name', 'description', 'imageUrl', 'quantity'];
    return await service.getTableContents(process.env.SUPPLIES_TABLE, fields);
  } catch (error) {
    throw new Error(error.message);
  }
};

/**
 * @todo - retrieve specific supply using its unique id
 * @param {*} id - id of the supply
 */
const getSupplyById = async (id) => {
  const fields = ['id', 'name', 'description', 'imageUrl', 'quantity'];
  try {
    return await service.getTableRow(process.env.SUPPLIES_TABLE, id, fields);
  } catch (error) {
    throw new Error(error.message);
  }
};

const getRatings = async (supplyId) => {
  const fields = ['user', 'rating', 'supplyId'];
  try {
    return await service.getSpecificTableContents(process.env.RATINGS_TABLE,
        fields, supplyId);
  } catch (error) {
    throw new Error(error.message);
  }
};

const getSupplyByName = async (name) => {
  const fields = ['id', 'description', 'imageUrl', 'quantity'];
  try {
    return await service.getTableRow(process.env.SUPPLIES_TABLE,
        name, fields);
  } catch (error) {
    throw new Error(error.message);
  }
};

/**
 * @todo - delete specific rating
 * @param {*} supplyId - foreign key in the ratings table
 */
const deleteRating = async (supplyId) => {
  try {
    return await service.deleteRow('ratings', supplyId);
  } catch (error) {
    throw new Error(error);
  }
};

/**
 * @todo - delete specific supply
 * @param {*} id - id of the supply
 */
const deleteSupply = async (id) => {
  try {
    return await service.deleteRow('supplies', id);
  } catch (error) {
    throw new Error(error);
  }
};

module.exports = {
  createNewSupply,
  getRatings,
  createNewRating,
  getAllSupply,
  getSupplyById,
  getSupplyByName,
  deleteRating,
  deleteSupply,
};

