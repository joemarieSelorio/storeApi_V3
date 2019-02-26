require('app-module-path').addPath(require('app-root-path').toString());
const knex = require('knex')(require('knexfile'));
require('dotenv').config();
/**
 * Mysql Adapter Service
 */
class MysqlService {
  /**
   * @param {string} table - mysql table
   * @param {string} properties - Object details
   */
  async insertIntoTable(table, properties) {
    await knex(table).insert(properties);
    return properties;
  }
  /**
   * @param {string} table - mysql table
   * @param {fields} fields - object details
   */
  async getTableContents(table, fields) {
    return await knex.select(...fields).from(table);
  }
  /**
   * @param {string} table - mysql table
   * @param {fields} fields - object details
   * @param {fields} props - object details
   */
  async getSpecificTableContents(table, fields, props) {
    return await knex.select(...fields).from(table).where(props);
  }
  /**
   * @param {string} table - mysql table
   * @param {string} prop  - properties
   * @param {Array} fields - object details
   */
  async getTableRow(table, prop, fields) {
    return await knex.where(prop).select(...fields).first()
        .from(table);
  }
  /**
   * @param {string} table - mysql table
   * @param {object} id - id of the object
   */
  async deleteRow(table, id) {
    return await knex(table).where(id).del();
  }
  /**
   * @param {string} fields - first table
   * @param {string} table1 - first table
   * @param {string} table2 - second table
   * @param {string} primaryKey - id of first table
   * @param {string} foreignKey - foreignkey that
   * refers first table to second table
   * @param {string} prop - prop of the object
   * @param {string} value - value to be conpared to prop
   */
  async innerJoinTable(fields, table1, table2,
      primaryKey, foreignKey, prop, value) {
    knex.select(...fields).from(table1)
        .innerJoin(table2, primaryKey, foreignKey)
        .where('supplies.id', 'ratings.supplyId');
  }
}


module.exports = MysqlService;
