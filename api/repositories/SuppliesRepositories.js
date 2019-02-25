
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
    return await service.insertIntoTable(process.env.TABLE1, data);
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
    return await service.getTableContents(process.env.TABLE1, fields);
  } catch (error) {
    throw new Error(error.message);
  }
};

/**
 * @todo - retrieve specific supply using its unique id
 * @param {*} id - id of the supply
 */
const getSupplyById = async (id) => {
  try {
    return await service.getTableRow(process.env.TABLE1, id);
  } catch (error) {
    throw new Error(error.message);
  }
};

/**
 * @todo - delete specific supply
 * @param {*} id - id of the supply
 */
const deleteSupply = async (id) => {
  try {
    return await service.deleteRow(process.env.TABLE1, id);
  } catch (error) {
    throw new Error(error);
  }
};

module.exports = {
  createNewSupply,
  getAllSupply,
  getSupplyById,
  deleteSupply,
};

